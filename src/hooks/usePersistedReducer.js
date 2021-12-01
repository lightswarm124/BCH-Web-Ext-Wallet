import { useEffect, useReducer } from "react";
import deepEqual from "fast-deep-equal/es6";
import { usePrevious } from "./usePrevious";

export function usePersistedReducer(reducer, initialState, storageKey) {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const prevState = usePrevious(state);

  function init() {
    const stringState = localStorage.getItem(storageKey);
    if (stringState) {
      try {
        return JSON.parse(stringState);
      } catch (error) {
        return initialState;
      }
    } else {
      return initialState;
    }
  }

  useEffect(() => {
    const stateEqual = deepEqual(prevState, state);
    if (!stateEqual) {
      const stringifiedState = JSON.stringify(state);
      localStorage.setItem(storageKey, stringifiedState);
    }
  }, [state]);

  return { state, dispatch };
}
