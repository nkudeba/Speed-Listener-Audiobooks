import React from 'react';
import {useSelector, connect} from 'react-redux';
class Test extends React.Component {
  componentDidMount() {
    console.log('TEST SCREEN');
    console.log('TEST THEME');
    console.log(this.props.theme);
  }
  componentWillUnmount() {}

  render() {
    return <></>;
  }
}

function mapStateToProps(state, ownProps) {
  console.log('de theme: ');
  console.log(state);
  console.log(state.themeReducer.theme);
  return {
    theme: state.themeReducer.theme,
  };
}

export default connect(mapStateToProps)(Test);
