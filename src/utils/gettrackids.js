export function gettrackids(albumtracks) {
  return albumtracks.map((track, index) => {
    return {
      index: index,
      trackid: track.id,
    };
  });
}
