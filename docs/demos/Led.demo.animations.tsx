import { Led } from '@gfazioli/mantine-led';
import { Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Group, Stack, Text } from '@mantine/core';
import { Led } from '@gfazioli/mantine-led';

function Demo() {
  return (
    <Group>
      <Stack align="center" gap="xs">
        <Led animate animationType="pulse" size="lg" />
        <Text size="xs">Pulse</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Led animate animationType="flash" size="lg" color="red" />
        <Text size="xs">Flash</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Led animate animationType="breathe" size="lg" color="blue" />
        <Text size="xs">Breathe</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Led animate animationType="blink" size="lg" color="yellow" />
        <Text size="xs">Blink</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Led animate animationType="glow" size="lg" color="cyan" />
        <Text size="xs">Glow</Text>
      </Stack>
    </Group>
  );
}
`;

export const animations: MantineDemo = {
  type: 'code',
  component: () => (
    <Group>
      <Stack align="center" gap="xs">
        <Led animate animationType="pulse" size="lg" />
        <Text size="xs">Pulse</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Led animate animationType="flash" size="lg" color="red" />
        <Text size="xs">Flash</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Led animate animationType="breathe" size="lg" color="blue" />
        <Text size="xs">Breathe</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Led animate animationType="blink" size="lg" color="yellow" />
        <Text size="xs">Blink</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Led animate animationType="glow" size="lg" color="cyan" />
        <Text size="xs">Glow</Text>
      </Stack>
    </Group>
  ),
  code,
  defaultExpanded: false,
};
