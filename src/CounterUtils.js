import React, { useState } from "react";
import get from 'lodash/get'
const noop = () => null;
const log = (...val) => console.log(...val);

const CounterFilters = ({ options = ['title', 'count'], onChange = log }) => {
  const _onChange = (field, order) => {
    onChange({ [field]: order });
  };

  return (
    <div>
      {options.map((option, key) => {
        return (
          <div className='box' key={key}>
            <label>Sort by: {option}</label>
            <select
              name={`filter-by-${option}`}
              onChange={e => _onChange(option, e.target.value)}
            >
              <option value='asc'>asc</option>
              <option value='desc'>desc</option>
            </select>
          </div>
        );
      })}
    </div>
  );
};

const CounterFilter = ({ onSubmit, initialState = {} }) => {
  const [form, updateForm] = useState(initialState);
  const [isActive, toggleFilter] = useState(true)

  const getResults = (form) => Object.keys(form).reduce((acc, key) => {
    return Object.assign(acc, ({[key]: get(form, `${key}.value`)}))
  }, {})

  const updateFormObject = (form, field, value) => Object.assign(form, { [field]: {...get(form, field), value: parseInt(value) }})

  const _onSubmit = event => {
    event.preventDefault()
    onSubmit(getResults(form))
    toggleFilter(false)
  };

  const _onChange = (field, value) => {
    updateForm(updateFormObject(form, field, value)) 
  };

  const _onReset = (event) => {
    event.preventDefault()
    onSubmit(getResults(initialState))
    toggleFilter(true)
  }

  return (
    <form onSubmit={_onSubmit} onReset={_onReset}>
      {Object.keys(form).map((label, key) => {
        return (
          <div key={key}>
            <label> {get(form, `${label}.label`, label)} </label>
            <input
              name={key}
              type="number"
              placeholder="counter title"
              value={get(form, `${label}.value`, 0)}
              onChange={e => _onChange(label || key, e.target.value)}
            />
          </div>
        );
      })}
      { <button type="submit">Apply Filter</button>}
      
      { <button disabled={isActive} type="reset">Reset Filter</button>}
      
    </form>
  );
};

const CounterUtils = ({ countersSum = noop, onChangeSortFields, onSubmitFilters }) => {
  return (
    <div>
      <p>Sum of counters is: {countersSum()}</p>
      <hr />
      <div>
        <h4>Sort</h4>
        <CounterFilters onChange={onChangeSortFields} />
      </div>

      <div>
        <h4>Filters Grather than:</h4>
        <CounterFilter 
          onChange={onChangeSortFields} 
          initialState={{gte: { label: "greather_than", value: 0 }}} onSubmit={onSubmitFilters}/>
      </div>

      <div>
        <h4>Filters Lest than:</h4>
        <CounterFilter 
          onChange={onChangeSortFields} 
          initialState={{lte: { label: "less_than", value: 0 }}} onSubmit={onSubmitFilters}/>
      </div>
    </div>
  );
};

export default CounterUtils;
