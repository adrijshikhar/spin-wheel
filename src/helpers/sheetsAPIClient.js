import apiClient from "../helpers/apiClient";
import { SHEETS_API } from "../routes.constant";

const sheetsAPIClient = apiClient(SHEETS_API.baseURL);

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1l2fYCmFbo751VHO-AB6TN3V8OKSTJUhQEHhbk4--dts/edit?usp=sharing
 */

export default sheetsAPIClient;
