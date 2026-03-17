import { QRCode, useQRCodeDownload } from '@gfazioli/mantine-qr-code';
import { Button, Group, Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Button, Group, Stack } from '@mantine/core';
import { QRCode, useQRCodeDownload } from '@gfazioli/mantine-qr-code';

function Demo() {
  const { ref, download } = useQRCodeDownload({ fileName: 'my-qr-code' });

  return (
    <Stack align="center">
      <QRCode ref={ref} value="https://mantine.dev" size="xl" />
      <Group>
        <Button onClick={() => download({ format: 'svg' })} variant="light">
          Download SVG
        </Button>
        <Button onClick={() => download({ format: 'png' })} variant="light">
          Download PNG
        </Button>
      </Group>
    </Stack>
  );
}
`;

function Demo() {
  const { ref, download } = useQRCodeDownload({ fileName: 'my-qr-code' });

  return (
    <Stack align="center">
      <QRCode ref={ref} value="https://mantine.dev" size="xl" />
      <Group>
        <Button onClick={() => download({ format: 'svg' })} variant="light">
          Download SVG
        </Button>
        <Button onClick={() => download({ format: 'png' })} variant="light">
          Download PNG
        </Button>
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
