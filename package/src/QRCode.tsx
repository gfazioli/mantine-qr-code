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
import classes from './QRCode.module.css';

export type QRCodeVariant = 'flat' | '3d';

export type QRCodeAnimationType = 'pulse' | 'flash' | 'breathe' | 'blink' | 'glow' | 'none';

export type QRCodeStylesNames = 'root' | 'qrCode' | 'label' | 'light' | 'glow';

export type QRCodeCssVariables = {
  root:
    | '--qr-code-size'
    | '--qr-code-radius'
    | '--qr-code-color'
    | '--qr-code-intensity'
    | '--qr-code-animation-duration'
    | '--qr-code-glow-size'
    | '--qr-code-justify-content';
};

export interface QRCodeBaseProps {
  /** QRCode color from theme */
  color?: MantineColor;

  /** QRCode size */
  size?: MantineSize | (string & {}) | number;

  /** Border radius */
  radius?: MantineRadius | (string & {}) | number;

  /** Controls QRCode on/off state */
  value?: boolean;

  /** Light intensity (0-100) */
  intensity?: number;

  /** Enable animation */
  animate?: boolean;

  /** Animation type; one of 'pulse', 'flash', 'breathe', 'blink', 'glow', or 'none' */
  animationType?: QRCodeAnimationType;

  /** Animation duration in seconds */
  animationDuration?: number;

  /** Label content */
  label?: React.ReactNode;

  /** Label position */
  labelPosition?: 'left' | 'right';

  /** `justify-content` CSS property */
  justify?: StyleProp<React.CSSProperties['justifyContent']>;
}

export interface QRCodeProps extends BoxProps, QRCodeBaseProps, StylesApiProps<QRCodeFactory> {}

export type QRCodeFactory = PolymorphicFactory<{
  props: QRCodeProps;
  defaultComponent: 'div';
  defaultRef: HTMLDivElement;
  stylesNames: QRCodeStylesNames;
  variant: QRCodeVariant;
  vars: QRCodeCssVariables;
}>;

const defaultProps: Partial<QRCodeProps> = {
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

const varsResolver = createVarsResolver<QRCodeFactory>(
  (theme, { size, radius, color, intensity, animationDuration, justify }) => {
    return {
      root: {
        '--qr-code-size': getSize(size, 'qr-code-size'),
        '--qr-code-radius': radius === undefined ? undefined : getRadius(radius),
        '--qr-code-color': getThemeColor(color, theme),
        '--qr-code-intensity': intensity !== undefined ? `${intensity / 100}` : '0.8',
        '--qr-code-animation-duration':
          animationDuration !== undefined ? `${animationDuration}s` : '1.5s',
        '--qr-code-glow-size': `calc(var(--qr-code-size) * 0.6)`,
        '--qr-code-justify-content': String(justify) || 'center',
      },
    };
  }
);

export const QRCode = polymorphicFactory<QRCodeFactory>((_props, ref) => {
  const props = useProps('QRCode', defaultProps, _props);
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

  const getStyles = useStyles<QRCodeFactory>({
    name: 'QRCode',
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
        {...getStyles('qrCode')}
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

QRCode.classes = classes;
QRCode.displayName = 'QRCode';
