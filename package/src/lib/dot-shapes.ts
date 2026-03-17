export type DotStyle = 'square' | 'rounded' | 'dots';

/**
 * Generate SVG path data for a single dot module at the given position.
 */
export function dotPath(x: number, y: number, cellSize: number, style: DotStyle): string {
  switch (style) {
    case 'dots':
      return circlePath(x, y, cellSize);
    case 'rounded':
      return roundedSquarePath(x, y, cellSize);
    case 'square':
    default:
      return squarePath(x, y, cellSize);
  }
}

function squarePath(x: number, y: number, size: number): string {
  return `M${x},${y}h${size}v${size}h${-size}z`;
}

function circlePath(x: number, y: number, size: number): string {
  const r = size / 2;
  const cx = x + r;
  const cy = y + r;
  return `M${cx},${cy - r}a${r},${r} 0 1,1 0,${r * 2}a${r},${r} 0 1,1 0,${-r * 2}z`;
}

function roundedSquarePath(x: number, y: number, size: number): string {
  const r = size * 0.3;
  return (
    `M${x + r},${y}` +
    `h${size - 2 * r}` +
    `a${r},${r} 0 0,1 ${r},${r}` +
    `v${size - 2 * r}` +
    `a${r},${r} 0 0,1 ${-r},${r}` +
    `h${-(size - 2 * r)}` +
    `a${r},${r} 0 0,1 ${-r},${-r}` +
    `v${-(size - 2 * r)}` +
    `a${r},${r} 0 0,1 ${r},${-r}z`
  );
}
