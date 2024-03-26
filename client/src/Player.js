import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri }) {
  if (!accessToken) return null;

  return (
    <div className="bg-dark">
      <SpotifyPlayer token={accessToken} uris={trackUri ? [trackUri] : []} />
    </div>
  );
}
