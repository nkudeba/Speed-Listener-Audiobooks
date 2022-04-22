export function setDuration(state, action) {
  if (typeof state === 'undefined') {
    return 0;
  }
  console.log('action');
  console.log(action);
  switch (action.type) {
    case 'FULL_DURATION':
      return action.payload;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
