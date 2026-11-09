import { QRCode, useQRCodeDownload } from '@gfazioli/mantine-qr-code';
import { Button, Group, Stack, Switch } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { useState } from 'react';
import { DEMO_IMAGE } from './demo-image';

const code = `
import { useState } from 'react';
import { Button, Group, Stack, Switch } from '@mantine/core';
import { QRCode, useQRCodeDownload } from '@gfazioli/mantine-qr-code';

function Demo() {
  const [transparent, setTransparent] = useState(false);
  const { ref, download } = useQRCodeDownload({ fileName: 'my-qr-code' });

  return (
    <Stack align="center">
      <QRCode
        ref={ref}
        value="https://mantine.dev"
        size="xl"
        image="${DEMO_IMAGE}"
        errorCorrectionLevel="H"
        background={transparent ? 'transparent' : 'white'}
      />
      <Switch
        label="Transparent background (PNG, WebP and SVG)"
        checked={transparent}
        onChange={(event) => setTransparent(event.currentTarget.checked)}
      />
      <Group>
        {(['svg', 'png', 'jpeg', 'webp'] as const).map((format) => (
          <Button key={format} onClick={() => download({ format })} variant="light">
            {format.toUpperCase()}
          </Button>
        ))}
      </Group>
    </Stack>
  );
}
`;

function Demo() {
  const [transparent, setTransparent] = useState(false);
  const { ref, download } = useQRCodeDownload({ fileName: 'my-qr-code' });

  return (
    <Stack align="center">
      <QRCode
        ref={ref}
        value="https://mantine.dev"
        size="xl"
        image={DEMO_IMAGE}
        errorCorrectionLevel="H"
        background={transparent ? 'transparent' : 'white'}
      />
      <Switch
        label="Transparent background (PNG, WebP and SVG)"
        checked={transparent}
        onChange={(event) => setTransparent(event.currentTarget.checked)}
      />
      <Group>
        {(['svg', 'png', 'jpeg', 'webp'] as const).map((format) => (
          <Button key={format} onClick={() => download({ format })} variant="light">
            {format.toUpperCase()}
          </Button>
        ))}
      </Group>
    </Stack>
  );
}

export const download: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
