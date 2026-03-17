import { QRCodeFactory } from '@gfazioli/mantine-qr-code';
import type { StylesApiData } from '../components/styles-api.types';

export const QRCodeStylesApi: StylesApiData<QRCodeFactory> = {
  selectors: {
    root: 'Root element (container)',
    svg: 'SVG element',
    background: 'Background rect element',
    modules: 'Combined path of all data modules',
    finderPattern: 'Group element for each finder pattern',
    finderOuter: 'Outer ring path of finder pattern',
    finderInner: 'Inner square path of finder pattern',
    image: 'Center image overlay element',
  },

  vars: {
    root: {
      '--qr-code-size': 'Controls QR code width and height',
      '--qr-code-radius': 'Controls border radius of the container',
      '--qr-code-color': 'Controls foreground (module) color',
      '--qr-code-bg-color': 'Controls background color',
    },
  },

  modifiers: [],
};
