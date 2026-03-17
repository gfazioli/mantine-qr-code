import QRCodeLib from 'qrcode';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRMatrix {
  /** 2D boolean matrix: true = dark module */
  modules: boolean[][];
  /** Number of modules per side */
  size: number;
}

/**
 * Generate a QR code matrix from a string value.
 * Returns a 2D boolean array where true = dark module.
 */
export function generateQRMatrix(
  value: string,
  errorCorrectionLevel: ErrorCorrectionLevel = 'M'
): QRMatrix {
  const segments = QRCodeLib.create(value, { errorCorrectionLevel });
  const { modules } = segments;
  const size = modules.size;
  const data = modules.data;

  const matrix: boolean[][] = [];
  for (let row = 0; row < size; row++) {
    const rowData: boolean[] = [];
    for (let col = 0; col < size; col++) {
      rowData.push(data[row * size + col] === 1);
    }
    matrix.push(rowData);
  }

  return { modules: matrix, size };
}

/**
 * Check if a module at (row, col) is part of a finder pattern.
 * Finder patterns are 7x7 squares at three corners of the QR code.
 */
export function isFinderPattern(row: number, col: number, matrixSize: number): boolean {
  // Top-left
  if (row < 7 && col < 7) {
    return true;
  }
  // Top-right
  if (row < 7 && col >= matrixSize - 7) {
    return true;
  }
  // Bottom-left
  if (row >= matrixSize - 7 && col < 7) {
    return true;
  }
  return false;
}
