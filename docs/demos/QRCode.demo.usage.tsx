import { QRCode } from '@gfazioli/mantine-qr-code';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { QRCode } from '@gfazioli/mantine-qr-code';

function Demo() {
  return (
    <QRCode value="https://mantine.dev" />
  );
}
`;

export const usage: MantineDemo = {
  type: 'code',
  component: () => <QRCode value="https://mantine.dev" />,
  code,
  centered: true,
  defaultExpanded: false,
};
