import { render } from '@mantine-tests/core';
import React, { useEffect } from 'react';
import { QRCode } from './QRCode';
import { useQRCodeDownload, type UseQRCodeDownloadReturn } from './use-qr-code-download';

const IMAGE_URL = 'https://example.com/logo.png';

function Harness({ onReady }: { onReady: (api: UseQRCodeDownloadReturn) => void }) {
  const api = useQRCodeDownload();
  useEffect(() => {
    onReady(api);
  }, []);
  return <QRCode ref={api.ref} value="test" image={IMAGE_URL} errorCorrectionLevel="H" />;
}

async function getSvgExport() {
  let api: UseQRCodeDownloadReturn | undefined;
  render(
    <Harness
      onReady={(value) => {
        api = value;
      }}
    />
  );
  const dataUrl = await api!.getDataUrl({ format: 'svg' });
  const svg = decodeURIComponent(escape(atob(dataUrl.split(',')[1])));
  // Read the attribute with a regex: jsdom's XMLSerializer writes xmlns twice, which DOMParser rejects.
  return svg.match(/<image[^>]* href="([^"]*)"/)?.[1];
}

describe('useQRCodeDownload image overlay', () => {
  const originalFetch = global.fetch;
  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('embeds the overlay image as a data URL', async () => {
    const fetchMock = jest.fn(async () => ({
      ok: true,
      status: 200,
      blob: async () => new Blob(['png-bytes'], { type: 'image/png' }),
    }));
    global.fetch = fetchMock as unknown as typeof fetch;

    const href = await getSvgExport();

    expect(fetchMock).toHaveBeenCalledWith(IMAGE_URL);
    expect(href).toMatch(/^data:image\/png;base64,/);
  });

  it('keeps the image URL in an SVG export when it cannot be fetched', async () => {
    global.fetch = jest.fn(async () => {
      throw new TypeError('Failed to fetch');
    }) as unknown as typeof fetch;
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const href = await getSvgExport();

    expect(href).toBe(IMAGE_URL);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining(IMAGE_URL), expect.any(TypeError));
  });
});
