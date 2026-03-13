import { useState } from 'react';
import { Led } from '@gfazioli/mantine-led';
import { Button, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const DEFCON_LEVELS = [
  { level: 5, color: 'blue', label: 'DEFCON 5', description: 'Normal readiness' },
  { level: 4, color: 'green', label: 'DEFCON 4', description: 'Increased intelligence watch' },
  { level: 3, color: 'yellow', label: 'DEFCON 3', description: 'Increase in force readiness' },
  {
    level: 2,
    color: 'orange',
    label: 'DEFCON 2',
    description: 'Further increase in force readiness',
  },
  { level: 1, color: 'red', label: 'DEFCON 1', description: 'Maximum force readiness' },
];

const code = `
import { useState } from 'react';
import { Button, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { Led } from '@gfazioli/mantine-led';

const DEFCON_LEVELS = [
  { level: 5, color: 'blue', label: 'DEFCON 5', description: 'Normal readiness' },
  { level: 4, color: 'green', label: 'DEFCON 4', description: 'Increased intelligence watch' },
  { level: 3, color: 'yellow', label: 'DEFCON 3', description: 'Increase in force readiness' },
  { level: 2, color: 'orange', label: 'DEFCON 2', description: 'Further increase in force readiness' },
  { level: 1, color: 'red', label: 'DEFCON 1', description: 'Maximum force readiness' },
];

function Demo() {
  const [currentLevel, setCurrentLevel] = useState(5);

  return (
    <Paper p="xl" withBorder>
      <Stack gap="lg">
        <Title order={3} ta="center">Defense Readiness Condition</Title>
        
        <Stack gap="md">
          {DEFCON_LEVELS.map(({ level, color, label, description }) => (
            <Group key={level} justify="space-between">
              <Group gap="md">
                <Led
                  value={currentLevel === level}
                  color={color}
                  size="lg"
                  animate={currentLevel === level && level <= 2}
                  animationType={level === 1 ? 'flash' : 'pulse'}
                />
                <div>
                  <Text fw={currentLevel === level ? 700 : 400} size="sm">
                    {label}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {description}
                  </Text>
                </div>
              </Group>
            </Group>
          ))}
        </Stack>

        <Group justify="center">
          <Button.Group>
            {[5, 4, 3, 2, 1].map((level) => (
              <Button
                key={level}
                onClick={() => setCurrentLevel(level)}
                variant={currentLevel === level ? 'filled' : 'default'}
                size="xs"
              >
                {level}
              </Button>
            ))}
          </Button.Group>
        </Group>
      </Stack>
    </Paper>
  );
}
`;

function Demo() {
  const [currentLevel, setCurrentLevel] = useState(5);

  return (
    <Paper p="xl" withBorder>
      <Stack gap="lg">
        <Title order={3} ta="center">
          Defense Readiness Condition
        </Title>

        <Stack gap="md">
          {DEFCON_LEVELS.map(({ level, color, label, description }) => (
            <Group key={level} justify="space-between">
              <Group gap="md">
                <Led
                  value={currentLevel === level}
                  color={color}
                  size="lg"
                  animate={currentLevel === level && level <= 2}
                  animationType={level === 1 ? 'flash' : 'pulse'}
                />
                <div>
                  <Text fw={currentLevel === level ? 700 : 400} size="sm">
                    {label}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {description}
                  </Text>
                </div>
              </Group>
            </Group>
          ))}
        </Stack>

        <Group justify="center">
          <Button.Group>
            {[5, 4, 3, 2, 1].map((level) => (
              <Button
                key={level}
                onClick={() => setCurrentLevel(level)}
                variant={currentLevel === level ? 'filled' : 'default'}
                size="xs"
              >
                {level}
              </Button>
            ))}
          </Button.Group>
        </Group>
      </Stack>
    </Paper>
  );
}

export const defcon: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
