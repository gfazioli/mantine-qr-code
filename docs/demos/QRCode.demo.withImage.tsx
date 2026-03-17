import { QRCode } from '@gfazioli/mantine-qr-code';
import { Group } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Group } from '@mantine/core';
import { QRCode } from '@gfazioli/mantine-qr-code';

function Demo() {
  return (
    <Group>
      <QRCode
        value="https://mantine.dev"
        size="xl"
        image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
        errorCorrectionLevel="H"
      />
      <QRCode
        value="https://mantine.dev"
        size="xl"
        image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
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
      <QRCode
        value="https://mantine.dev"
        size="xl"
        image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
        errorCorrectionLevel="H"
      />
      <QRCode
        value="https://mantine.dev"
        size="xl"
        image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
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
