import axios from "axios";

// export const baseUrl = "http://localhost:4000";
export const baseUrl = "http://d18f-103-122-249-3.ngrok.io";

axios.defaults.headers.common["Authentication"] =
    window.localStorage.getItem("Token");

axios.defaults.headers.common["Content-Type"] =
    window.localStorage.getItem("application/json");
