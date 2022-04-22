"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.themelist = exports.peach = exports.bluetheme = exports.jade = exports.pistachio = exports.pinktheme = exports.lightTheme = exports.grapeJelly = void 0;
var grapeJelly = {
  BACKGROUND_COLOR: 'darkslateblue',
  HIGHLIGHT_COLOR: 'slateblue',
  TEXT_COLOR: 'white',
  ICO_COLORS: 'white',
  INPUT_COLOR: 'mediumslateblue',
  ICON_COLOR: 'blue',
  mode: 'Grape Jelly'
};
exports.grapeJelly = grapeJelly;
var lightTheme = {
  BACKGROUND_COLOR: 'white',
  HIGHLIGHT_COLOR: 'grey',
  TEXT_COLOR: 'black',
  ICO_COLORS: 'black',
  INPUT_COLOR: 'lightslategrey',
  ICON_COLOR: 'blue',
  mode: 'Shades'
};
exports.lightTheme = lightTheme;
var pinktheme = {
  BACKGROUND_COLOR: '#cd919e',
  HIGHLIGHT_COLOR: '#eea9b8',
  TEXT_COLOR: 'white',
  ICO_COLORS: 'white',
  INPUT_COLOR: '#eea9b8',
  ICON_COLOR: '#87a96b',
  mode: 'Pink Sky'
};
exports.pinktheme = pinktheme;
var pistachio = {
  BACKGROUND_COLOR: '#719A5E',
  HIGHLIGHT_COLOR: '#82B068',
  TEXT_COLOR: '#E1EDBD',
  ICO_COLORS: '#E1EDBD',
  INPUT_COLOR: '#B0CF98',
  ICON_COLOR: '#87a96b',
  mode: 'Pistachio'
};
exports.pistachio = pistachio;
var jade = {
  BACKGROUND_COLOR: '#426D54',
  HIGHLIGHT_COLOR: '#5A8559',
  TEXT_COLOR: '#E1EDBD',
  ICO_COLORS: '#E1EDBD',
  INPUT_COLOR: '#B0CF98',
  ICON_COLOR: '#87a96b',
  mode: 'Jade'
};
exports.jade = jade;
var bluetheme = {
  BACKGROUND_COLOR: '#194569',
  HIGHLIGHT_COLOR: '#5f84A2',
  TEXT_COLOR: 'white',
  ICO_COLORS: 'white',
  INPUT_COLOR: '#CADEED',
  ICON_COLOR: '#87a96b',
  mode: 'Denim'
};
exports.bluetheme = bluetheme;
var peach = {
  BACKGROUND_COLOR: '#ff8049',
  HIGHLIGHT_COLOR: '#ff996d',
  TEXT_COLOR: 'white',
  ICO_COLORS: 'white',
  INPUT_COLOR: '#d2a4a4',
  ICON_COLOR: 'white',
  mode: 'Fuzzy Peach'
};
exports.peach = peach;
var themes = [];
themes.push(grapeJelly, lightTheme, pinktheme, pistachio, // jade,
bluetheme, peach);
console.log(themes);
var themelist = themes.map(function (result, index) {
  return {
    label: result.mode,
    value: result.mode
  };
});
exports.themelist = themelist;