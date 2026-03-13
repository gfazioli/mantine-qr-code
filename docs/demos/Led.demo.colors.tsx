import { Led } from '@gfazioli/mantine-led';
import { Group } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Group } from '@mantine/core';
import { Led } from '@gfazioli/mantine-led';

function Demo() {
  return (
    <Group>
      <Led color="red" />
      <Led color="green" />
      <Led color="blue" />
      <Led color="yellow" />
      <Led color="orange" />
      <Led color="cyan" />
      <Led color="pink" />
      <Led color="violet" />
    </Group>
  );
}
`;

export const colors: MantineDemo = {
  type: 'code',
  component: () => (
    <Group>
      <Led color="red" />
      <Led color="green" />
      <Led color="blue" />
      <Led color="yellow" />
      <Led color="orange" />
      <Led color="cyan" />
      <Led color="pink" />
      <Led color="violet" />
    </Group>
  ),
  code,
  defaultExpanded: false,
};
