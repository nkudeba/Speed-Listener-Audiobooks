export function convertalbums(albumtracks) {
  return albumtracks.map(data => {
    // console.log(data.path);
    return {
      id: data.id,
      url: data.path,
      title: data.title,
      type: 'default',
      album: data.album,
      artist: data.artist,
      // artwork: data.cover,
      duration: data.duration,
    };
  });
}
