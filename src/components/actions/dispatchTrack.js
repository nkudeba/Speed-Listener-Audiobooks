export function dispatchTrack(counterName = '') {
  return function counter(state = 'a', action) {
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
