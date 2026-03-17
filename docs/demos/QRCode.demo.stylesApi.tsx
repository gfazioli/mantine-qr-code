import { QRCode } from '@gfazioli/mantine-qr-code';
import { MantineDemo } from '@mantinex/demo';
import { QRCodeStylesApi } from '../styles-api/QRCode.styles-api';

const code = `
import { QRCode } from "@gfazioli/mantine-qr-code";

function Demo() {
  return (
    <QRCode{{props}} value="https://mantine.dev" size="xl" />
  );
}
`;

function Demo(props: any) {
  return <QRCode {...props} value="https://mantine.dev" size="xl" />;
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: QRCodeStylesApi,
  component: Demo,
  code,
  centered: true,
};
