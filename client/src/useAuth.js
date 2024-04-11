import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  var state = sessionStorage.getItem("state");
  useEffect(() => {
    axios
      .post("https://flowtype-server.vercel.app/login", {
        code,
        state,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        // window.location = "/";
      });
    console.log(code);
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("https://flowtype-server.vercel.app/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);
  sessionStorage.setItem("accessToken", accessToken);
  return accessToken;
}
