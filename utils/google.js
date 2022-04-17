const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const path = require("path");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const TOKEN_PATH = path.join(__dirname, "./token.json");

function getAuthFromGoogle(credentials) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris
  );

  oAuth2Client.setCredentials({
    access_token: process.env.TOKEN_ACCESS_TOKEN,
    refresh_token: process.env.TOKEN_REFRESH_TOKEN,
    scope: process.env.TOKEN_SCOPE,
    token_type: process.env.TOKEN_TYPE,
    expiry_date: Number(process.env.TOKEN_EXPIRY_DATE),
  });
  return oAuth2Client;
}

function getAuth() {
  const credentials = {
    installed: {
      client_id: process.env.CREDENTIALS_CLIENT_ID,
      project_id: process.env.CREDENTIALS_PROJECT_ID,
      auth_uri: process.env.CREDENTIALS_AUTH_URI,
      token_uri: process.env.CREDENTIALS_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.CREDENTIALS_AUTH_PROVIDER_X509_CERT_URL,
      client_secret: process.env.CREDENTIALS_CLIENT_SECRET,
      redirect_uris: process.env.CREDENTIALS_REDIRECT_URIS,
    },
  };

  return getAuthFromGoogle(credentials);
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err)
        return console.error(
          "Error while trying to retrieve access token",
          err
        );
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

module.exports = { getAuth };
