import { useState, useEffect } from "react";

export default function useAuth() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const getAccessTokenFromURL = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("access_token");
      if (token) {
        setAccessToken(token);
        sessionStorage.setItem("accessToken", token);
        window.location.href = "http://localhost:3000/dashboard";
      }
    };
    getAccessTokenFromURL();
  }, []);

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

  const login = async () => {
    try {
      var state = generateRandomString(16);
      var scope = "user-read-private user-read-email streaming";
      const params = new URLSearchParams({
        response_type: "code",
        client_id: "d58f21118f8a4feba43aa28970a5ab11",
        scope: scope,
        redirect_uri: "http://localhost:3001/callback",
        state: state,
      });

      const queryString = params.toString();
      const url = "https://accounts.spotify.com/authorize?" + queryString;

      window.location.href = url;
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return { accessToken, login };
}
