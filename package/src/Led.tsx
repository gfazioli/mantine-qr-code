import React from 'react';
import {
  Box,
  BoxProps,
  createVarsResolver,
  getFontSize,
  getRadius,
  getSize,
  getThemeColor,
  PolymorphicFactory,
  polymorphicFactory,
  StylesApiProps,
  useProps,
  useStyles,
  type MantineColor,
  type MantineRadius,
  type MantineSize,
  type StyleProp,
} from '@mantine/core';
import classes from './Led.module.css';

export type LedVariant = 'flat' | '3d';

export type LedAnimationType = 'pulse' | 'flash' | 'breathe' | 'blink' | 'glow' | 'none';

export type LedStylesNames = 'root' | 'led' | 'label' | 'light' | 'glow';

export type LedCssVariables = {
  root:
    | '--led-size'
    | '--led-radius'
    | '--led-color'
    | '--led-intensity'
    | '--led-animation-duration'
    | '--led-glow-size'
    | '--led-justify-content';
};

export interface LedBaseProps {
  /** LED color from theme */
  color?: MantineColor;

  /** LED size */
  size?: MantineSize | (string & {}) | number;

  /** Border radius */
  radius?: MantineRadius | (string & {}) | number;

  /** Controls LED on/off state */
  value?: boolean;

  /** Light intensity (0-100) */
  intensity?: number;

  /** Enable animation */
  animate?: boolean;

  /** Animation type; one of 'pulse', 'flash', 'breathe', 'blink', 'glow', or 'none' */
  animationType?: LedAnimationType;

  /** Animation duration in seconds */
  animationDuration?: number;

  /** Label content */
  label?: React.ReactNode;

  /** Label position */
  labelPosition?: 'left' | 'right';

  /** `justify-content` CSS property */
  justify?: StyleProp<React.CSSProperties['justifyContent']>;
}

export interface LedProps extends BoxProps, LedBaseProps, StylesApiProps<LedFactory> {}

export type LedFactory = PolymorphicFactory<{
  props: LedProps;
  defaultComponent: 'div';
  defaultRef: HTMLDivElement;
  stylesNames: LedStylesNames;
  variant: LedVariant;
  vars: LedCssVariables;
}>;

const defaultProps: Partial<LedProps> = {
  color: 'green',
  size: 'sm',
  radius: 'xl',
  value: true,
  variant: 'flat',
  intensity: 80,
  animate: false,
  animationType: 'none',
  animationDuration: 1.5,
  labelPosition: 'right',
};

const varsResolver = createVarsResolver<LedFactory>(
  (theme, { size, radius, color, intensity, animationDuration, justify }) => {
    return {
      root: {
        '--led-size': getSize(size, 'led-size'),
        '--led-radius': radius === undefined ? undefined : getRadius(radius),
        '--led-color': getThemeColor(color, theme),
        '--led-intensity': intensity !== undefined ? `${intensity / 100}` : '0.8',
        '--led-animation-duration':
          animationDuration !== undefined ? `${animationDuration}s` : '1.5s',
        '--led-glow-size': `calc(var(--led-size) * 0.6)`,
        '--led-justify-content': String(justify) || 'center',
      },
    };
  }
);

export const Led = polymorphicFactory<LedFactory>((_props, ref) => {
  const props = useProps('Led', defaultProps, _props);
  const {
    size,
    radius,
    color,
    intensity,
    animationDuration,
    value,
    animate,
    animationType,
    variant,
    label,
    labelPosition,
    justify,

    classNames,
    style,
    styles,
    unstyled,
    vars,
    className,
    mod,
    ...others
  } = props;

  const getStyles = useStyles<LedFactory>({
    name: 'Led',
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  return (
    <Box
      ref={ref}
      {...getStyles('root')}
      {...others}
      mod={[{ 'label-position': labelPosition }, mod]}
      __vars={{
        '--label-fz': getFontSize(size),
        '--label-lh': getSize(size, 'label-lh'),
      }}
    >
      <Box
        {...getStyles('led')}
        variant={variant}
        data-value={value || undefined}
        data-animate={animate && value ? animationType : undefined}
      >
        <Box {...getStyles('glow')} />
        <Box {...getStyles('light')} />
      </Box>
      {label && <Box {...getStyles('label')}>{label}</Box>}
    </Box>
  );
});

Led.classes = classes;
Led.displayName = 'Led';
