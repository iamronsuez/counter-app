import React, { useState } from "react";

const CounterForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const _onSubmit = event => {
    event.preventDefault();
    onSubmit(title);
    setTitle("");
  };

  const _onChange = event => {
    setTitle(event.target.value);
  };

  return (
    <form onSubmit={_onSubmit}>
      <input
        name="title"
        type="text"
        placeholder="counter title"
        value={title}
        onChange={_onChange}
      />
      <button disabled={title.length <= 0}>Create counter</button>
    </form>
  );
};

export default CounterForm;
