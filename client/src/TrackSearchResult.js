import React from "react";

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }

  return (
    <div
      className="flex items-center p-4 cursor-pointer text-light"
      onClick={handlePlay}
    >
      <img
        src={track.albumUrl}
        className="h-16 w-16 mr-4 rounded-md"
        alt="Track Album"
      />
      <div>
        <div className="font-semibold">{track.title}</div>
        <div className="text-gray-500">{track.artist}</div>
      </div>
    </div>
  );
}
