export function dispatchTime(counterName = '', defaultState = 0) {
  return function counter(state = defaultState, action) {
    switch (action.type) {
      case `${counterName}`:
        return action.payload;
      case `DECREMENT_${counterName}`:
        return state - 1;
      default:
        return state;
    }
  };
}
