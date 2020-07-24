import { useState, useCallback, useEffect } from "react";

export type ValueUpdater<T> =
  | ((prev: T | undefined) => T | undefined)
  | T
  | undefined;

/**
 * Create a `useState` hook that returns the state,
 * a function to set the state as true, and a function
 * to set the state as false.
 *
 * @param defaultState Initial value for the state.
 */
export const useBoolean: (
  defaultState?: boolean
) => [boolean, () => void, () => void] = (defaultState = false) => {
  const [state, setState] = useState<boolean>(defaultState);
  const setTrue = useCallback(() => setState(true), [setState]);
  const setFalse = useCallback(() => setState(false), [setState]);
  return [state, setTrue, setFalse];
};

/**
 * Create a `useState` hook that keeps track of a boolean
 * state and a piece of data.
 *
 * Example usage: keep track of a dialog open/close state
 * that requires a piece of data when open.
 *
 * @param defaultData Initial value for the data.
 * @param defaultState Initial value for the state.
 */
export const useBooleanAndData: <T>(
  defaultData?: T,
  defaultState?: boolean
) => [T | undefined, boolean, (data: T) => void, () => void] = <T>(
  defaultData: T,
  defaultState: boolean = false
) => {
  const [state, setTrueInternal, setFalseInternal] = useBoolean(defaultState);
  const [data, setData] = useState<T>(defaultData);

  const setTrue = useCallback(
    (data: T) => {
      setData(data);
      setTrueInternal();
    },
    [setTrueInternal, setData]
  );

  return [data, state, setTrue, setFalseInternal];
};

/**
 * Create a `useState` hook that returns the state,
 * and a function that toggles the state.
 * @param defaultState initial value for the state
 */
export const useBooleanToggle: (
  defaultState: boolean
) => [boolean, () => void] = (defaultState: boolean) => {
  const [state, setState] = useState<boolean>(defaultState);
  const toggle = useCallback(() => setState(!state), [setState, state]);
  return [state, toggle];
};

/**
 * Create a `useState` hook that initialises a map that
 * can be used to store arbitrary values. Returns the
 * map, a setter function that sets only the specified
 * field, and the original setState function that can be
 * used to update the entire map value.
 * @param defaultState initial value for the state
 */
export const useMap: <T = unknown>(defafultState?: {
  [key: string]: T | undefined;
}) => [
  { [key: string]: T | undefined },
  (key: string, update: ValueUpdater<T>) => void,
  (value: { [key: string]: T | undefined }) => void
] = <T = unknown>(
  defaultState: {
    [key: string]: T | undefined;
  } = {}
) => {
  const [values, setValues] = useState<{ [key: string]: T | undefined }>(
    defaultState
  );

  /**
   * Sets the value for the specified key in the map.
   * @param key the key of the value to set
   * @param value a value or update function
   */
  const setValue = (key: string, value: ValueUpdater<T>) => {
    if (typeof value === "function") {
      setValues((prev) => ({
        ...prev,
        [key]: (value as (prev: T | undefined) => T | undefined)(prev[key]),
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  return [values, setValue, setValues];
};

/**
 * This hook returns an object with the setter and getter for
 * a value field and error field.
 *
 * @param defaultValue The default value for the field. Value is used to reset when the `reset` flag changes from `false` to `true`.
 * @param reset A flag for triggering when the field value should be reset.
 */
export const useDataField = <T = string>(
  defaultValue: T,
  reset: boolean = false
): [T, (value: T) => void, string, (error: string) => void, T] => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState("");
  const [prevReset, setReset] = useState(reset);

  useEffect(() => {
    // Keep prevReset in sync with the actual reset value
    if (prevReset && !reset) {
      setReset(reset);
    }

    // If the reset flag is `true`, reset values
    if (!prevReset && reset) {
      setReset(reset);
      setValue(defaultValue);
      setError("");
    }
  }, [setValue, setError, reset, prevReset, setReset, defaultValue]);

  // If the value is updated, reset the error
  useEffect(() => {
    setError("");
  }, [value]);

  return [value, setValue, error, setError, defaultValue];
};

/**
 * This hook returns an object with the setter and getter for
 * a list of value fields and error fields.
 *
 * @param defaultValue The default values for the field. Value is used to reset when the `reset` flag changes from `false` to `true`.
 * @param reset A flag for triggering when the field value should be reset.
 */
export const useDataListField = <T = string>(
  defaultValue: T[],
  reset: boolean = false
): [
  T[],
  (value: T[]) => void,
  (index: number, value: T) => void,
  string[],
  (error: string[]) => void,
  (index: number, error: string) => void,
  T[]
] => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState<string[]>([]);
  const [prevReset, setReset] = useState(reset);

  useEffect(() => {
    // When the default value changes, reset errors
    if (defaultValue && defaultValue.length > 0) {
      setError(Array.from({ length: defaultValue.length }, () => ""));
    }
  }, [defaultValue, setError]);

  useEffect(() => {
    // Keep prevReset in sync with the actual reset value
    if (prevReset && !reset) {
      setReset(reset);
    }

    // If the reset flag is `true`, reset values
    if (!prevReset && reset) {
      setReset(reset);
      setValue(defaultValue);
      setError([]);
    }
  }, [setValue, setError, reset, prevReset, setReset, defaultValue]);

  const setValueAtIndex = useCallback(
    (index: number, value: T) => {
      setValue((v) => {
        const newList = [...v];
        newList[index] = value;
        return newList;
      });
    },
    [setValue]
  );

  const setErrorAtIndex = useCallback(
    (index: number, value: string) => {
      setError((v) => {
        const newList = [...v];
        newList[index] = value;
        return newList;
      });
    },
    [setError]
  );

  return [
    value,
    setValue,
    setValueAtIndex,
    error,
    setError,
    setErrorAtIndex,
    defaultValue,
  ];
};

/**
 * This function debounces that might change frequently.
 * Taken from https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci.
 */
export const useDebounce = <T>(value: T, delay: number = 500): T => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set debouncedValue to value (passed in) after the specified delay.
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // If the given value changes, reset the timer.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
