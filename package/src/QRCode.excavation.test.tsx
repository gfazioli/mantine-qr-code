import { render } from '@mantine-tests/core';
import React from 'react';
import { isFinderPattern } from './lib/qr-encoder';
import { QRCode } from './QRCode';

// An all-dark matrix (see __mocks__/qrcode.ts) makes every excavated module a gap in the path.
const mockGlobal = globalThis as { qrMockAllDarkSize?: number };
afterEach(() => {
  delete mockGlobal.qrMockAllDarkSize;
});

/** Bounding box, in viewBox units, of the data modules missing from the rendered path. */
function getHole(container: HTMLElement, matrixSize: number, quietZone: number) {
  const d = container.querySelector('svg path')?.getAttribute('d') ?? '';
  const drawn = new Set(Array.from(d.matchAll(/M(\d+),(\d+)/g), (m) => `${m[1]},${m[2]}`));
  const xs: number[] = [];
  const ys: number[] = [];
  for (let row = 0; row < matrixSize; row++) {
    for (let col = 0; col < matrixSize; col++) {
      const [x, y] = [col + quietZone, row + quietZone];
      if (!isFinderPattern(row, col, matrixSize) && !drawn.has(`${x},${y}`)) {
        xs.push(x);
        ys.push(y);
      }
    }
  }
  const [left, right] = [Math.min(...xs), Math.max(...xs) + 1];
  const [top, bottom] = [Math.min(...ys), Math.max(...ys) + 1];
  // Every module inside the box is a gap, except finder-pattern cells, which are drawn separately.
  const drawnInBox = (right - left) * (bottom - top) - xs.length;
  let finderCellsInBox = 0;
  for (let y = top; y < bottom; y++) {
    for (let x = left; x < right; x++) {
      finderCellsInBox += isFinderPattern(y - quietZone, x - quietZone, matrixSize) ? 1 : 0;
    }
  }
  return { left, right, top, bottom, filled: drawnInBox === finderCellsInBox };
}

describe('QRCode image excavation', () => {
  const sizes = [21, 25, 29, 33, 57];
  const imageSizes = [0.1, 0.15, 0.2, 0.25, 0.3];
  const paddings = [0, 1, 2];

  for (const matrixSize of sizes) {
    for (const imageSize of imageSizes) {
      for (const imagePadding of paddings) {
        it(`centres the cleared area on the image (matrix ${matrixSize}, imageSize ${imageSize}, imagePadding ${imagePadding})`, () => {
          mockGlobal.qrMockAllDarkSize = matrixSize;
          const quietZone = 1;
          const { container } = render(
            <QRCode
              value="test"
              image="https://example.com/logo.png"
              imageSize={imageSize}
              imagePadding={imagePadding}
              quietZone={quietZone}
            />
          );
          const image = container.querySelector('image')!;
          const imgX = Number(image.getAttribute('x'));
          const imgY = Number(image.getAttribute('y'));
          const imgSize = Number(image.getAttribute('width'));
          const hole = getHole(container, matrixSize, quietZone);

          const margins = {
            left: imgX - hole.left,
            right: hole.right - (imgX + imgSize),
            top: imgY - hole.top,
            bottom: hole.bottom - (imgY + imgSize),
          };

          // A filled square hole...
          const side = hole.right - hole.left;
          expect(hole.bottom - hole.top).toBe(side);
          expect(hole.filled).toBe(true);
          // ...with the same clearance on every side of the image...
          for (const margin of [margins.right, margins.top, margins.bottom]) {
            expect(margin).toBeCloseTo(margins.left, 6);
          }
          // ...within half a module of the requested padding.
          expect(Math.abs(margins.left - imagePadding)).toBeLessThanOrEqual(0.5 + 1e-6);
        });
      }
    }
  }
});
