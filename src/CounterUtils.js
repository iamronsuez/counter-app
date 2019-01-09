import React, { useState } from "react";
const noop = () => null;
const log = (...val) => console.log(...val);

const CounterFilters = ({ options = ["title", "count"], onChange = log }) => {
  const _onChange = (field, order) => {
    onChange({ [field]: order });
  };

  return (
    <div>
      {options.map((option, key) => {
        return (
          <div className="box" key={key}>
            <label>Sort by: {option}</label>
            <select
              name={`filter-by-${option}`}
              onChange={e => _onChange(option, e.target.value)}
            >
              <option value="asc">asc</option>
              <option value="desc">desc</option>
            </select>
          </div>
        );
      })}
    </div>
  );
};

const CounterFilter = ({ onSubmit, initialState = {} }) => {
  const [form, updateForm] = useState(initialState);
  const _onSubmit = event => {
    event.preventDefault();
    onSubmit();
  };

  const _onChange = (field, value) => {
    //updateForm({});
    console.log(form, { [field]: value });
  };

  return (
    <form onSubmit={_onSubmit}>
      {Object.keys(form).map((label, key) => {
        return (
          <div key={key}>
            <label> {label} </label>
            <input
              name={key}
              type="number"
              placeholder="counter title"
              value={form[label].value}
              onChange={e => _onChange(label || key, e.target.value)}
            />
          </div>
        );
      })}
      {Object.values(form).length ? <button>Apply Filters</button> : null}
    </form>
  );
};

const CounterUtils = ({ countersSum = noop, onChangeSortFields }) => {
  const fields = {
    greather_than: { label: "greather_than" },
    less_than: { label: "less_than" }
  };
  return (
    <div>
      <p>Sum of counters is: {countersSum()}</p>
      <hr />
      <div>
        <h4>Sort</h4>
        <CounterFilters onChange={onChangeSortFields} />
      </div>

      <div>
        <h4>Filters</h4>
        <CounterFilter onChange={onChangeSortFields} initialState={fields} />
      </div>
    </div>
  );
};

export default CounterUtils;
