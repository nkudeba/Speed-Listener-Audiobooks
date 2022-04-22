import {useSelector, useDispatch, connect} from 'react-redux';

export function durationPayload(dispatch, testduration) {
  return dispatch({type: 'INCREMENT', payload: testduration});
}
