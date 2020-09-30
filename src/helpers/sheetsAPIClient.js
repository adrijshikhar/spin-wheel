import { GoogleSpreadsheet } from "google-spreadsheet";
import CREDS from "../config/credentials.json";

// Config variables
const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
const sheetsAPIClient = async () => {
  await doc.useServiceAccountAuth(CREDS, CLIENT_EMAIL);
  await doc.loadInfo();
  return doc;
};

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1l2fYCmFbo751VHO-AB6TN3V8OKSTJUhQEHhbk4--dts/edit?usp=sharing
 */

export default sheetsAPIClient;
