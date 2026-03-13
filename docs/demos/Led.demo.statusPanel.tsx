import { Led } from '@gfazioli/mantine-led';
import { Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Group, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { Led } from '@gfazioli/mantine-led';

function Demo() {
  return (
    <Paper p="xl" withBorder>
      <Stack gap="lg">
        <Title order={3}>System Status Panel</Title>
        
        <SimpleGrid cols={2}>
          <Stack gap="md">
            <Text fw={500} size="sm">Network</Text>
            <Stack gap="xs">
              <Led value label="Internet" color="green" labelPosition="left" />
              <Led value label="LAN" color="green" labelPosition="left" />
              <Led value={false} label="VPN" color="gray" labelPosition="left" />
            </Stack>
          </Stack>

          <Stack gap="md">
            <Text fw={500} size="sm">Services</Text>
            <Stack gap="xs">
              <Led
                value
                label="Database"
                color="green"
                labelPosition="left"
                animate
                animationType="pulse"
              />
              <Led value label="API Server" color="green" labelPosition="left" />
              <Led value label="Cache" color="yellow" labelPosition="left" />
            </Stack>
          </Stack>

          <Stack gap="md">
            <Text fw={500} size="sm">Resources</Text>
            <Stack gap="xs">
              <Led value label="CPU Load" color="green" labelPosition="left" />
              <Led value label="Memory" color="yellow" labelPosition="left" />
              <Led
                value
                label="Disk Space"
                color="red"
                labelPosition="left"
                animate
                animationType="flash"
              />
            </Stack>
          </Stack>

          <Stack gap="md">
            <Text fw={500} size="sm">Security</Text>
            <Stack gap="xs">
              <Led value label="Firewall" color="green" labelPosition="left" />
              <Led value label="SSL Cert" color="green" labelPosition="left" />
              <Led value label="Auth Service" color="green" labelPosition="left" />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Stack>
    </Paper>
  );
}
`;

function Demo() {
  return (
    <Paper p="xl" withBorder>
      <Stack gap="lg">
        <Title order={3}>System Status Panel</Title>

        <SimpleGrid cols={2}>
          <Stack gap="md">
            <Text fw={800}>Network</Text>
            <Paper withBorder p="md">
              <Stack gap="xs">
                <Led label="Internet" color="green" labelPosition="left" justify="space-between" />
                <Led label="LAN" color="green" labelPosition="left" justify="space-between" />
                <Led
                  value={false}
                  label="VPN"
                  color="gray"
                  labelPosition="left"
                  justify="space-between"
                />
              </Stack>
            </Paper>
          </Stack>

          <Stack gap="md">
            <Text fw={800}>Services</Text>
            <Paper withBorder p="md">
              <Stack gap="xs">
                <Led
                  value
                  label="Database"
                  color="green"
                  labelPosition="left"
                  animate
                  animationType="blink"
                  justify="space-between"
                />
                <Led
                  label="API Server"
                  color="green"
                  labelPosition="left"
                  justify="space-between"
                />
                <Led label="Cache" color="yellow" labelPosition="left" justify="space-between" />
              </Stack>
            </Paper>
          </Stack>

          <Stack gap="md">
            <Text fw={800}>Resources</Text>
            <Paper withBorder p="md">
              <Stack gap="xs">
                <Led
                  label="CPU Load"
                  color="green"
                  labelPosition="left"
                  justify="space-between"
                  animate
                  animationType="glow"
                />
                <Led label="Memory" color="yellow" labelPosition="left" justify="space-between" />
                <Led
                  value
                  label="Disk Space"
                  color="red"
                  labelPosition="left"
                  animate
                  animationType="flash"
                  justify="space-between"
                />
              </Stack>
            </Paper>
          </Stack>

          <Stack gap="md">
            <Text fw={800}>Security</Text>
            <Paper withBorder p="md">
              <Stack gap="xs">
                <Led label="Firewall" color="green" labelPosition="left" justify="space-between" />
                <Led
                  label="SSL Cert"
                  color="green"
                  labelPosition="left"
                  justify="space-between"
                  value={false}
                />
                <Led
                  label="Auth Service"
                  color="green"
                  labelPosition="left"
                  justify="space-between"
                />
              </Stack>
            </Paper>
          </Stack>
        </SimpleGrid>
      </Stack>
    </Paper>
  );
}

export const statusPanel: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
