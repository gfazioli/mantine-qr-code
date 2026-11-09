/**
 * Mock for the `qrcode` npm module.
 *
 * The real library is CommonJS and its default export is not resolved
 * correctly by esbuild-jest in the test environment. This mock provides
 * a minimal `create()` that returns a valid 21×21 QR matrix so that
 * the component renders full SVG content in tests.
 */

const SIZE = 21;

function buildModules(): { size: number; data: Uint8Array } {
  const data = new Uint8Array(SIZE * SIZE);

  // Fill finder patterns (7×7 at three corners)
  const fillFinder = (startRow: number, startCol: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const isOuter = r === 0 || r === 6 || c === 0 || c === 6;
        const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        data[(startRow + r) * SIZE + (startCol + c)] = isOuter || isInner ? 1 : 0;
      }
    }
  };

  fillFinder(0, 0); // top-left
  fillFinder(0, SIZE - 7); // top-right
  fillFinder(SIZE - 7, 0); // bottom-left

  // Sprinkle some data modules
  for (let i = 8; i < SIZE - 8; i++) {
    data[8 * SIZE + i] = i % 2 === 0 ? 1 : 0;
    data[i * SIZE + 8] = i % 2 === 0 ? 1 : 0;
  }

  return { size: SIZE, data };
}

/**
 * A test that sets `globalThis.qrMockAllDarkSize` gets an all-dark matrix of that size instead,
 * so every module the component leaves out (e.g. behind an image) shows up as a gap.
 */
function buildAllDarkModules(size: number): { size: number; data: Uint8Array } {
  return { size, data: new Uint8Array(size * size).fill(1) };
}

const qrcode = {
  create: (_value: string, _options?: Record<string, unknown>) => {
    const allDarkSize = (globalThis as { qrMockAllDarkSize?: number }).qrMockAllDarkSize;
    return { modules: allDarkSize ? buildAllDarkModules(allDarkSize) : buildModules() };
  },
};

export default qrcode;
