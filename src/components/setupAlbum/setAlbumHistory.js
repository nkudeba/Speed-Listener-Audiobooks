import AsyncStorage from '@react-native-community/async-storage';
import {tryparse} from '../../utils/tryparse';
import {useSelector, useDispatch, connect} from 'react-redux';

export default async function SetAlbumHistory(finalresults, props) {
  // const dispatch = useDispatch();
  var albumartist = finalresults[0].album + ' by ' + finalresults[0].artist;
  var currentalbum = [];
  currentalbum.push(albumartist);
  // currentalbum.albumartist = finalresults;
  // currentalbum.albumartist.push
  console.log('Current Album');
  console.log(JSON.stringify(currentalbum));
  console.log('ALBUM ARTIST');
  console.log(albumartist);
  var albumhistory = [];
  albumhistory.push({Book: albumartist, Tracks: finalresults});
  var retrievedalbumhistory = await AsyncStorage.getItem('albumHistory');

  if (retrievedalbumhistory) {
    var parsedalbumhistory = tryparse(retrievedalbumhistory);

    //Remove current album from history if it exists (in order to only have one copy of current in the first entry of history)
    if (parsedalbumhistory !== 'undefined' && parsedalbumhistory.length > 0) {
      var filteredalbumhistory = parsedalbumhistory.filter(function (
        value,
        index,
        arr,
      ) {
        return value.Book !== albumartist;
      });

      var maxHistory = 50;

      var slicedalbumhistory =
        filteredalbumhistory.length > maxHistory
          ? filteredalbumhistory.slice(0, maxHistory)
          : filteredalbumhistory;
      slicedalbumhistory.map(album => {
        albumhistory.push(album);
      });
    }
  }

  let newalbums = albumhistory.map((data, index) => {
    // console.log('my album');
    // console.log(data);
    var mylabel = data.Book;
    // console.log(mylabel);
    var mytracks = data.Tracks;
    // console.log(mytracks);
    return {label: mylabel, value: mylabel, tracks: mytracks};
  });
  props.setAlbumHistory(newalbums);
  await AsyncStorage.setItem('albumHistory', JSON.stringify(albumhistory));
}
