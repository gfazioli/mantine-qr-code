import { LedFactory } from '@gfazioli/mantine-led';
import type { StylesApiData } from '../components/styles-api.types';

export const LedStylesApi: StylesApiData<LedFactory> = {
  selectors: {
    root: 'Root element',
    led: 'LED element',
    label: 'Label element',
    glow: 'Outer glow effect element',
    light: 'Inner light reflection element',
  },

  vars: {
    root: {
      '--led-size': 'Controls LED width and height',
      '--led-radius': 'Controls border radius',
      '--led-color': 'Controls LED base color',
      '--led-intensity': 'Controls brightness intensity (0-1)',
      '--led-animation-duration': 'Controls animation duration',
      '--led-glow-size': 'Controls outer glow size',
      '--led-justify-content': 'Controls label and LED alignment',
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
