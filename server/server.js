require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const querystring = require("querystring");
const axios = require("axios");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = "http://localhost:3000";

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
