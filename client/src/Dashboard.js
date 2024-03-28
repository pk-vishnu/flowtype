import { useState, useEffect } from "react";
import Player from "./Player";
import TrackSearchResult from "./TrackSearchResult";
import SpotifyWebApi from "spotify-web-api-node";
import "./index.css";
import axios from "axios";
import useAuth from "./useAuth";

const spotifyApi = new SpotifyWebApi({
  clientId: "d58f21118f8a4feba43aa28970a5ab11",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState(null);
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState([]);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [progressMs, setProgressMs] = useState(0);

  useEffect(() => {
    if (!playingTrack) return;
    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;

    const intervalId = setInterval(() => {
      fetch("https://api.spotify.com/v1/me/player", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.is_playing && data.progress_ms !== undefined) {
            setProgressMs(data.progress_ms);
          }
        })
        .catch((error) => {});
    }, 200);

    return () => clearInterval(intervalId);
  }, [accessToken]);

  useEffect(() => {
    let index = 0;
    while (
      index < lyrics.length &&
      lyrics[index].seconds * 1000 <= progressMs
    ) {
      index++;
    }
    // Set the current lyric index
    setCurrentLyricIndex(index - 1);
  }, [lyrics, progressMs]);
  function chooseTrack(track) {
    setPlayingTrack(track);
    setTitle(track.title);
    setSearch("");
  }

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <>
      <div className="lg: mx-40 sm:mx-10 md:mx-20">
        <center>
          <h1 className="text-md text-light mb-5 font-poppins">
            Selected - {title}
          </h1>
        </center>
        <div className="m-0 p-0">
          <input
            type="search"
            className="w-full bg-dark text-light placeholder-silver border border-green-400 rounded-md py-2 px-4 focus:outline-none focus:border-green-300"
            placeholder="Search Songs/Artists"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="overflow-y-auto max-h-[400px]">
            {searchResults.map((track) => (
              <TrackSearchResult
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
              />
            ))}
            {playingTrack && (
              <div className="lg:p-40 text-light text-4xl text-center font-roboto">
                {lyrics[currentLyricIndex]?.lyrics}
                <br></br>
                <useSpotifyPlayerProgress />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full bg-gray-300 py-0 text-center">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </>
  );
}
