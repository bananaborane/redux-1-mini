import React, { Component } from 'react';
import store, { INCREMENT, DECREMENT, UNDO, REDO } from './store'

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: store.getState()
    }
  }

  increment=(amt)=>{
    store.dispatch({
      type: INCREMENT,
      payload: amt
    })
  }
  // dispatches this action to store.js

  decrement=(amt)=>{
    store.dispatch({
      type: DECREMENT,
      payload: amt
    })
  }
  // dispatches this action to store.js

  undo=()=>{
    store.dispatch({ type: UNDO });
  }
  // dispatches this action to store.js

  redo=()=>{
    store.dispatch({ type: REDO });
  }
  // dispatches this action to store.js

  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        store: store.getState()
      });
    });
  }
  // as soon as the store subscribes or 'listens' to the redux store, it sets the state for this component

  render() {
    const {
      currentValue
    } = this.state.store;
    return (
      <div className="app">
        <section className="counter">
          <h1 className="counter__current-value">{currentValue}</h1>
          <div className="counter__button-wrapper">
            <button className="counter__button" onClick={() => this.increment(1)}>
              +1
            </button>
            <button className="counter__button" onClick={() => this.increment(5)}>
              +5
            </button>
            <button className="counter__button" onClick={() => this.decrement(1)}>
              -1
            </button>
            <button className="counter__button" onClick={() => this.decrement(5)}>
              -5
              </button>
            <br />
            <button
              className="counter__button"
              disabled={this.state.store.previousValues.length === 0}
              onClick={this.undo}
            >
              Undo
            </button>
            <button
              className="counter__button"
              disabled={this.state.store.futureValues.length === 0}
              onClick={this.redo}
            >
              Redo
            </button>
          </div>
        </section>
        <section className="state">
          <pre>{JSON.stringify(this.state.store, null, 2)}</pre>
        </section>
      </div>
    );
  }
}
export default Counter;