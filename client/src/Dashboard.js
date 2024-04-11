import { useState, useEffect } from "react";
import React from "react";
import Player from "./Player";
import TrackSearchResult from "./TrackSearchResult";
import SpotifyWebApi from "spotify-web-api-node";
import "./index.css";
import axios from "axios";
import useAuth from "./useAuth";
import Wpm from "./Wpm";

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
  const [playstate, setPlaystate] = useState(false);
  const [userInput, setUserInput] = useState([]);
  const [currentLine, setCurrentLine] = useState([]);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);
  const [previousResult, setPreviousResult] = useState([0, 0]);
  //Set Access Token
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  //Lyrics handling
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
    if (playstate == false) {
      setLyrics([]);
    }
  }, [playstate]);
  //End of Lyrics Handling

  //Spotify API handling
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
          setPlaystate(data.is_playing);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 500);

    return () => clearInterval(intervalId);
  }, [accessToken]);

  //Current Lyric Line Handling
  useEffect(() => {
    let index = 0;
    while (
      index < lyrics.length &&
      lyrics[index].seconds * 1000 <= progressMs
    ) {
      index++;
    }
    setCurrentLyricIndex(index - 1);
  }, [lyrics, progressMs]);

  function chooseTrack(track) {
    setPlayingTrack(track);
    setTitle(track.title);
    setSearch("");
    setPreviousResult([0, 0]);
  }

  //Search Track Handling
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

  //Lyric Line Handling
  useEffect(() => {
    setCurrentLine(lyrics[currentLyricIndex]?.lyrics.split(" "));
  }, [currentLyricIndex]);

  //User Input Handling
  function processInput(value) {
    if (value.endsWith(" ")) {
      if (value.trim() === currentLine[activeWordIndex]) {
        setCorrectWordArray((array) => [...array, true]);
        setActiveWordIndex((index) => index + 1);
        setUserInput("");
      } else {
        setCorrectWordArray((array) => [...array, false]);
        setActiveWordIndex((index) => index + 1);
        setUserInput("");
      }
    } else {
      setUserInput(value);
    }
  }

  useEffect(() => {
    setActiveWordIndex(0);
    setUserInput("");
  }, [currentLyricIndex]);

  function Word(props) {
    const { text, active, correct } = props;

    if (correct === true) {
      return <span className="text-green-400">{text + " "}</span>;
    } else if (correct === false) {
      return <span className="text-slate-600">{text + " "}</span>;
    } else if (active === true) {
      return (
        <span className="text-light bg-slate-700 rounded-md">{text + " "}</span>
      );
    } else {
      return <span> {text + " "}</span>;
    }
  }

  Word = React.memo(Word);

  //Reset Correct Word Array when line changes
  useEffect(() => {
    setCorrectWordArray([]);
    setUserInput("");
  }, [currentLyricIndex]);

  function handleResultCallback(data) {
    setPreviousResult(data);
  }
  return (
    <>
      <div className="lg: mx-40 sm:mx-10 md:mx-20">
        <center>
          {playstate ? (
            <h1 className="text-xs text-light mb-5 font-poppins">
              ၊၊||၊ {title}
            </h1>
          ) : (
            <h1 className="text-md text-light mb-5 font-poppins">Press ▷</h1>
          )}
        </center>
        <div className="m-0 p-0">
          {!playstate && (
            <>
              <input
                type="search"
                className="w-full bg-dark text-light placeholder-silver border border-green-400 rounded-md py-2 px-4 focus:outline-none focus:border-green-300"
                placeholder="Search Songs/Artists"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </>
          )}
          {!playstate &&
            previousResult[0] !== 0 &&
            previousResult[1] !== 0 &&
            searchResults.length === 0 && (
              <>
                <div className="previousResult">
                  <div class="container mx-auto flex px-5 py-20 items-center justify-center flex-col">
                    <div className="rounded-lg overflow-hidden shadow-lg p-8">
                      <p className="mb-8 leading-relaxed sm:text-2xl text-4xl font-roboto text-light">
                        You just typed {playingTrack.artist} -{" "}
                        {playingTrack.title}
                      </p>
                      <div className="flex items-center justify-center">
                        <img
                          src={playingTrack.albumUrl}
                          className="h-32 w-32 mr-4 rounded-md"
                          alt="Track Album"
                        />
                        <div>
                          <h1 className="title-font sm:text-4xl text-xl mb-2 text-light font-roboto">
                            {previousResult[0]} WPM
                          </h1>
                          <h1 className="title-font sm:text-4xl text-xl mb-4 text-light font-roboto">
                            {previousResult[1]}% Accuracy
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

          <div className="overflow-y-auto max-h-[400px]">
            {searchResults.map((track) => (
              <TrackSearchResult
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
              />
            ))}
          </div>
          {playstate && (
            <>
              <div>
                {correctWordArray && currentLine && (
                  <div className="text-light text-2xl font-roboto mb-0">
                    <Wpm
                      correctWordArray={correctWordArray}
                      progressMs={progressMs}
                      timestamp={lyrics[currentLyricIndex]?.seconds}
                      resultCallback={handleResultCallback}
                    />
                  </div>
                )}
              </div>
              <div className="lg:pt-40 md:pt-40 text-light text-4xl text-center font-roboto">
                {lyrics?.length === 0 && "No lyrics found"}
                <p>
                  {currentLine &&
                    currentLine.map((word, index) => {
                      return (
                        <Word
                          text={word}
                          active={index === activeWordIndex}
                          correct={correctWordArray[index]}
                          timestamp={lyrics[currentLyricIndex]?.seconds}
                        />
                      );
                    })}
                </p>
                <br></br>
                <input
                  className="content-center bg-dark text-light placeholder-silver rounded-md focus:outline-none text-sm lg:pt-20 md:pt-10 px-2 py-2 w-1/2 text-center"
                  type="text"
                  value={userInput}
                  placeholder="Type Here"
                  onChange={(e) => processInput(e.target.value)}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 w-full bg-gray-300 py-0 text-center">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </>
  );
}
