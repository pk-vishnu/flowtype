import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri }) {
  if (!accessToken) return null;

  return (
    <div className="bg-dark">
      <SpotifyPlayer
        token={accessToken}
        uris={trackUri ? [trackUri] : []}
        styles={{
          bgColor: "transparent",
          color: "#c4c3ce",
          trackArtistColor: "#c4c3ce",
          trackNameColor: "#c4c3ce",
          sliderColor: "#62cd6a",
        }}
        hideAttribution="true"
        layout="responsive"
      />
    </div>
  );
}
