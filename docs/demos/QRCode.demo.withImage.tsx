import { QRCode } from '@gfazioli/mantine-qr-code';
import { Group } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { DEMO_IMAGE } from './demo-image';

const code = `
import { Group } from '@mantine/core';
import { QRCode } from '@gfazioli/mantine-qr-code';

function Demo() {
  return (
    <Group>
      <QRCode
        value="https://mantine.dev"
        size="xl"
        image="${DEMO_IMAGE}"
        errorCorrectionLevel="H"
      />
      <QRCode
        value="https://mantine.dev"
        size="xl"
        image="${DEMO_IMAGE}"
        errorCorrectionLevel="H"
        dotStyle="dots"
        cornerStyle="dots"
        imageRadius="md"
      />
    </Group>
  );
}
`;

export const withImage: MantineDemo = {
  type: 'code',
  component: () => (
    <Group>
      <QRCode value="https://mantine.dev" size="xl" image={DEMO_IMAGE} errorCorrectionLevel="H" />
      <QRCode
        value="https://mantine.dev"
        size="xl"
        image={DEMO_IMAGE}
        errorCorrectionLevel="H"
        dotStyle="dots"
        cornerStyle="dots"
        imageRadius="md"
      />
    </Group>
  ),
  code,
  defaultExpanded: false,
};
