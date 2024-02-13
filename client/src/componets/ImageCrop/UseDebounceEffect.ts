import { useEffect, DependencyList } from "react";

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps); //saying to use the spread instead of apply() ??
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps);
}
