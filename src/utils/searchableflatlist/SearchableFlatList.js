import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList} from 'react-native';

export default class SearchableFlatList extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    searchTerm: PropTypes.string.isRequired,
    searchAttribute: PropTypes.string,
    searchAttribute2: PropTypes.string,
    ignoreCase: PropTypes.bool,
  };

  static defaultProps = {
    searchAttribute: '',
    ignoreCase: true,
  };

  render() {
    const {data, searchAttribute, searchAttribute2, searchTerm, ignoreCase} =
      this.props;
    // console.log('SearchableFlatlist');
    // console.log('data');
    // console.log(data);
    // console.log('searchTerm');
    // console.log(searchTerm);
    return (
      <FlatList
        {...this.props}
        data={data.filter(tempData => {
          let searchData = searchAttribute
            ? searchAttribute
                .split('.')
                .reduce((prevVal, currVal) => prevVal[currVal], tempData)
            : tempData;

          let searchData2 = searchAttribute2
            ? searchAttribute2
                .split('.')
                .reduce((prevVal, currVal) => prevVal[currVal], tempData)
            : tempData;
          let albumartist = searchData + ' ' + searchData2;

          // Instead of .includes here, use regex for multiple values: https://stackoverflow.com/questions/37896484/multiple-conditions-for-javascript-includes-method/37896529
          if (ignoreCase) {
            return albumartist.toLowerCase().includes(searchTerm.toLowerCase());
          } else {
            return albumartist.includes(searchTerm);
          }
        })}
      />
    );
  }
}
