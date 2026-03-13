import { Led } from '@gfazioli/mantine-led';
import { Badge, Group, Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Badge, Group, Stack } from '@mantine/core';
import { Led } from '@gfazioli/mantine-led';

function Demo() {
  return (
    <Stack gap="lg">
      <Group>
        <Led label="Power" />
        <Led value={false} label="Standby" color="gray" />
      </Group>

      <Group>
        <Led label="Online" labelPosition="left" color="green" />
        <Led label="Active" labelPosition="right" color="blue" />
      </Group>

      <Group>
        <Led
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
        <Led label="Power" />
        <Led value={false} label="Standby" color="gray" />
      </Group>

      <Group>
        <Led label="Online" labelPosition="left" color="green" />
        <Led label="Active" labelPosition="right" color="blue" />
      </Group>

      <Group>
        <Led
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
