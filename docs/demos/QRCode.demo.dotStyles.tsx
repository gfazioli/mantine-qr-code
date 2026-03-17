import { QRCode } from '@gfazioli/mantine-qr-code';
import { Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Group, Stack, Text } from '@mantine/core';
import { QRCode } from '@gfazioli/mantine-qr-code';

function Demo() {
  return (
    <Group>
      <Stack align="center" gap="xs">
        <QRCode value="https://mantine.dev" dotStyle="square" size="lg" />
        <Text size="xs">Square</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <QRCode value="https://mantine.dev" dotStyle="rounded" size="lg" />
        <Text size="xs">Rounded</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <QRCode value="https://mantine.dev" dotStyle="dots" size="lg" />
        <Text size="xs">Dots</Text>
      </Stack>
    </Group>
  );
}
`;

export const dotStyles: MantineDemo = {
  type: 'code',
  component: () => (
    <Group>
      <Stack align="center" gap="xs">
        <QRCode value="https://mantine.dev" dotStyle="square" size="lg" />
        <Text size="xs">Square</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <QRCode value="https://mantine.dev" dotStyle="rounded" size="lg" />
        <Text size="xs">Rounded</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <QRCode value="https://mantine.dev" dotStyle="dots" size="lg" />
        <Text size="xs">Dots</Text>
      </Stack>
    </Group>
  ),
  code,
  defaultExpanded: false,
};
