import { QRCode } from '@gfazioli/mantine-qr-code';
import { Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Group, Stack, Text } from '@mantine/core';
import { QRCode } from '@gfazioli/mantine-qr-code';

function Demo() {
  return (
    <Group>
      {['red', 'blue', 'violet', 'teal', 'orange', 'cyan'].map((color) => (
        <Stack key={color} align="center" gap="xs">
          <QRCode value="https://mantine.dev" color={color} />
          <Text size="xs" tt="capitalize">{color}</Text>
        </Stack>
      ))}
    </Group>
  );
}
`;

export const colors: MantineDemo = {
  type: 'code',
  component: () => (
    <Group>
      {['red', 'blue', 'violet', 'teal', 'orange', 'cyan'].map((color) => (
        <Stack key={color} align="center" gap="xs">
          <QRCode value="https://mantine.dev" color={color} />
          <Text size="xs" tt="capitalize">
            {color}
          </Text>
        </Stack>
      ))}
    </Group>
  ),
  code,
  defaultExpanded: false,
};
