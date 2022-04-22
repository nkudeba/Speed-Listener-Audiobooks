export const SWTICH_THEME = 'SWITCH_THEME';

export const switchTheme = theme => {
  return dispatch => {
    dispatch({
      type: SWTICH_THEME,
      theme: theme,
    });
  };
};
