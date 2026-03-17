import React from 'react';
import { render } from '@mantine-tests/core';
import { QRCode } from './QRCode';

describe('QRCode', () => {
  it('renders without crashing', () => {
    const { container } = render(<QRCode />);
    expect(container).toBeTruthy();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<QRCode ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('applies value prop as data attribute when true', () => {
    const { container } = render(<QRCode />);
    const root = container.querySelector('[data-value]');
    expect(root).toBeTruthy();
  });

  it('does not apply value data attribute when false', () => {
    const { container } = render(<QRCode value={false} />);
    const root = container.querySelector('[data-value]');
    expect(root).toBeFalsy();
  });

  it('applies animation type as data attribute when animate is true and value is true', () => {
    const { container } = render(<QRCode animate animationType="pulse" />);
    const root = container.querySelector('[data-animate="pulse"]');
    expect(root).toBeTruthy();
  });

  it('does not apply animation when animate is false', () => {
    const { container } = render(<QRCode animate={false} animationType="pulse" />);
    const root = container.querySelector('[data-animate]');
    expect(root).toBeFalsy();
  });

  it('does not apply animation when value is false', () => {
    const { container } = render(<QRCode animate animationType="pulse" value={false} />);
    const root = container.querySelector('[data-animate]');
    expect(root).toBeFalsy();
  });

  it('supports flat variant', () => {
    const { container } = render(<QRCode variant="flat" />);
    const root = container.querySelector('[data-variant="flat"]');
    expect(root).toBeTruthy();
  });

  it('supports 3d variant', () => {
    const { container } = render(<QRCode variant="3d" />);
    const root = container.querySelector('[data-variant="3d"]');
    expect(root).toBeTruthy();
  });
});
