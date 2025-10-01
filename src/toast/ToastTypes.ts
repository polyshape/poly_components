import type { ReactNode } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export type ToastPosition =
  | "topRight"
  | "topCenter"
  | "topLeft"
  | "bottomRight"
  | "bottomCenter"
  | "bottomLeft";

export type ToastTheme = "sync" | "dark" | "light" | "colored";
export type ToastDraggable = "touch" | "always" | "never";

export type ToastIconOverrides = Partial<Record<ToastType, ReactNode | null>>;

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: ReactNode;
  duration?: number;
  paused?: boolean;
  dismissOnClick?: boolean;
  icons?: ToastIconOverrides;
  closeIcon?: ReactNode | null;
  showLoadingBar?: boolean;
  pauseOnHover?: boolean;
  position?: ToastPosition;
  theme?: ToastTheme;
  draggable?: ToastDraggable;
}

export interface ToastOptions {
  title?: string;
  duration?: number;
  paused?: boolean;
  dismissOnClick?: boolean;
  icons?: ToastIconOverrides;
  closeIcon?: ReactNode | null;
  showLoadingBar?: boolean;
  pauseOnHover?: boolean;
  position?: ToastPosition;
  theme?: ToastTheme;
  draggable?: ToastDraggable;
}
