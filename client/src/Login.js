import React from "react";

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
  var scope = "user-read-private user-read-email streaming";
  const params = new URLSearchParams({
    response_type: "code",
    client_id: "d58f21118f8a4feba43aa28970a5ab11",
    scope: scope,
    redirect_uri: "http://localhost:3000",
    state: state,
  });

  const queryString = params.toString();
  const url = "https://accounts.spotify.com/authorize?" + queryString;

  return (
    <div>
      <a className="btn btn-success btn-lg" href={url}>
        Login With Spotify
      </a>
    </div>
  );
}
