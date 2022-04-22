import {gettrackids} from './gettrackids';

export function getTrackIndex(trackid, albumtracks) {
  console.log('GET TRACK INDEX trackid');
  console.log(trackid);
  console.log('get track index album track');
  console.log(albumtracks);
  var trackids = gettrackids(albumtracks);
  return trackids.filter(function (trackids) {
    return trackids.trackid == trackid;
  });
}
