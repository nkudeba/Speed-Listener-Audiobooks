export const grapeJelly = {
  BACKGROUND_COLOR: 'darkslateblue',
  HIGHLIGHT_COLOR: 'slateblue',
  TEXT_COLOR: 'white',
  ICO_COLORS: 'white',
  INPUT_COLOR: 'mediumslateblue',
  ICON_COLOR: 'blue',
  mode: 'Grape Jelly',
};
export const lightTheme = {
  BACKGROUND_COLOR: 'white',
  HIGHLIGHT_COLOR: 'grey',
  TEXT_COLOR: 'black',
  ICO_COLORS: 'black',
  INPUT_COLOR: 'lightslategrey',
  ICON_COLOR: 'blue',
  mode: 'Shades',
};
export const pinktheme = {
  BACKGROUND_COLOR: '#cd919e',
  HIGHLIGHT_COLOR: '#eea9b8',
  TEXT_COLOR: 'white',
  ICO_COLORS: 'white',
  INPUT_COLOR: '#eea9b8',
  ICON_COLOR: '#87a96b',
  mode: 'Pink Sky',
};
export const pistachio = {
  BACKGROUND_COLOR: '#719A5E',
  HIGHLIGHT_COLOR: '#82B068',
  TEXT_COLOR: '#E1EDBD',
  ICO_COLORS: '#E1EDBD',
  INPUT_COLOR: '#B0CF98',
  ICON_COLOR: '#87a96b',
  mode: 'Pistachio',
};
export const jade = {
  BACKGROUND_COLOR: '#426D54',
  HIGHLIGHT_COLOR: '#5A8559',
  TEXT_COLOR: '#E1EDBD',
  ICO_COLORS: '#E1EDBD',
  INPUT_COLOR: '#B0CF98',
  ICON_COLOR: '#87a96b',
  mode: 'Jade',
};
export const bluetheme = {
  BACKGROUND_COLOR: '#194569',
  HIGHLIGHT_COLOR: '#5f84A2',
  TEXT_COLOR: 'white',
  ICO_COLORS: 'white',
  INPUT_COLOR: '#CADEED',
  ICON_COLOR: '#87a96b',
  mode: 'Denim',
};
export const peach = {
  BACKGROUND_COLOR: '#ff8049',
  HIGHLIGHT_COLOR: '#ff996d',
  TEXT_COLOR: 'white',
  ICO_COLORS: 'white',
  INPUT_COLOR: '#d2a4a4',
  ICON_COLOR: 'white',
  mode: 'Fuzzy Peach',
};

var themes = [];
themes.push(
  grapeJelly,
  lightTheme,
  pinktheme,
  pistachio,
  // jade,
  bluetheme,
  peach,
);
console.log(themes);
export var themelist = themes.map((result, index) => {
  return {
    label: result.mode,
    value: result.mode,
  };
});
