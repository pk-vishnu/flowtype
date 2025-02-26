require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const querystring = require("querystring");
const axios = require("axios");
const https = require("https");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

app.post("/login", function (req, res) {
  var code = req.body.code || null;

  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    json: true,
  };
  axios
    .post(authOptions.url, querystring.stringify(authOptions.form), {
      headers: authOptions.headers,
    })
    .then((response) => {
      data = response.data;
      console.log(data);
      res.json({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
      });
    })
    .catch((error) => {
      console.error("Error exchanging code for access token:", error);
      res.status(500).send("Internal Server Error");
    });
});

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    },
    json: true,
  };
  axios
    .post(authOptions.url, querystring.stringify(authOptions.form), {
      headers: authOptions.headers,
    })
    .then((response) => {
      data = response.data;
      res.json({
        accessToken: data.access_token,
        expiresIn: data.expires_in,
      });
    })
    .catch((error) => {
      console.error("Error refreshing token:", error);
      res.status(500).send("Internal Server Error");
    });
});

app.get("/lyrics", async (req, res) => {
  var track = req.query.track;
  var artist = req.query.artist;
  const apiUrl = `https://api.textyl.co/api/lyrics?q=${artist}%20${track}`;
  const agent = new https.Agent({  
    rejectUnauthorized: false
  });
  try {
    const response = await axios.get(apiUrl, { httpsAgent: agent });
    console.log(track);
    console.log(artist);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3001);
console.log("Server listening on port 3001");
