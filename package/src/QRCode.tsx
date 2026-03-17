import React, { useMemo } from 'react';
import {
  Box,
  createVarsResolver,
  getRadius,
  getSize,
  getThemeColor,
  polymorphicFactory,
  useProps,
  useStyles,
  type BoxProps,
  type ElementProps,
  type MantineColor,
  type MantineRadius,
  type MantineSize,
  type PolymorphicFactory,
  type StylesApiProps,
} from '@mantine/core';
import { dotPath, type DotStyle } from './lib/dot-shapes';
import { finderPatternPaths, type CornerStyle } from './lib/finder-shapes';
import { generateQRMatrix, isFinderPattern } from './lib/qr-encoder';
import { getExcavationMask } from './lib/utils';
import classes from './QRCode.module.css';

export type QRCodeErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
export type QRCodeDotStyle = DotStyle;
export type QRCodeCornerStyle = CornerStyle;
export type QRCodeStylesNames =
  | 'root'
  | 'svg'
  | 'background'
  | 'modules'
  | 'finderPattern'
  | 'finderOuter'
  | 'finderInner'
  | 'image';

export interface QRCodeCssVariables {
  root: '--qr-code-size' | '--qr-code-radius' | '--qr-code-color' | '--qr-code-background';
}

export interface QRCodeBaseProps {
  /** Data to encode in the QR code (URL, text, etc.) */
  value: string;

  /** QR code size */
  size?: MantineSize | (string & {}) | number;

  /** Border radius of the outer container */
  radius?: MantineRadius | (string & {}) | number;

  /** Module (foreground) color from Mantine theme */
  color?: MantineColor;

  /** Background color from Mantine theme, or 'transparent' */
  background?: MantineColor | 'transparent';

  /** Error correction level: L (7%), M (15%), Q (25%), H (30%) */
  errorCorrectionLevel?: QRCodeErrorCorrectionLevel;

  /** Quiet zone modules around the QR code */
  quietZone?: number;

  /** Data module style */
  dotStyle?: QRCodeDotStyle;

  /** Finder pattern (corner) style */
  cornerStyle?: QRCodeCornerStyle;

  /** URL of an image/logo to overlay at center */
  image?: string;

  /** Image size relative to QR code (0-1) */
  imageSize?: number;

  /** Border radius of the center image */
  imageRadius?: MantineRadius | (string & {}) | number;

  /** Padding around the image in modules */
  imagePadding?: number;

  /** Remove QR modules behind the image */
  imageExcavate?: boolean;
}

export type QRCodeFactory = PolymorphicFactory<{
  props: QRCodeBaseProps & BoxProps & StylesApiProps<QRCodeFactory> & ElementProps<'div', 'color'>;
  defaultComponent: 'div';
  defaultRef: HTMLDivElement;
  stylesNames: QRCodeStylesNames;
  vars: QRCodeCssVariables;
}>;

const defaultProps: Partial<QRCodeBaseProps> = {
  size: 'md',
  color: 'dark',
  background: 'white',
  errorCorrectionLevel: 'M',
  quietZone: 1,
  dotStyle: 'square',
  cornerStyle: 'square',
  imageSize: 0.2,
  imagePadding: 1,
  imageExcavate: true,
};

const varsResolver = createVarsResolver<QRCodeFactory>((theme, props) => {
  const { size, radius, color, background } = props;

  return {
    root: {
      '--qr-code-size': getSize(size, 'qr-code-size'),
      '--qr-code-radius': radius !== undefined ? getRadius(radius) : undefined,
      '--qr-code-color': color ? getThemeColor(color, theme) : undefined,
      '--qr-code-background':
        background === 'transparent'
          ? 'transparent'
          : background
            ? getThemeColor(background, theme)
            : undefined,
    },
  };
});

export const QRCode = polymorphicFactory<QRCodeFactory>((_props, ref) => {
  const props = useProps('QRCode', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    value,
    size,
    radius,
    color,
    background,
    errorCorrectionLevel,
    quietZone,
    dotStyle,
    cornerStyle,
    image,
    imageSize,
    imageRadius,
    imagePadding,
    imageExcavate,
    ...others
  } = props;

  const getStyles = useStyles<QRCodeFactory>({
    name: 'QRCode',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  const qrData = useMemo(() => {
    if (!value) {
      return null;
    }
    try {
      return generateQRMatrix(value, errorCorrectionLevel);
    } catch {
      return null;
    }
  }, [value, errorCorrectionLevel]);

  const svgContent = useMemo(() => {
    if (!qrData) {
      return null;
    }

    const { modules, size: matrixSize } = qrData;
    const qz = quietZone!;
    const totalModules = matrixSize + qz * 2;
    const cellSize = 1;
    const viewBoxSize = totalModules * cellSize;

    // Excavation mask for image overlay
    let excavationMask: boolean[][] | null = null;
    if (image && imageExcavate) {
      const imgModules = Math.ceil(matrixSize * imageSize!);
      excavationMask = getExcavationMask(matrixSize, imgModules, imagePadding!);
    }

    // Build data modules path (excluding finder patterns and excavated area)
    let modulesPath = '';
    for (let row = 0; row < matrixSize; row++) {
      for (let col = 0; col < matrixSize; col++) {
        if (!modules[row][col]) {
          continue;
        }
        if (isFinderPattern(row, col, matrixSize)) {
          continue;
        }
        if (excavationMask && excavationMask[row][col]) {
          continue;
        }
        const x = (col + qz) * cellSize;
        const y = (row + qz) * cellSize;
        modulesPath += dotPath(x, y, cellSize, dotStyle!);
      }
    }

    // Finder patterns at three corners
    const finderPositions = [
      { key: 'top-left', row: 0, col: 0 },
      { key: 'top-right', row: 0, col: matrixSize - 7 },
      { key: 'bottom-left', row: matrixSize - 7, col: 0 },
    ];

    const finders = finderPositions.map((pos) => {
      const fx = (pos.col + qz) * cellSize;
      const fy = (pos.row + qz) * cellSize;
      return { key: pos.key, ...finderPatternPaths(fx, fy, cellSize, cornerStyle!) };
    });

    // Image overlay
    let imageElement = null;
    if (image) {
      const imgPixelSize = matrixSize * imageSize! * cellSize;
      const imgX = (viewBoxSize - imgPixelSize) / 2;
      const imgY = (viewBoxSize - imgPixelSize) / 2;
      const imgRad = imageRadius !== undefined ? getRadius(imageRadius) : '0';
      imageElement = { x: imgX, y: imgY, size: imgPixelSize, radius: imgRad };
    }

    return { viewBoxSize, modulesPath, finders, imageElement };
  }, [
    qrData,
    quietZone,
    dotStyle,
    cornerStyle,
    image,
    imageSize,
    imageExcavate,
    imagePadding,
    imageRadius,
  ]);

  if (!svgContent) {
    return (
      <Box ref={ref} {...getStyles('root')} {...others}>
        <svg {...getStyles('svg')} />
      </Box>
    );
  }

  const { viewBoxSize, modulesPath, finders, imageElement } = svgContent;

  return (
    <Box ref={ref} {...getStyles('root')} {...others}>
      <svg
        {...getStyles('svg')}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`QR Code: ${value}`}
      >
        <rect {...getStyles('background')} x="0" y="0" width={viewBoxSize} height={viewBoxSize} />
        {modulesPath && <path {...getStyles('modules')} d={modulesPath} fillRule="nonzero" />}
        {finders.map((finder) => (
          <g key={finder.key} {...getStyles('finderPattern')}>
            <path {...getStyles('finderOuter')} d={finder.outer} fillRule="evenodd" />
            <path {...getStyles('finderInner')} d={finder.inner} />
          </g>
        ))}
        {imageElement && (
          <image
            {...getStyles('image')}
            href={image}
            x={imageElement.x}
            y={imageElement.y}
            width={imageElement.size}
            height={imageElement.size}
            clipPath={`inset(0 round ${imageElement.radius})`}
            preserveAspectRatio="xMidYMid slice"
          />
        )}
      </svg>
    </Box>
  );
});

QRCode.classes = classes;
QRCode.displayName = 'QRCode';
