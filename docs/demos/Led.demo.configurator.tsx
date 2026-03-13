import { Led } from '@gfazioli/mantine-led';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Led } from '@gfazioli/mantine-led';

function Demo() {
  return (
    <Led{{props}}/>
  );
}
`;

export const configurator: MantineDemo = {
  type: 'configurator',
  component: (props) => <Led {...props} />,
  code,
  centered: true,
  controls: [
    {
      type: 'boolean',
      prop: 'value',
      initialValue: true,
      libraryValue: true,
    },
    {
      type: 'segmented',
      prop: 'variant',
      initialValue: 'flat',
      libraryValue: 'flat',
      data: [
        { value: 'flat', label: 'Flat' },
        { value: '3d', label: '3D' },
      ],
    },
    {
      type: 'color',
      prop: 'color',
      initialValue: 'green',
      libraryValue: 'green',
    },
    {
      type: 'size',
      prop: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      type: 'size',
      prop: 'radius',
      initialValue: 'xl',
      libraryValue: 'xl',
    },
    {
      type: 'number',
      prop: 'intensity',
      initialValue: 80,
      libraryValue: 80,
      min: 0,
      max: 100,
      step: 10,
    },
    {
      type: 'boolean',
      prop: 'animate',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'select',
      prop: 'animationType',
      initialValue: 'none',
      libraryValue: 'none',
      data: [
        { value: 'none', label: 'None' },
        { value: 'pulse', label: 'Pulse' },
        { value: 'flash', label: 'Flash' },
        { value: 'breathe', label: 'Breathe' },
        { value: 'blink', label: 'Blink' },
        { value: 'glow', label: 'Glow' },
      ],
    },
    {
      type: 'number',
      prop: 'animationDuration',
      initialValue: 1.5,
      libraryValue: 1.5,
      min: 0.5,
      max: 5,
      step: 0.5,
    },
    {
      type: 'string',
      prop: 'label',
      initialValue: '',
      libraryValue: '',
    },
    {
      type: 'segmented',
      prop: 'labelPosition',
      initialValue: 'right',
      libraryValue: 'right',
      data: [
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' },
      ],
    },
  ],
};
