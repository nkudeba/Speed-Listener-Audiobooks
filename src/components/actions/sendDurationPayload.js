import {useSelector, useDispatch} from 'react-redux';

export function sendDurationPayload(totalDuration) {
  const duration = useSelector(state => state.duration);
  const dispatch = useDispatch();
  dispatch({type: 'INCREMENT', payload: totalDuration});
  return {duration, dispatch};
}
