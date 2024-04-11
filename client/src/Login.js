import React, { useState } from "react";
import "./index.css";

export default function Login() {
  function generateRandomString(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  var state = generateRandomString(16);
  sessionStorage.setItem("state", state);
  var scope =
    "user-read-private user-read-email streaming user-read-playback-state";
  const params = new URLSearchParams({
    response_type: "code",
    client_id: "d58f21118f8a4feba43aa28970a5ab11",
    scope: scope,
    redirect_uri: "http://localhost:3000/",
  });

  const queryString = params.toString();
  const url = "https://accounts.spotify.com/authorize?" + queryString;

  return (
    <>
      <div className="lg: mx-40">
        <div class="container mx-auto flex px-5 py-4 md:flex-row flex-col items-center">
          <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="title-font sm:text-6xl text-3xl mb-4 font-medium text-light font-poppins">
              Flowtype
              <br class="hidden lg:inline-block" />
            </h1>
            <p class="mb-8 leading-relaxed text-light font-poppins text-xl">
              A minimalistic Lyrics Typing Test synced to music with SpotifyAPI
              integration
            </p>

            <p className="text-light font-poppins text-xs mb-10">
              *Requires Spotify Premium
            </p>
            <div class="flex justify-center">
              <a href={url}>
                <button class="inline-flex text-black bg-green-400 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg font-roboto">
                  Play
                </button>
              </a>
            </div>
          </div>
          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              class="object-cover object-center rounded"
              alt="hero"
              src="ft_hero.png"
            />
          </div>
        </div>
      </div>
    </>
  );
}
