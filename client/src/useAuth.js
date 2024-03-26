import { useState } from "react";
import axios from "axios";

export default function useAuth() {
  const [accessToken, setAccessToken] = useState(null);

  const login = async () => {
    try {
      const response = await axios.get("http://localhost:3001/login", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = response.data;
      setAccessToken(data.accessToken);
      console.log(data.accessToken);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return { accessToken, login };
}
