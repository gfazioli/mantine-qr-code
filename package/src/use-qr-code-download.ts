import { useCallback, useRef } from 'react';

export interface UseQRCodeDownloadOptions {
  /** Default download format */
  format?: 'svg' | 'png' | 'jpeg' | 'webp';
  /** Default file name (without extension) */
  fileName?: string;
  /** Scale for raster formats (default: 4 for high resolution) */
  scale?: number;
}

export interface UseQRCodeDownloadReturn {
  /** Ref to attach to the QRCode component's root element */
  ref: React.RefObject<HTMLDivElement | null>;
  /** Download the QR code */
  download: (options?: { format?: string; fileName?: string; scale?: number }) => Promise<void>;
  /** Get data URL of the QR code */
  getDataUrl: (options?: { format?: string; scale?: number }) => Promise<string>;
}

function getSvgElement(containerRef: React.RefObject<HTMLDivElement | null>): SVGSVGElement | null {
  return containerRef.current?.querySelector('svg') ?? null;
}

function serializeSvg(svgElement: SVGSVGElement): string {
  const serializer = new XMLSerializer();
  const clone = svgElement.cloneNode(true) as SVGSVGElement;

  // Ensure proper namespace
  if (!clone.getAttribute('xmlns')) {
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  }

  // Get computed styles and inline them
  const computedStyle = getComputedStyle(svgElement);
  const bgColor = computedStyle.getPropertyValue('--qr-code-background').trim() || '#ffffff';
  const fgColor = computedStyle.getPropertyValue('--qr-code-color').trim() || '#000000';

  // Apply colors to cloned SVG elements
  const bgRect = clone.querySelector('rect');
  if (bgRect) {
    bgRect.setAttribute('fill', bgColor);
  }

  clone.querySelectorAll('path').forEach((path) => {
    const currentFill = path.getAttribute('fill');
    if (!currentFill || currentFill === 'currentColor') {
      path.setAttribute('fill', fgColor);
    }
  });

  return serializer.serializeToString(clone);
}

function svgToBlob(svgString: string): Blob {
  return new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
}

async function svgToCanvas(svgElement: SVGSVGElement, scale: number): Promise<HTMLCanvasElement> {
  const svgString = serializeSvg(svgElement);
  const svgBlob = svgToBlob(svgString);
  const url = URL.createObjectURL(svgBlob);

  const viewBox = svgElement.viewBox.baseVal;
  const width = (viewBox.width || svgElement.clientWidth) * scale;
  const height = (viewBox.height || svgElement.clientHeight) * scale;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load SVG as image'));
    };
    img.src = url;
  });
}

function triggerDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function useQRCodeDownload(options: UseQRCodeDownloadOptions = {}): UseQRCodeDownloadReturn {
  const {
    format: defaultFormat = 'png',
    fileName: defaultFileName = 'qrcode',
    scale: defaultScale = 4,
  } = options;

  const ref = useRef<HTMLDivElement>(null);

  const getDataUrl = useCallback(
    async (opts?: { format?: string; scale?: number }): Promise<string> => {
      const svgElement = getSvgElement(ref);
      if (!svgElement) {
        throw new Error('QRCode SVG element not found');
      }

      const format = opts?.format ?? defaultFormat;
      const scale = opts?.scale ?? defaultScale;

      if (format === 'svg') {
        const svgString = serializeSvg(svgElement);
        return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;
      }

      const canvas = await svgToCanvas(svgElement, scale);
      const mimeType =
        format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
      return canvas.toDataURL(mimeType, 1.0);
    },
    [defaultFormat, defaultScale]
  );

  const download = useCallback(
    async (opts?: { format?: string; fileName?: string; scale?: number }): Promise<void> => {
      const svgElement = getSvgElement(ref);
      if (!svgElement) {
        throw new Error('QRCode SVG element not found');
      }

      const format = opts?.format ?? defaultFormat;
      const fileName = opts?.fileName ?? defaultFileName;
      const scale = opts?.scale ?? defaultScale;
      const fullFileName = `${fileName}.${format}`;

      if (format === 'svg') {
        const svgString = serializeSvg(svgElement);
        triggerDownload(svgToBlob(svgString), fullFileName);
        return;
      }

      const canvas = await svgToCanvas(svgElement, scale);
      const mimeType =
        format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';

      canvas.toBlob(
        (blob) => {
          if (blob) {
            triggerDownload(blob, fullFileName);
          }
        },
        mimeType,
        1.0
      );
    },
    [defaultFormat, defaultFileName, defaultScale]
  );

  return { ref, download, getDataUrl };
}
