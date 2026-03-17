import { QRCodeFactory } from '@gfazioli/mantine-qr-code';
import type { StylesApiData } from '../components/styles-api.types';

export const QRCodeStylesApi: StylesApiData<QRCodeFactory> = {
  selectors: {
    root: 'Root element',
    qrCode: 'QRCode element',
    label: 'Label element',
    glow: 'Outer glow effect element',
    light: 'Inner light reflection element',
  },

  vars: {
    root: {
      '--qr-code-size': 'Controls QRCode width and height',
      '--qr-code-radius': 'Controls border radius',
      '--qr-code-color': 'Controls QRCode base color',
      '--qr-code-intensity': 'Controls brightness intensity (0-1)',
      '--qr-code-animation-duration': 'Controls animation duration',
      '--qr-code-glow-size': 'Controls outer glow size',
      '--qr-code-justify-content': 'Controls label and QRCode alignment',
    },
  },

  modifiers: [
    {
      modifier: 'data-value',
      selector: 'root',
      condition: '`value` prop is true',
    },
    {
      modifier: 'data-animate',
      selector: 'root',
      value: 'pulse | flash | breathe | blink | glow',
      condition: '`animate` prop is true and `value` is true',
    },
    {
      modifier: 'data-variant',
      selector: 'root',
      value: 'flat | 3d',
      condition: 'Based on `variant` prop',
    },
  ],
};
