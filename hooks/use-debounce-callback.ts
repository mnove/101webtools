"use client";

import { useRef, useEffect, useCallback } from "react";

type UseDebounceCallbackHandlers = {
  cancel: () => void;
};

/**
 * Custom React hook that returns a debounced version of a callback function and a handler to cancel it.
 *
 * @template TArgs The argument types for the callback.
 * @param callback - The function to debounce.
 * @param delay - The debounce delay in milliseconds.
 * @returns A tuple containing the debounced callback and an object with a `cancel` handler.
 *
 * @example
 * const [debouncedFn, { cancel }] = useDebounceCallback((val) => { ... }, 300);
 * debouncedFn("value");
 * cancel(); // cancels any pending invocation
 */
function useDebounceCallback<TArgs extends any[]>(
  callback: (...args: TArgs) => void,
  delay: number
): [(...args: TArgs) => void, UseDebounceCallbackHandlers] {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedFn = useCallback(
    (...args: TArgs) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [debouncedFn, { cancel }];
}

export { useDebounceCallback };
export type { UseDebounceCallbackHandlers };
