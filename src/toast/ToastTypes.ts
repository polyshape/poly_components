export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  paused?: boolean;
  dismissOnClick?: boolean;
}

export interface ToastOptions {
  title?: string;
  duration?: number;
  paused?: boolean;
  dismissOnClick?: boolean;
}
