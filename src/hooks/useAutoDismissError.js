import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Custom hook to handle error state with auto-dismissal.
 * @param {Object} initialState - Initial error state.
 * @param {number} duration - Duration in milliseconds before errors are dismissed (default: 3000ms).
 * @returns {Array} - [errors, setErrors, clearErrors]
 */
const useAutoDismissError = (initialState = {}, duration = 3000) => {
  const [errors, setErrorsState] = useState(initialState);
  const timeoutRef = useRef(null);

  const clearErrors = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setErrorsState({});
  }, []);

  const setErrors = useCallback(
    (newErrors) => {
      // Clear existing timeout if any
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Update state
      if (typeof newErrors === "function") {
        setErrorsState(newErrors);
      } else {
        setErrorsState(newErrors);
      }

      // Set timer to clear errors if there are any keys
      const hasErrors =
        typeof newErrors === "object" &&
        newErrors !== null &&
        Object.keys(newErrors).length > 0;

      if (hasErrors) {
        timeoutRef.current = setTimeout(() => {
          setErrorsState({});
        }, duration);
      }
    },
    [duration]
  );

  // Clear errors on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [errors, setErrors, clearErrors];
};

export default useAutoDismissError;
