import { describe, it, expect } from 'vitest';
import { render, screen, within, fireEvent } from '@testing-library/react';
import { Spinner, LoadingProvider, LoadingOverlay, LoadingSpinnerFallback } from '../src/spinner';
import React, { Suspense } from 'react';

describe('Spinner component', () => {
  it('renders 7 dots with decreasing sizes outward', () => {
    render(<Spinner size={20} />);
    const root = screen.getByLabelText('Loading');
    const dEls = (root as HTMLElement).querySelectorAll(':scope > div');
    expect(dEls.length).toBe(7);
    const widths = Array.from(dEls).map((el) => (el as HTMLElement).style.width);
    // Center, then 0.85, 0.7, 0.55
    expect(widths[0]).toBe('20px');
    expect(widths[1]).toBe('17px');
    expect(widths[2]).toBe('14px');
    expect(widths[3]).toBe('11px');
  });

  it('centers dots on the same baseline', () => {
    render(<Spinner size={20} />);
    const root = screen.getByLabelText('Loading');
    const dots = (root as HTMLElement).querySelectorAll(':scope > div');
    // pick a side dot
    const side = dots[3] as HTMLElement; // index 3 has smaller size
    expect(side.style.top).toBe('10px'); // size/2
    // marginTop equals (size - dotHeight)/2 -> (20 - 11)/2 = 4.5px
    expect(side.style.marginTop).toBe('4.5px');
  });

  it('uses speed as a rate multiplier (2x faster halves duration)', () => {
    render(<Spinner size={20} speed={2} />);
    const root = screen.getByLabelText('Loading');
    const dot = (root as HTMLElement).querySelector(':scope > div') as HTMLElement;
    expect(dot.style.animationDuration).toBe('0.6s'); // base 1.2s / 2
  });
});

describe('Loading overlay + fallback', () => {
  it('shows overlay while fallback is mounted and hides on unmount', async () => {
    function Wrapper({ show }: { show: boolean }) {
      return (
        <LoadingProvider>
          <LoadingOverlay dismissOnClick />
          {show ? <LoadingSpinnerFallback /> : null}
        </LoadingProvider>
      );
    }
    const { rerender } = render(<Wrapper show={true} />);
    // Overlay present
    expect(screen.getByRole('status')).toBeInTheDocument();
    // Unmount fallback -> overlay hides
    rerender(<Wrapper show={false} />);
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('dismissOnClick hides the overlay', () => {
    function Show() {
      return (
        <LoadingProvider>
          <LoadingOverlay dismissOnClick />
          {/* directly mount fallback to set loading state */}
          <LoadingSpinnerFallback />
        </LoadingProvider>
      );
    }
    render(<Show />);
    const overlay = screen.getByRole('status');
    fireEvent.click(overlay);
    expect(screen.queryByRole('status')).toBeNull();
  });
});
