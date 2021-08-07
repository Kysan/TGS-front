const { default: axios } = require("axios");

let API_URL = `http://${document.location.hostname}:5000`;

module.exports = { API_URL: API_URL + "/api", APIKey: "AIzaSyBFhZlRGKYy4d_LF6TSR_9l6y0FrNngnZs" };
