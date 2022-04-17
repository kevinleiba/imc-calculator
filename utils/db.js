const { google } = require("googleapis");

/**
 * Prints the infos of imc people:
 * @see https://docs.google.com/spreadsheets/d/1s6x4aWAptcaM0qWjVHHRUqXuSJPZpdTZ8276AiLQZ84/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listImcs(auth) {
  return new Promise((resolve, reject) => {
    const sheets = google.sheets({ version: "v4", auth });

    sheets.spreadsheets.values.get(
      {
        spreadsheetId: "1s6x4aWAptcaM0qWjVHHRUqXuSJPZpdTZ8276AiLQZ84",
        range: "IMC!A2:F",
      },
      (err, res) => {
        if (err) return reject("The API returned an error: " + err);
        const rows = res.data.values;
        if (rows) return resolve(rows);
        return reject("No data");
      }
    );
  });
}

function appendImcs(auth, values) {
  return new Promise((resolve, reject) => {
    const requestBody = { values };
    const sheets = google.sheets({ version: "v4", auth });

    sheets.spreadsheets.values.append(
      {
        spreadsheetId: "1s6x4aWAptcaM0qWjVHHRUqXuSJPZpdTZ8276AiLQZ84",
        range: "IMC!A2:F",
        requestBody,
        valueInputOption: "raw",
      },
      (err, _result) => {
        if (err) return reject("The API returned an error: " + err);
        else {
          return resolve(values);
        }
      }
    );
  });
}

module.exports = { listImcs, appendImcs };
