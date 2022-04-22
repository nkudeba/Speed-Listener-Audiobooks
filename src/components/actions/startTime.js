export function startTime(state, action) {
  if (typeof state === 'undefined') {
    return 0;
  }
  console.log('action');
  console.log(action);
  switch (action.type) {
    case 'TIME':
      return action.payload;
    case 'TIMELESS':
      return state - 1;
    default:
      return state;
  }
}
