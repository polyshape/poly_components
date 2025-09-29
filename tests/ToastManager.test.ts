import { describe, it, expect, beforeEach } from 'vitest';
import { toastManager, toast } from '../src/toast/ToastManager';
import type { ToastItem } from '../src/toast/ToastTypes';

// Helper to get the latest toast
function getLastToast(): ToastItem | undefined {
  const toasts = toastManager.getToasts();
  return toasts[toasts.length - 1];
}

describe('toastManager', () => {
  beforeEach(() => {
    toastManager.clear();
    if ('clearDefaults' in toastManager) {
      toastManager.clearDefaults();
    }
  });

  it('adds a success toast', () => {
    toast.success('Success!');
    const t = getLastToast();
    expect(t).toBeDefined();
    expect(t?.type).toBe('success');
    expect(t?.message).toBe('Success!');
  });

  it('adds an error toast with title and duration', () => {
    toast.error('Error!', { title: 'Oops', duration: 1234 });
    const t = getLastToast();
    expect(t?.type).toBe('error');
    expect(t?.title).toBe('Oops');
    expect(t?.duration).toBe(1234);
  });

  it('removes a toast by id', () => {
    const id = toast.success('Bye!');
    expect(getLastToast()?.id).toBe(id);
    toast.remove(id);
    expect(toastManager.getToasts().find(t => t.id === id)).toBeUndefined();
  });

  it('clear() removes all toasts', () => {
    toast.success('A');
    toast.error('B');
    expect(toastManager.getToasts().length).toBeGreaterThan(0);
    toast.clear();
    expect(toastManager.getToasts()).toHaveLength(0);
  });

  it('supports dismissOnClick and persistent duration', () => {
    toast.info('Persistent', { dismissOnClick: true, duration: 0 });
    const t = getLastToast();
    expect(t?.dismissOnClick).toBe(true);
    expect(t?.duration).toBe(0);
  });

  it('pauses and resumes a toast', () => {
    const id = toast.success('Pause me', { duration: 2000 });
    toast.pause(id);
    let stored = toastManager.getToasts().find(t => t.id === id);
    expect(stored?.paused).toBe(true);

    toast.play(id);
    stored = toastManager.getToasts().find(t => t.id === id);
    expect(stored?.paused).toBe(false);
  });

  it('reports activity status with isActive', () => {
    const id = toast.info('Check activity');
    expect(toast.isActive(id)).toBe(true);
    toast.remove(id);
    expect(toast.isActive(id)).toBe(false);
  });

  it('respects the paused option on creation', () => {
    const id = toast.warning('Hold position', { duration: 1500, paused: true });
    const stored = toastManager.getToasts().find(t => t.id === id);
    expect(stored?.paused).toBe(true);
  });

  it('per-toast options take precedence over global defaults', () => {
    // Set global defaults via manager (as Toast component would)
    toastManager.setDefaults({ duration: 8000, dismissOnClick: true });

    const id = toast.success('Custom', { duration: 1000, dismissOnClick: false });
    const t = toastManager.getToasts().find(x => x.id === id)!;
    expect(t.duration).toBe(1000);
    expect(t.dismissOnClick).toBe(false);
  });

  it('uses global defaults when per-toast options are not provided', () => {
    toastManager.setDefaults({ duration: 8000, dismissOnClick: true });

    const id = toast.info('No per-toast options');
    const t = toastManager.getToasts().find(x => x.id === id)!;
    expect(t.duration).toBe(8000);
    expect(t.dismissOnClick).toBe(true);
  });

  it('falls back to hard defaults when neither per-toast nor global provided', () => {
    // Make sure defaults are cleared
    toastManager.clearDefaults();

    const id = toast.info('Hard defaults');
    const t = toastManager.getToasts().find(x => x.id === id)!;
    expect(t.duration).toBe(5000);
    expect(t.dismissOnClick).toBe(false);
  });
});
