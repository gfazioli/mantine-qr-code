/**
 * Module range `[start, end)` to clear ("excavate") on both axes to make room for an image overlay.
 *
 * A QR matrix always has an odd number of modules per side and the image is centred on it,
 * so the cleared square is only centred on the image when it spans an odd number of modules.
 * Its side is the odd count nearest to the image plus `imagePadding` modules on each side,
 * which leaves the same clearance on all four sides: `imagePadding` give or take half a module.
 */
export function getExcavationBounds(
  matrixSize: number,
  imageModuleSize: number,
  imagePadding: number
): { start: number; end: number } {
  const clearedModules = 2 * Math.round((imageModuleSize + imagePadding * 2 - 1) / 2) + 1;
  const start = (matrixSize - clearedModules) / 2;
  return { start, end: start + clearedModules };
}
