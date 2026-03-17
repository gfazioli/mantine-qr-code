export type CornerStyle = 'square' | 'rounded' | 'dots';

interface FinderPaths {
  outer: string;
  inner: string;
}

/**
 * Generate SVG path data for a finder pattern (7x7 modules).
 * Returns separate paths for the outer ring and inner square.
 */
export function finderPatternPaths(
  x: number,
  y: number,
  cellSize: number,
  style: CornerStyle
): FinderPaths {
  switch (style) {
    case 'dots':
      return dotsFinderPaths(x, y, cellSize);
    case 'rounded':
      return roundedFinderPaths(x, y, cellSize);
    case 'square':
    default:
      return squareFinderPaths(x, y, cellSize);
  }
}

function squareFinderPaths(x: number, y: number, cs: number): FinderPaths {
  const s7 = cs * 7;
  const s5 = cs * 5;
  const s3 = cs * 3;
  const s1 = cs;

  // Outer: 7x7 with 5x5 hole
  const outer = `M${x},${y}h${s7}v${s7}h${-s7}z` + `M${x + s1},${y + s1}v${s5}h${s5}v${-s5}z`;

  // Inner: 3x3 solid
  const inner = `M${x + cs * 2},${y + cs * 2}h${s3}v${s3}h${-s3}z`;

  return { outer, inner };
}

function roundedFinderPaths(x: number, y: number, cs: number): FinderPaths {
  const r7 = cs * 1.2;
  const s7 = cs * 7;
  const r5 = cs * 0.8;
  const s5 = cs * 5;
  const r3 = cs * 0.6;
  const s3 = cs * 3;

  // Outer ring (7x7 rounded rect with 5x5 rounded hole)
  const outer = roundedRect(x, y, s7, s7, r7) + roundedRectReverse(x + cs, y + cs, s5, s5, r5);

  // Inner (3x3 rounded rect)
  const inner = roundedRect(x + cs * 2, y + cs * 2, s3, s3, r3);

  return { outer, inner };
}

function dotsFinderPaths(x: number, y: number, cs: number): FinderPaths {
  const r7 = cs * 3.5;
  const s7 = cs * 7;
  const r5 = cs * 2.5;
  const s5 = cs * 5;
  const r3 = cs * 1.5;
  const s3 = cs * 3;

  // Outer: fully rounded (circle-like) outer with hole
  const outer = roundedRect(x, y, s7, s7, r7) + roundedRectReverse(x + cs, y + cs, s5, s5, r5);

  // Inner: circle
  const inner = roundedRect(x + cs * 2, y + cs * 2, s3, s3, r3);

  return { outer, inner };
}

function roundedRect(x: number, y: number, w: number, h: number, r: number): string {
  return (
    `M${x + r},${y}` +
    `h${w - 2 * r}a${r},${r} 0 0,1 ${r},${r}` +
    `v${h - 2 * r}a${r},${r} 0 0,1 ${-r},${r}` +
    `h${-(w - 2 * r)}a${r},${r} 0 0,1 ${-r},${-r}` +
    `v${-(h - 2 * r)}a${r},${r} 0 0,1 ${r},${-r}z`
  );
}

function roundedRectReverse(x: number, y: number, w: number, h: number, r: number): string {
  // Counter-clockwise for SVG even-odd fill rule (creates a hole)
  return (
    `M${x + r},${y}` +
    `a${r},${r} 0 0,0 ${-r},${r}` +
    `v${h - 2 * r}a${r},${r} 0 0,0 ${r},${r}` +
    `h${w - 2 * r}a${r},${r} 0 0,0 ${r},${-r}` +
    `v${-(h - 2 * r)}a${r},${r} 0 0,0 ${-r},${-r}z`
  );
}
