# Flowtype 🖮
<br>

![image](https://github.com/pk-vishnu/flowtype/assets/115440233/7984ad24-c534-4576-9787-e0160279a39a)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Spotify](https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white)


# About
Flowtype is a streamlined typing speed testing application that enables users to assess and enhance their typing speed and accuracy by typing song lyrics with SpotifyAPI integration.

# Features

- Minimalistic design
- Expansive music library from Spotify
- Live error, words per minute (WPM), and accuracy displays
- Variety of test lengths and languages

# Run Locally

1. Create an App in [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Note the client ID and client secret.
3. Set the Redirect URI to match your Client's URI (e.g., "http://localhost:3000/").
4. In the "APIs used" section, ensure to check:
   - Web API
   - Web Playback SDK
5. In the server folder, create a `.env` file with the information from the above steps.


   
   ```
   CLIENT_ID = 
   CLIENT_SECRET = 
   REDIRECT_URI = 
    ```
   
6. Replace the GET and POST request calls with your local server address (eg: "http://localhost:8800") in the client (UseAuth.js hook and Dashboard.js)
7. Run client and server separately with
    ```
    npm run start
    ```
