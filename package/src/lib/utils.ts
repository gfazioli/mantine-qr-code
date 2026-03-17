/**
 * Determine which modules should be cleared ("excavated") to make room for an image overlay.
 * Returns a 2D boolean array where true = module should be hidden.
 */
export function getExcavationMask(
  matrixSize: number,
  imageModuleSize: number,
  imagePadding: number
): boolean[][] {
  const mask: boolean[][] = Array.from({ length: matrixSize }, () => Array(matrixSize).fill(false));

  const totalImageModules = imageModuleSize + imagePadding * 2;
  const startModule = Math.floor((matrixSize - totalImageModules) / 2);
  const endModule = startModule + totalImageModules;

  for (let row = 0; row < matrixSize; row++) {
    for (let col = 0; col < matrixSize; col++) {
      if (row >= startModule && row < endModule && col >= startModule && col < endModule) {
        mask[row][col] = true;
      }
    }
  }

  return mask;
}
