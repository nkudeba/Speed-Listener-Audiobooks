import {addValueInObject} from '../../utils/addValueInObject';
import {NativeModules} from 'react-native';
import {getsortedAlbums} from './getsortedAlbums';
import MediaMeta from 'react-native-media-meta';

export async function mapandsort(albumtracks, props) {
  // console.log('album track on mapandsort');
  // console.log(albumtracks);
  var sorted = [];

  let otherpromises = await albumtracks.map(async element => {
    // var newpath = await addValueInObject(path, 'path', element.path);
    var mydetails = {
      album: element.album,
      artist: element.artist,
      title: element.title,
      type: 'default',
      duration: element.duration,
      track: null,
      id: element.id,
      url: element.path,
    };
    sorted.push(mydetails);
  });

  var sortedalbums = await getsortedAlbums(otherpromises, sorted);
  var fullduration = sortedalbums.reduce(
    (total, obj) => 1 * obj.duration + total,
    0,
  );
  props.setFullDuration(fullduration);

  var finalresults = sortedalbums.map((result, index) => {
    var starttime = 0;
    if (index == 0) {
      starttime = 0;
    } else {
      for (i = 0; i < index; i++) {
        // console.log(index);
        // console.log('indexing')
        starttime = starttime + 1 * sortedalbums[i].duration;
        // set start time of current track = sum of durations of previous tracks
      }
    }
    return {
      album: result.album,
      artist: result.artist,
      duration: result.duration,
      title: result.title,
      type: result.type,
      url: result.url,
      id: result.id,
      fullduration: fullduration,
      starttime: starttime,
    };
  });
  return finalresults;
}
