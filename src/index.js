import React, { useState } from "react";
import ReactDOM from "react-dom";
import Counter from "./Counter";
import "./styles.css";
import useCounter from "./counterReducer";
import CounterForm from "./CounterForm";
import CounterUtils from "./CounterUtils";

function App() {
  const {
    create,
    remove,
    state,
    increment,
    decrement,
    onCounterSort,
    filterBy,
    lib
  } = useCounter();
  const _addCounter = title => create(title);
  return (
    <div className="App">
      <h1>Hello</h1>
      <h2>Start adding counters to see some magic happen!</h2>
      <CounterForm onSubmit={title => _addCounter(title)} />
      <hr />
      <CounterUtils {...lib} onChangeSortFields={onCounterSort} onSubmitFilters={filterBy} />
      <hr />
      <div className="counters">
        {Object.values(state).map((item, key) => (
          <Counter
            key={key}
            increment={increment}
            decrement={decrement}
            {...item}
            remove={remove}
          />
        ))}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
