"use client";

import { useState, useEffect, useCallback } from "react";

type UseDebounceValueOptions = {
  onDebounce?: (value: any) => void;
};

type UseDebounceValueHandlers<T> = {
  setValue: (val: T) => void;
};

/**
 * Custom React hook that returns a debounced value and a handler to update it.
 *
 * @template T The type of the value being debounced.
 * @param initialValue - The initial value to be debounced.
 * @param delay - The debounce delay in milliseconds.
 * @param options - Optional configuration object.
 * @param options.onDebounce - Optional callback invoked with the debounced value after the delay.
 * @returns A tuple containing the debounced value and an object with a `setValue` handler to update the value.
 *
 * @example
 * const [debouncedValue, { setValue }] = useDebounceValue(inputValue, 300);
 */
function useDebounceValue<T>(
  initialValue: T,
  delay: number,
  options: UseDebounceValueOptions = {}
): [T, UseDebounceValueHandlers<T>] {
  const [internalValue, setInternalValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    setInternalValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(internalValue);
      options.onDebounce?.(internalValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [internalValue, delay, options.onDebounce]);

  const setValue = useCallback((val: T) => {
    setInternalValue(val);
  }, []);

  return [debouncedValue, { setValue }];
}

export { useDebounceValue };
export type { UseDebounceValueOptions, UseDebounceValueHandlers };
