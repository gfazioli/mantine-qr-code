import { Led } from '@gfazioli/mantine-led';
import { Button, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { useState } from 'react';
import { Button, Group, Stack } from '@mantine/core';
import { Led } from '@gfazioli/mantine-led';

function Demo() {
  const [value, { open, close, toggle }] = useDisclosure(false);

  return (
    <Stack align="center">
      <Led value={value} size="xl" />
      <Group>
        <Button onClick={open} variant="light" color="green">
          Turn On
        </Button>
        <Button onClick={close} variant="light" color="red">
          Turn Off
        </Button>
        <Button onClick={toggle} variant="light">
          Toggle
        </Button>
      </Group>
    </Stack>
  );
}
`;

function Demo() {
  const [value, { open, close, toggle }] = useDisclosure(false);

  return (
    <Stack align="center">
      <Led value={value} size="lg" variant="3d" />
      <Group>
        <Button onClick={open} variant="light" color="green">
          Turn On
        </Button>
        <Button onClick={close} variant="light" color="red">
          Turn Off
        </Button>
        <Button onClick={toggle} variant="light">
          Toggle
        </Button>
      </Group>
    </Stack>
  );
}

export const controlled: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
