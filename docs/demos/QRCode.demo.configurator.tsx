import { QRCode } from '@gfazioli/mantine-qr-code';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { QRCode } from '@gfazioli/mantine-qr-code';

function Demo() {
  return (
    <QRCode{{props}}/>
  );
}
`;

export const configurator: MantineDemo = {
  type: 'configurator',
  component: (props) => <QRCode {...props} />,
  code,
  centered: true,
  controls: [
    {
      type: 'string',
      prop: 'value',
      initialValue: 'https://mantine.dev',
      libraryValue: null,
    },
    {
      type: 'color',
      prop: 'color',
      initialValue: 'dark',
      libraryValue: 'dark',
    },
    {
      type: 'color',
      prop: 'bgColor',
      initialValue: 'white',
      libraryValue: 'white',
    },
    {
      type: 'size',
      prop: 'size',
      initialValue: 'md',
      libraryValue: 'md',
    },
    {
      type: 'size',
      prop: 'radius',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      type: 'segmented',
      prop: 'dotStyle',
      initialValue: 'square',
      libraryValue: 'square',
      data: [
        { value: 'square', label: 'Square' },
        { value: 'rounded', label: 'Rounded' },
        { value: 'dots', label: 'Dots' },
      ],
    },
    {
      type: 'segmented',
      prop: 'cornerStyle',
      initialValue: 'square',
      libraryValue: 'square',
      data: [
        { value: 'square', label: 'Square' },
        { value: 'rounded', label: 'Rounded' },
        { value: 'dots', label: 'Dots' },
      ],
    },
    {
      type: 'select',
      prop: 'errorCorrectionLevel',
      initialValue: 'M',
      libraryValue: 'M',
      data: [
        { value: 'L', label: 'L (7%)' },
        { value: 'M', label: 'M (15%)' },
        { value: 'Q', label: 'Q (25%)' },
        { value: 'H', label: 'H (30%)' },
      ],
    },
    {
      type: 'number',
      prop: 'quietZone',
      initialValue: 1,
      libraryValue: 1,
      min: 0,
      max: 4,
      step: 1,
    },
  ],
};
