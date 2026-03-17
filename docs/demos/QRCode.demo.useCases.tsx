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
        <QRCode value="https://mantine.dev" size="lg" dotStyle="rounded" cornerStyle="rounded" />
        <Text size="xs">URL</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <QRCode
          value="WIFI:T:WPA;S:MyNetwork;P:MyPassword;;"
          size="lg"
          dotStyle="dots"
          cornerStyle="dots"
          color="blue"
        />
        <Text size="xs">WiFi</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <QRCode
          value="BEGIN:VCARD\\nVERSION:3.0\\nFN:John Doe\\nTEL:+1234567890\\nEMAIL:john@example.com\\nEND:VCARD"
          size="lg"
          color="teal"
          errorCorrectionLevel="H"
        />
        <Text size="xs">vCard</Text>
      </Stack>
    </Group>
  );
}
`;

export const useCases: MantineDemo = {
  type: 'code',
  component: () => (
    <Group>
      <Stack align="center" gap="xs">
        <QRCode value="https://mantine.dev" size="lg" dotStyle="rounded" cornerStyle="rounded" />
        <Text size="xs">URL</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <QRCode
          value="WIFI:T:WPA;S:MyNetwork;P:MyPassword;;"
          size="lg"
          dotStyle="dots"
          cornerStyle="dots"
          color="blue"
        />
        <Text size="xs">WiFi</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <QRCode
          value={
            'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nTEL:+1234567890\nEMAIL:john@example.com\nEND:VCARD'
          }
          size="lg"
          color="teal"
          errorCorrectionLevel="H"
        />
        <Text size="xs">vCard</Text>
      </Stack>
    </Group>
  ),
  code,
  defaultExpanded: false,
};
