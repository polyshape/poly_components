import { useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";

type PaginationOptions = {
  getPage?: () => number | undefined;
  setPageParam?: (n: number) => void;
};

// This will be set by the consuming app if they want React Router integration
let reactRouterHooks: {
  useSearchParams: () => [URLSearchParams, (params: URLSearchParams, opts?: { replace?: boolean }) => void];
} | null = null;

// Function to register React Router hooks (called by consuming app)
export function setReactRouterHooks(hooks: {
  useSearchParams: () => [URLSearchParams, (params: URLSearchParams, opts?: { replace?: boolean }) => void];
}) {
  reactRouterHooks = hooks;
}

export function usePagination<T>(items: T[], pageSize: number, options?: PaginationOptions) {
  const normalizedSize = Math.max(1, Math.floor(pageSize || 1));
  const totalPages = Math.max(1, Math.ceil(items.length / normalizedSize));

  // Try to use external getPage/setPageParam if provided
  const getPage = options?.getPage;
  const setPageParam = options?.setPageParam;

  // Try to use react-router-dom if available and no external options
  let useRouter = false;
  let params: URLSearchParams | undefined = undefined;
  let setParams: ((next: URLSearchParams, opts?: { replace?: boolean }) => void) | undefined = undefined;
  
  if (!getPage && !setPageParam && reactRouterHooks) {
    try {
      [params, setParams] = reactRouterHooks.useSearchParams();
      useRouter = true;
    } catch {
      // Router hooks failed, fall back to local state
    }
  }

  // Initial page
  let initialPage = 1;
  if (getPage) {
    initialPage = clampPage(Number(getPage()) || 1, totalPages);
  } else if (useRouter && params) {
    initialPage = clampPage(Number(params.get("page")) || 1, totalPages);
  }
  const [page, setPageState] = useState<number>(initialPage);

  // Keep local state in sync with external or router state
  const currentPageValue = getPage ? getPage() : params;
  useEffect(() => {
    let fromExternal = 1;
    if (getPage) {
      fromExternal = clampPage(Number(getPage()) || 1, totalPages);
    } else if (useRouter && params) {
      fromExternal = clampPage(Number(params.get("page")) || 1, totalPages);
    }
    if (fromExternal !== page) {
      setPageState(fromExternal);
    }
  }, [currentPageValue, totalPages, getPage, page, params, useRouter]);

  const visible = useMemo(() => {
    const start = (page - 1) * normalizedSize;
    return items.slice(start, start + normalizedSize);
  }, [items, page, normalizedSize]);

  function setPage(n: number) {
    const clamped = clampPage(n, totalPages);
    flushSync(() => setPageState(clamped));
    if (setPageParam) {
      setPageParam(clamped);
    } else if (useRouter && params && setParams) {
      const next = new URLSearchParams(params);
      next.set("page", String(clamped));
      setParams(next, { replace: false });
    }
    // Otherwise, just update local state
  }

  return { visible, currentPage: page, totalPages, setPage };
}

function clampPage(n: number, max: number) {
  if (Number.isNaN(n)) return 1;
  if (n === Infinity) return Math.max(1, max);
  if (n === -Infinity) return 1;
  const int = Math.floor(n);
  if (int < 1) return 1;
  if (int > max) return max;
  return int;
}
