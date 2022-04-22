export function sortAndConvert(sortedalbums, convertedalbums) {
  return sortedalbums.map(element => {
    var path = element.url;
    // console.log('SORTED ELEMENT');
    // console.log(element);
    var newconverted = convertedalbums.map((track, index) => {
      // console.log('MY PATH');
      // console.log(track.path);
      // getmeta(track.path);
      // console.log('Track at index ' + index + ': ');
      // console.log(track);
      return {
        id: track.id,
        url: track.url,
        cover: track.cover,
      };
    });

    function getTrackId(path) {
      return newconverted.filter(function (newconverted) {
        return newconverted.url == path;
      });
    }
    // console.log('MY TRACK ID: ');
    var id = getTrackId(path)[0].id;
    var cover =
      getTrackId(path)[0].cover == undefined ? null : getTrackId(path)[0].cover;
    // console.log(getTrackId(path)[0].id);
    return {
      album: element.album,
      artist: element.artist,
      duration: element.duration,
      title: element.title,
      type: element.type,
      url: element.url,
      id: id,
    };
  });
}
