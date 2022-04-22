export function dispatchTracksLoaded(counterName = '') {
  return function counter(state = false, action) {
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
