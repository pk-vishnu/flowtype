import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri }) {
  if (!accessToken) return null;
  return (
    <SpotifyPlayer token={accessToken} uris={trackUri ? [trackUri] : []} />
  );
}
