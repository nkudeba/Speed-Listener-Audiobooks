import AsyncStorage from '@react-native-community/async-storage';
import TrackPlayer from 'react-native-track-player';

export async function setQueue(props, sortedalbums) {
  // const queue = await TrackPlayer.getQueue();
  // console.log('MY QUEUE AFTER ADDING FROM ALBUMTRACKS.JS: ');
  // console.log(queue);
  // var q2 = {};
  // q2.queue = [];
  // q2.queue.push(queue);
  // console.log(queue);
  // console.log(q2);
  // console.log(q2.queue);
  // var queues = JSON.stringify(q2);
  // console.log('q2');
  // console.log(JSON.stringify(q2.queue[0]));
  console.log('sorted albums');
  console.log(sortedalbums);
  // await AsyncStorage.setItem('queue', JSON.stringify(sortedalbums));
  props.setQueue(JSON.stringify(sortedalbums));
  let newtracks = sortedalbums.map((data, index) => {
    // console.log('index ' + index);
    // console.log('newtracks data for DROPDOWN_QUEUE');
    // console.log(data);
    var mytitle = data.title == undefined ? 'untitled' : data.title;
    var url = data.url;
    var starttime = data.starttime == undefined ? 0 : data.starttime;
    var duration = data.duration == undefined ? 0 : data.duration;
    var id = data.id == undefined ? 0 : data.id;
    return {
      label: mytitle,
      value: index,
      url: url,
      index: index,
      starttime: starttime,
      duration: duration,
      id: id,
    };
  });
  props.setDropdownQueue(newtracks);
}
