"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _themes = require("../styles/themes");

var _themeActions = require("./themeActions");

var initialState = {
  theme: _themes.grapeJelly
};

var themeReducer = function themeReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _themeActions.SWTICH_THEME:
      return {
        theme: action.theme
      };

    default:
      return state;
  }
};

var _default = themeReducer;
exports["default"] = _default;