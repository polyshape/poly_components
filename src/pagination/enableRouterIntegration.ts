/**
 * Enable React Router integration for pagination components
 * 
 * Call this function once in your app's main entry point (main.tsx/main.ts)
 * if you want automatic URL integration for pagination components.
 * 
 * @example
 * ```tsx
 * // In your main.tsx
 * import { setup } from '@polyutils/components/pagination/enableRouterIntegration';
 * import { useSearchParams } from 'react-router-dom';
 * 
 * setup({ useSearchParams });
 * ```
 */
import { setReactRouterHooks } from "./usePagination.js";

export function setup(hooks: {
  useSearchParams: () => [URLSearchParams, (params: URLSearchParams, opts?: { replace?: boolean }) => void];
}) {
  setReactRouterHooks(hooks);
}