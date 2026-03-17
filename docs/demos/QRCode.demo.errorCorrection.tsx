import { QRCode } from '@gfazioli/mantine-qr-code';
import { Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Group, Stack, Text } from '@mantine/core';
import { QRCode } from '@gfazioli/mantine-qr-code';

function Demo() {
  return (
    <Group>
      {(['L', 'M', 'Q', 'H'] as const).map((level) => (
        <Stack key={level} align="center" gap="xs">
          <QRCode value="https://mantine.dev" errorCorrectionLevel={level} size="lg" />
          <Text size="xs">{level} ({level === 'L' ? '7%' : level === 'M' ? '15%' : level === 'Q' ? '25%' : '30%'})</Text>
        </Stack>
      ))}
    </Group>
  );
}
`;

export const errorCorrection: MantineDemo = {
  type: 'code',
  component: () => (
    <Group>
      {(['L', 'M', 'Q', 'H'] as const).map((level) => (
        <Stack key={level} align="center" gap="xs">
          <QRCode value="https://mantine.dev" errorCorrectionLevel={level} size="lg" />
          <Text size="xs">
            {level} ({level === 'L' ? '7%' : level === 'M' ? '15%' : level === 'Q' ? '25%' : '30%'})
          </Text>
        </Stack>
      ))}
    </Group>
  ),
  code,
  defaultExpanded: false,
};
