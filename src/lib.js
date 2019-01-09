import { orderBy, gte, lte, toPairs, isFunction, get, filter } from "lodash";
/**
 * 
 * Add a named counter to a list of counters OK
  Increment any of the counters OK
  Decrement any of the counters OK
  Delete a counter OK
  Show a sum of all the counter values  OK
  Implement sorting counters by title and by amount
  It must persist data back to the server (using the API we're providing you)
  A text based searchbar
  A section where we can filter counters by the following rules:
  Less than a given value that we can change (let's say in an input)
  Greter than a given value that we can change (let's say in an input as well)
  We must be able to disable the filters in the UI
 */

class CounterWrapper {
  counters = {};
  sorters = {};
  filters = {};
  constructor(initialValues = {}) {
    Object.assign(this.counters, initialValues);
  }

  getAll = () => {
    this.persistCounters()
    return this.filterCounters({});
  };

  addCounter = ({ title }) => {
    const newId = this._genId();
    const newCounter = { _id: newId, title, count: 0 };
    Object.assign(this.counters, { [newId]: newCounter });
    return this.getAll();
  };

  removeCounter = ({ _id }) => {
    delete this.counters[_id];
    return this.getAll();
  };

  incrementCounter = fields => {
    return this.updateCounter(fields, true);
  };

  decrementCounter = fields => {
    return this.updateCounter(fields, false);
  };

  updateCounter = ({ _id }, increment) => {
    const item = this.counters[_id];
    Object.assign(this.counters, {
      [_id]: { ...item, count: increment ? item.count + 1 : item.count - 1 }
    });
    return this.getAll();
  };

  countersSum = () => {
    return Object.values(this.counters).reduce((acc, { count }) => {
      acc += count;
      return acc;
    }, 0);
  };


  persistCounters = () => {
    console.log("should persists data", this.counters);
  };

  filterCounters = ({ fields = null }) => {
    const filterCollection = {gte, lte}
    if (fields) {
      this.filters = fields
    }

    return (toPairs(fields)).reduce((acc, field) => {
      const [filterFn, valueToMatch] = field
      const fnToApply = get(filterCollection, filterFn)
      if (isFunction(fnToApply)) {
        return filter(acc, ({count}) => fnToApply(count, valueToMatch))
      }
      return acc
    }, this.sortCounters({}))
  }

  sortCounters = ({ fields = null }) => {
    if (fields) {
      this.sorters = fields;
    }
    return orderBy(
      Object.values(this.counters),
      Object.keys(this.sorters),
      Object.values(this.sorters)
    );
  };

  _genId = () => (+new Date() + ~~(Math.random * 999999)).toString(36);
}

export default new CounterWrapper();
