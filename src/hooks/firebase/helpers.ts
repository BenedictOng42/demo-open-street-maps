import { useState, useEffect } from "react";
import equal from "fast-deep-equal";

/**
 * This hook caches an instance of a value, only updating the value
 * if it fails a deep equality check.
 * @param newValue the value to persist
 */
export const usePersistentValue = <T = unknown>(newValue?: T) => {
  const [value, setValue] = useState<T | undefined>(newValue);

  useEffect(() => {
    if (!equal(newValue, value)) {
      setValue(newValue);
    }
  }, [newValue, value, setValue]);

  return value;
};
