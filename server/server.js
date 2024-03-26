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
const redirect_uri = "http://localhost:3001/callback";

app.get("/callback", function (req, res) {
  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
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
        res.redirect(
          "http://localhost:3000?" +
            querystring.stringify({
              access_token: data.access_token,
              refresh_token: data.refresh_token,
              expires_in: data.expires_in,
            })
        );
      })
      .catch((error) => {
        console.error("Error exchanging code for access token:", error);
        res.status(500).send("Internal Server Error");
      });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
