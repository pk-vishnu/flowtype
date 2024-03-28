import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);

  return (
    <SpotifyPlayer
      token={accessToken}
      styles={{
        bgColor: "#131314",
        color: "#c4c3ce",
        trackArtistColor: "#c4c3ce",
        trackNameColor: "#c4c3ce",
        sliderColor: "#62cd6a",
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
      hideAttribution="true"
      layout="responsive"
    />
  );
}
