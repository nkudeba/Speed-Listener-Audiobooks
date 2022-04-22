export const RATE = 'RATE';

export const decrement = payload => {
  return dispatch => {
    dispatch({
      type: RATE,
      payload: payload,
    });
  };
};
