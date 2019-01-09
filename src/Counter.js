import React from "react";
const Counter = ({
  _id,
  title = "counter",
  remove,
  count,
  increment,
  decrement
}) => {
  return (
    <div>
      <h4>{title}</h4>
      <p>{count}</p>
      <div>
        <button onClick={() => increment({ _id })}>increment</button>
        <button onClick={() => decrement({ _id })}>decrement</button>
      </div>
      <div>
        <button onClick={() => remove(_id)}> -- remove --</button>
      </div>
    </div>
  );
};

export default Counter;
