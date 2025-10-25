import { useState } from "react";
import { LoadingContext } from "./LoadingContext.js";
import type { ReactNode } from "react";
import type { LoadingState } from "./LoadingContext.js";

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [state, setLoadingState] = useState<LoadingState>(null);

  return (
    <LoadingContext.Provider value={{ state, setLoadingState }}>
      {children}
    </LoadingContext.Provider>
  );
}
