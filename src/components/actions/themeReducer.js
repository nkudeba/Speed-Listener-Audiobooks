import {grapeJelly} from '../styles/themes';
import {SWTICH_THEME} from './themeActions';

const initialState = {
  theme: grapeJelly,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWTICH_THEME:
      return {theme: action.theme};

    default:
      return state;
  }
};

export default themeReducer;
