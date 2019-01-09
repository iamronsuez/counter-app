import { useReducer, useCallback } from "react";
import CounterWrapper from "./lib";
const reducer = (state, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case "ADD_COUNTER":
      return CounterWrapper.addCounter(action);
    case "REMOVE_COUNTER":
      return CounterWrapper.removeCounter(action);
    case "INCREMENT_COUNTER":
      return CounterWrapper.incrementCounter(payload);
    case "DECREMENT_COUNTER":
      return CounterWrapper.decrementCounter(payload);
    case "SORT_COUNTERS":
      return CounterWrapper.sortCounters(action);
    default:
      break;
  }
};

const useCounters = () => {
  const [state, dispatch] = useReducer(reducer, {});

  const create = useCallback(
    title => dispatch({ type: "ADD_COUNTER", title }),
    [dispatch]
  );

  const remove = useCallback(_id => dispatch({ type: "REMOVE_COUNTER", _id }), [
    dispatch
  ]);

  const onCounterChange = useCallback(
    (_id, count) => dispatch({ type: "UPDATE_COUNTER", _id, count }),
    [dispatch]
  );

  const onCounterSort = useCallback(
    fields => dispatch({ type: "SORT_COUNTERS", fields }),
    [dispatch]
  );

  const increment = useCallback(
    fields => dispatch({ type: "INCREMENT_COUNTER", ...fields }),
    [dispatch]
  );

  const decrement = useCallback(
    fields => dispatch({ type: "DECREMENT_COUNTER", ...fields }),
    [dispatch]
  );
  return {
    create,
    remove,
    onCounterChange,
    increment,
    decrement,
    onCounterSort,
    state,
    lib: CounterWrapper
  };
};

export default useCounters;
