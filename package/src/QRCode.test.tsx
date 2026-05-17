import { render } from '@mantine-tests/core';
import React from 'react';
import { QRCode } from './QRCode';

describe('QRCode', () => {
  it('renders without crashing', () => {
    const { container } = render(<QRCode value="https://mantine.dev" />);
    expect(container).toBeTruthy();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<QRCode value="test" ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('renders SVG element with QR data', () => {
    const { container } = render(<QRCode value="https://mantine.dev" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('viewBox')).toBeTruthy();
  });

  it('renders background rect', () => {
    const { container } = render(<QRCode value="test" />);
    const rect = container.querySelector('rect');
    expect(rect).toBeTruthy();
  });

  it('renders data modules path', () => {
    const { container } = render(<QRCode value="test" />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('renders three finder patterns', () => {
    const { container } = render(<QRCode value="test" />);
    const groups = container.querySelectorAll('g');
    expect(groups.length).toBe(3);
  });

  it('renders empty SVG when value is empty', () => {
    const { container } = render(<QRCode value="" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('viewBox')).toBeFalsy();
  });

  it('supports different dot styles', () => {
    const { container: sq } = render(<QRCode value="test" dotStyle="square" />);
    const { container: rd } = render(<QRCode value="test" dotStyle="rounded" />);
    const { container: dt } = render(<QRCode value="test" dotStyle="dots" />);
    expect(sq.querySelector('path')).toBeTruthy();
    expect(rd.querySelector('path')).toBeTruthy();
    expect(dt.querySelector('path')).toBeTruthy();
  });

  it('supports different corner styles', () => {
    const { container: sq } = render(<QRCode value="test" cornerStyle="square" />);
    const { container: rd } = render(<QRCode value="test" cornerStyle="rounded" />);
    const { container: dt } = render(<QRCode value="test" cornerStyle="dots" />);
    expect(sq.querySelector('g')).toBeTruthy();
    expect(rd.querySelector('g')).toBeTruthy();
    expect(dt.querySelector('g')).toBeTruthy();
  });

  it('renders image element when image prop is provided', () => {
    const { container } = render(
      <QRCode value="test" image="https://example.com/logo.png" errorCorrectionLevel="H" />
    );
    const image = container.querySelector('image');
    expect(image).toBeTruthy();
    expect(image?.getAttribute('href')).toBe('https://example.com/logo.png');
  });

  it('does not render image element when image prop is not provided', () => {
    const { container } = render(<QRCode value="test" />);
    const image = container.querySelector('image');
    expect(image).toBeFalsy();
  });

  it('supports different error correction levels', () => {
    const levels = ['L', 'M', 'Q', 'H'] as const;
    levels.forEach((level) => {
      const { container } = render(<QRCode value="test" errorCorrectionLevel={level} />);
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
