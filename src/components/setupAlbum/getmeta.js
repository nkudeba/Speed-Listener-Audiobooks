import MediaMeta from 'react-native-media-meta';

export async function getmeta(mypath) {
  const result = await MediaMeta.get(mypath);
  return {
    album: result.album,
    artist: result.artist,
    title: result.title,
    duration: result.duration,
    track: result.track,
  };
}
