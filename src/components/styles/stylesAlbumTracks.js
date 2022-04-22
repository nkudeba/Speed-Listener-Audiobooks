import {StyleSheet} from 'react-native';
import {useSelector, useDispatch, connect} from 'react-redux';

export const styles = props =>
  StyleSheet.create({
    pageContainer: {
      padding: 10,
      flex: 1,
    },
    searchInputs: {
      flexDirection: 'row',
    },
    search: {
      // flex: 8,
      // marginBottom: 20,
      color: props.theme.TEXT_COLOR,
      borderColor: props.theme.HIGHLIGHT_COLOR,
      backgroundColor: props.theme.BACKGROUND_COLOR,
      borderBottomWidth: 3,
      // padding: 20,
    },
    searchSection: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: props.theme.TEXT_COLOR,
    },
    searchIcon: {
      padding: 10,
    },
    input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      backgroundColor: props.theme.TEXT_COLOR,
      color: '#424242',
    },
    switch: {
      flex: 2,
    },
    listItem: {
      padding: 10,
      borderColor: '#f4cfce',
      borderWidth: 1,
      borderRadius: 10,
      margin: 2,
    },
    info: {
      padding: 10,
      marginTop: 20,
      borderColor: '#f4cfce',
      borderWidth: 1,
    },
    row: {
      flexDirection: 'row',
      backgroundColor: '#f4cfce',
    },
    row1: {
      flexDirection: 'row',
    },
    prop: {
      flex: 1,
      padding: 10,
    },
    val: {
      alignSelf: 'center',
      flex: 1,
    },
  });
