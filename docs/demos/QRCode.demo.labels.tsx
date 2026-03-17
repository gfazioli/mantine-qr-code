import { QRCode } from '@gfazioli/mantine-qr-code';
import { Badge, Group, Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Badge, Group, Stack } from '@mantine/core';
import { QRCode } from '@gfazioli/mantine-qr-code';

function Demo() {
  return (
    <Stack gap="lg">
      <Group>
        <QRCode label="Power" />
        <QRCode value={false} label="Standby" color="gray" />
      </Group>

      <Group>
        <QRCode label="Online" labelPosition="left" color="green" />
        <QRCode label="Active" labelPosition="right" color="blue" />
      </Group>

      <Group>
        <QRCode
          label={<Badge size="sm" variant="light">Custom Label</Badge>}
          color="violet"
        />
      </Group>
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack gap="lg">
      <Group>
        <QRCode label="Power" />
        <QRCode value={false} label="Standby" color="gray" />
      </Group>

      <Group>
        <QRCode label="Online" labelPosition="left" color="green" />
        <QRCode label="Active" labelPosition="right" color="blue" />
      </Group>

      <Group>
        <QRCode
          label={
            <Badge size="sm" variant="light">
              Custom Label
            </Badge>
          }
          color="violet"
        />
      </Group>
    </Stack>
  );
}

export const labels: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
