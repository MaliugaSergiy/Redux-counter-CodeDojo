import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "./redux";

import "./styles.css";

const initialState = { count: 5, min: 0, max: 100 };

function reducer(state = { count: 0, min: -5, max: 10 }, action) {
  const { count, min, max } = state;

  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: count >= max ? max : count + action.step };
    case "DECREMENT":
      return { ...state, count: count <= min ? min : count - action.step };
    case "RESET":
      return { ...state, count: 0 };
    default:
      return state;
  }
}
// const incrementAction = { type: "INCREMENT", amount: 1 };
// const decrementAction = { type: "DECREMENT", amount: 1 };
// const resetAction = { type: "RESET" };

function increment(step) {
  return { type: "INCREMENT", step };
}

function decrement(step) {
  return { type: "DECREMENT", step };
}

function reset() {
  return { type: "RESET" };
}

const store = createStore(reducer, initialState);

class Counter extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  increment = () => {
    let step = this.refs.step.value || 1;
    store.dispatch(increment(+step));
  };

  decrement = () => {
    let step = this.refs.step.value || 1;
    store.dispatch(decrement(+step));
  };
  reset = () => {
    store.dispatch(reset());
  };

  render() {
    const count = store.getState().count;
    return (
      <div className="counter">
        <span className="count">{count}</span>

        <div className="buttons">
          <button className="decrement" onClick={this.decrement}>
            -
          </button>
          <button className="deresetcrement" onClick={this.reset}>
            R
          </button>
          <button className="increment" onClick={this.increment}>
            +
          </button>
        </div>
        <input ref="step" defaultValue={1} />
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById("root"));
