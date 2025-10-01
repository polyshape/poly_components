import { useContext } from "react";
import { LoadingContext, LoadingContextValue } from "./LoadingContext.js";

export function useLoading(): LoadingContextValue {
  const ctx = useContext(LoadingContext);
  if (!ctx) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return ctx;
}
