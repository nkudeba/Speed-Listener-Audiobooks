import React from 'react';
import {connect} from 'react-redux';

function NewConnect() {
  console.log('THIS IS A NEW CONNECT');
}

function mapStateToProps(state) {
  return {
    theme: state.themeReducer.theme,
    duration: state.duration,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    increment: payload => dispatch({type: 'INCREMENT', payload: payload}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewConnect);
