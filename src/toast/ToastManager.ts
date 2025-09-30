import type { ReactNode } from 'react';
import { ToastItem, ToastType, ToastOptions } from './ToastTypes';

class ToastManager {
  private listeners: Set<(toasts: ToastItem[]) => void> = new Set();
  private toasts: ToastItem[] = [];
  private counter = 0;
  private defaultOptions: Partial<ToastOptions> = {};

  private generateId(): string {
    return `toast-${++this.counter}-${Date.now()}`;
  }

  private addToast(type: ToastType, message: ReactNode, options?: ToastOptions): string {
    const id = this.generateId();

    const resolvedCloseIcon =
      options?.closeIcon !== undefined
        ? options.closeIcon
        : this.defaultOptions.closeIcon;

    const toast: ToastItem = {
      id,
      type,
      message,
      title: options?.title,
      duration: options?.duration ?? this.defaultOptions.duration ?? 5000,
      paused: options?.paused ?? this.defaultOptions.paused ?? false,
      dismissOnClick: options?.dismissOnClick ?? this.defaultOptions.dismissOnClick ?? false,
      icons: options?.icons ?? this.defaultOptions.icons,
      closeIcon: resolvedCloseIcon,
      showLoadingBar: options?.showLoadingBar ?? this.defaultOptions.showLoadingBar,
      pauseOnHover: options?.pauseOnHover ?? this.defaultOptions.pauseOnHover,
      position: options?.position ?? this.defaultOptions.position,
      theme: options?.theme ?? this.defaultOptions.theme,
      draggable: options?.draggable ?? this.defaultOptions.draggable,
    };

    this.toasts = [...this.toasts, toast];
    this.notifyListeners();
    return id;
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener([...this.toasts]));
  }

  subscribe(listener: (toasts: ToastItem[]) => void): () => void {
    this.listeners.add(listener);
    // Immediately call with current toasts
    listener([...this.toasts]);
    
    return () => {
      this.listeners.delete(listener);
    };
  }

  success(message: ReactNode, options?: ToastOptions): string {
    return this.addToast('success', message, options);
  }

  error(message: ReactNode, options?: ToastOptions): string {
    return this.addToast('error', message, options);
  }

  warning(message: ReactNode, options?: ToastOptions): string {
    return this.addToast('warning', message, options);
  }

  info(message: ReactNode, options?: ToastOptions): string {
    return this.addToast('info', message, options);
  }

  remove(id: string): void {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.notifyListeners();
  }

  clear(): void {
    this.toasts = [];
    this.notifyListeners();
  }

  pause(id: string): void {
    let updated = false;
    this.toasts = this.toasts.map(toast => {
      if (toast.id === id) {
        updated = true;
        return { ...toast, paused: true };
      }
      return toast;
    });
    if (updated) {
      this.notifyListeners();
    }
  }

  play(id: string): void {
    let updated = false;
    this.toasts = this.toasts.map(toast => {
      if (toast.id === id) {
        updated = true;
        return { ...toast, paused: false };
      }
      return toast;
    });
    if (updated) {
      this.notifyListeners();
    }
  }

  isActive(id: string): boolean {
    return this.toasts.some(toast => toast.id === id);
  }

  getToasts(): ToastItem[] {
    return [...this.toasts];
  }

  setDefaults(defaults: Partial<ToastOptions>): void {
    this.defaultOptions = { ...this.defaultOptions, ...defaults };
  }

  // Clear all configured defaults (mainly for tests)
  clearDefaults(): void {
    this.defaultOptions = {};
  }
}

export const toastManager = new ToastManager();

// Export the toast function that users will call
export const toast = {
  success: (message: ReactNode, options?: ToastOptions) => toastManager.success(message, options),
  error: (message: ReactNode, options?: ToastOptions) => toastManager.error(message, options),
  warning: (message: ReactNode, options?: ToastOptions) => toastManager.warning(message, options),
  info: (message: ReactNode, options?: ToastOptions) => toastManager.info(message, options),
  pause: (id: string) => toastManager.pause(id),
  play: (id: string) => toastManager.play(id),
  isActive: (id: string) => toastManager.isActive(id),
  remove: (id: string) => toastManager.remove(id),
  clear: () => toastManager.clear(),
};




