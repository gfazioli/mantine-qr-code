import React from 'react';
import { Group, Paper, Stack, Text } from '@mantine/core';
import { QRCode } from './QRCode';

export default {
  title: 'Components/QRCode',
  args: {
    value: 'https://mantine.dev',
    size: 'md',
    color: 'dark',
    bgColor: 'white',
    dotStyle: 'square',
    cornerStyle: 'square',
    errorCorrectionLevel: 'M',
  },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    dotStyle: { control: 'select', options: ['square', 'rounded', 'dots'] },
    cornerStyle: { control: 'select', options: ['square', 'rounded', 'dots'] },
    errorCorrectionLevel: { control: 'select', options: ['L', 'M', 'Q', 'H'] },
    color: { control: 'color' },
    bgColor: { control: 'color' },
  },
};

export function Usage() {
  return (
    <Stack gap="xl" p="md">
      <Paper p="md" withBorder>
        <Text fw={500} mb="md">
          Sizes
        </Text>
        <Group align="flex-end">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
            <Stack key={s} align="center">
              <QRCode value="https://mantine.dev" size={s} />
              <Text size="xs" tt="uppercase">
                {s}
              </Text>
            </Stack>
          ))}
        </Group>
      </Paper>

      <Paper p="md" withBorder>
        <Text fw={500} mb="md">
          Dot Styles
        </Text>
        <Group>
          {(['square', 'rounded', 'dots'] as const).map((ds) => (
            <Stack key={ds} align="center">
              <QRCode value="https://mantine.dev" dotStyle={ds} size="lg" />
              <Text size="xs" tt="capitalize">
                {ds}
              </Text>
            </Stack>
          ))}
        </Group>
      </Paper>

      <Paper p="md" withBorder>
        <Text fw={500} mb="md">
          Corner Styles
        </Text>
        <Group>
          {(['square', 'rounded', 'dots'] as const).map((cs) => (
            <Stack key={cs} align="center">
              <QRCode value="https://mantine.dev" cornerStyle={cs} size="lg" />
              <Text size="xs" tt="capitalize">
                {cs}
              </Text>
            </Stack>
          ))}
        </Group>
      </Paper>

      <Paper p="md" withBorder>
        <Text fw={500} mb="md">
          Colors
        </Text>
        <Group>
          {['red', 'green', 'blue', 'yellow', 'orange', 'cyan', 'pink', 'violet'].map((c) => (
            <Stack key={c} align="center">
              <QRCode value="https://mantine.dev" color={c} />
              <Text size="xs" tt="capitalize">
                {c}
              </Text>
            </Stack>
          ))}
        </Group>
      </Paper>

      <Paper p="md" withBorder>
        <Text fw={500} mb="md">
          Error Correction Levels
        </Text>
        <Group>
          {(['L', 'M', 'Q', 'H'] as const).map((ecl) => (
            <Stack key={ecl} align="center">
              <QRCode value="https://mantine.dev" errorCorrectionLevel={ecl} size="lg" />
              <Text size="xs">{ecl}</Text>
            </Stack>
          ))}
        </Group>
      </Paper>

      <Paper p="md" withBorder>
        <Text fw={500} mb="md">
          With Image
        </Text>
        <Group>
          <QRCode
            value="https://mantine.dev"
            size="xl"
            image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
            errorCorrectionLevel="H"
          />
          <QRCode
            value="https://mantine.dev"
            size="xl"
            image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
            errorCorrectionLevel="H"
            dotStyle="dots"
            cornerStyle="dots"
          />
        </Group>
      </Paper>

      <Paper p="md" withBorder>
        <Text fw={500} mb="md">
          Combined Styles
        </Text>
        <Group>
          <QRCode
            value="https://mantine.dev"
            dotStyle="rounded"
            cornerStyle="rounded"
            color="blue"
            size="xl"
          />
          <QRCode
            value="https://mantine.dev"
            dotStyle="dots"
            cornerStyle="dots"
            color="violet"
            size="xl"
          />
          <QRCode
            value="https://mantine.dev"
            dotStyle="dots"
            cornerStyle="rounded"
            color="teal"
            bgColor="dark"
            size="xl"
          />
        </Group>
      </Paper>
    </Stack>
  );
}

export function WithProps(props: any) {
  return <QRCode {...props} />;
}
