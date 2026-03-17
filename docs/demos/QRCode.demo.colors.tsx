import { QRCode } from '@gfazioli/mantine-qr-code';
import { Group } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Group } from '@mantine/core';
import { QRCode } from '@gfazioli/mantine-qr-code';

function Demo() {
  return (
    <Group>
      <QRCode color="red" />
      <QRCode color="green" />
      <QRCode color="blue" />
      <QRCode color="yellow" />
      <QRCode color="orange" />
      <QRCode color="cyan" />
      <QRCode color="pink" />
      <QRCode color="violet" />
    </Group>
  );
}
`;

export const colors: MantineDemo = {
  type: 'code',
  component: () => (
    <Group>
      <QRCode color="red" />
      <QRCode color="green" />
      <QRCode color="blue" />
      <QRCode color="yellow" />
      <QRCode color="orange" />
      <QRCode color="cyan" />
      <QRCode color="pink" />
      <QRCode color="violet" />
    </Group>
  ),
  code,
  defaultExpanded: false,
};
