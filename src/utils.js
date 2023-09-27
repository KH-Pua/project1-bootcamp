const playlistClassical = require("./JSON/playlist-all-out-80s.json");
const playlistCountry = require("./JSON/playlist-country-greatest-hits.json");
const playlistRoadtrip = require("./JSON/playlist-song-for-roadtrip.json");
const playlistMandopop = require("./JSON/playlist-mandopop.json");
const playlistCantopop = require("./JSON/playlist-cantopop.json");

function parseJSON(playlist) {
  const arrangedPlaylist = playlist.tracks.items.map((eachTrack) => {
    let trackName = eachTrack.track.name;
    let trackPreviewUrl = eachTrack.track.preview_url;
    let artistName = eachTrack.track.album.artists[0].name;
    let albumName = eachTrack.track.album.name;
    let albumArt = eachTrack.track.album.images[0].url;

    return {
      trackName: trackName,
      trackPreviewUrl: trackPreviewUrl,
      artistName: artistName,
      albumName: albumName,
      albumArt: albumArt,
    };
  });

  return arrangedPlaylist.filter((obj) => {
    return obj.trackPreviewUrl !== null;
  });
}

const easternObj = {};
easternObj.cantopop = parseJSON(playlistCantopop);
easternObj.mandopop = parseJSON(playlistMandopop);

const westernObj = {};
westernObj.classical = parseJSON(playlistClassical);
westernObj.country = parseJSON(playlistCountry);
westernObj.roadtrip = parseJSON(playlistRoadtrip);

const selectionsObj = {};
selectionsObj.eastern = easternObj;
selectionsObj.western = westernObj;

export default selectionsObj;
