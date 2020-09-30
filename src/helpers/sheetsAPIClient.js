const { google } = require("googleapis");

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1l2fYCmFbo751VHO-AB6TN3V8OKSTJUhQEHhbk4--dts/edit?usp=sharing
 */
const getData = (apiKey, callback) => {
  const sheets = google.sheets({ version: "v4" });
  sheets.spreadsheets.values.get(
    {
      spreadsheetId: "1l2fYCmFbo751VHO-AB6TN3V8OKSTJUhQEHhbk4--dts",
      range: "Class Data!A:C",
      key: apiKey,
    },
    callback
  );
};

export default { getData };
