import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {tryparse} from '../../utils/tryparse';
import TrackPlayer from 'react-native-track-player';
import SetAlbumHistory from './setAlbumHistory';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector, useDispatch, connect} from 'react-redux';

export default async function ResortAlbums(
  promises2,
  sortedalbums,
  retrievedindex,
  props,
) {
  // const mydispatch = useDispatch();
  // props.setCounterA(5517);
  return Promise.all(promises2)
    .then(results => {
      console.log('SORTEDALBUMS2 RESULTS on reSortAlbums.js!');
      console.log(results);
      console.log('sortedalbums on reSortAlbums.js!');
      console.log(sortedalbums);
      //Set fullduration to sum of all of results.duration here
      var fullduration = results.reduce(
        (total, obj) => 1 * obj.duration + total,
        0,
      );
      // props.setFullDuration(fullduration);
      // console.log('Full Duration: ', fullduration);
      // console.log('Original Converted');
      // console.log(sortedalbums);
      var finalresults = results.map((result, index) => {
        function getTrackInfo(path) {
          return sortedalbums.filter(function (sortedalbums) {
            return sortedalbums.url == result.url;
          });
        }
        var starttime = 0;
        var ogtrack = getTrackInfo(result.url)[0];
        if (index == 0) {
          starttime = 0;
        } else {
          for (i = 0; i < index; i++) {
            // console.log(index);
            // console.log('indexing')
            starttime = starttime + 1 * results[i].duration;
            // set start time of current track = sum of durations of previous tracks
          }
        }
        var myartist =
          result.artist == undefined ? ogtrack.artist : result.artist;

        var mytitle = result.title == undefined ? ogtrack.title : result.title;

        var myalbum = result.album == undefined ? ogtrack.album : result.album;
        return {
          album: myalbum,
          artist: myartist,
          duration: result.duration,
          title: mytitle,
          type: result.type,
          url: result.url,
          id: result.id,
          fullduration: fullduration,
          starttime: starttime,
        };
      });
      SetAlbumHistory(finalresults, props);
      // console.log('FINAL RESULTS');
      // console.log(finalresults);
      // console.log('title');
      // console.log(finalresults[retrievedindex].title);
      finalresults[retrievedindex].title
        ? props.setTitle(finalresults[retrievedindex].title)
        : props.setTitle('Untitled');

      finalresults[retrievedindex].starttime
        ? props.setStartTime(finalresults[retrievedindex].starttime)
        : props.setStartTime(0);

      console.log(
        'Just set artist from reSortAlbums as ' +
          finalresults[retrievedindex].artist,
      );

      finalresults[retrievedindex].duration
        ? props.setTrackDuration(finalresults[retrievedindex].duration)
        : props.setTrackDuration(0);

      finalresults[retrievedindex].url
        ? props.setUrl(finalresults[retrievedindex].url)
        : null;

      // console.log('resortAlbums props');
      // console.log(props);

      console.log('resortAlbums universal speed');
      console.log(props.universalSpeed);

      console.log('ADDING TRACKS BELOW FROM reSortAlbums');
      console.log(finalresults);
      // TrackPlayer.add(finalresults);
      // AsyncStorage.getItem(finalresults[retrievedindex].url).then(
      //   async item => {
      //     console.log('this is what is stored');
      //     console.log(item);
      //     console.log('position stored in item');
      //     item == null
      //       ? props.setPosition(0)
      //       : JSON.parse(item).position
      //       ? props.setPosition(JSON.parse(item).position)
      //       : props.setPosition(0);
      //     if (!props.universalSpeed && item != null) {
      //       console.log('tracks using unique speed');
      //       console.log('setting playback speed to last speed of book');
      //       var playbackRate = await tryparse(item).playbackRate;
      //       console.log(playbackRate);
      //       await TrackPlayer.setRate(playbackRate);
      //       await props.setRate(playbackRate);
      //     }
      //   },
      // );
    })
    .catch(e => {
      console.error(e);
    });
}

function mapStateToProps(state, ownProps) {
  // console.log('de duration: ');
  // console.log(state);
  // console.log(state.duration);
  return {
    theme: state.themeReducer.theme,
    duration: state.duration,
    universalSpeed: state.universalSpeed,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    increment: payload => dispatch({type: 'INCREMENT', payload: payload}),
  };
};

connect(mapStateToProps, mapDispatchToProps)(ResortAlbums);
