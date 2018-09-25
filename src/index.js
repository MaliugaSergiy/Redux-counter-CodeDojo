import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "./redux";

import "./styles.css";

const initialState = { count: 5, max: 10, min: 0 };

function reducer(state = { count: 0, min: -5, max: 10 }, action) {
  const { count, min, max } = state;

  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: count >= max ? max : count + action.amount };
    case "DECREMENT":
      return { ...state, count: count <= min ? min : count - action.amount };
    case "RESET":
      return { ...state, count: 0 };
    default:
      return state;
  }
}

const incrementAction = { type: "INCREMENT", amount: 1 };
const decrementAction = { type: "DECREMENT", amount: 1 };
const resetAction = { type: "RESET" };

const store = createStore(reducer, initialState);

class Counter extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  increment = () => {
    store.dispatch(incrementAction);
  };

  decrement = () => {
    store.dispatch(decrementAction);
  };
  reset = () => {
    store.dispatch(resetAction);
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
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById("root"));
