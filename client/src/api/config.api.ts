import axios from "axios";

// export const baseUrl = "http://localhost:4000";
export const baseUrl = "http://e49d-103-122-249-5.ngrok.io";

axios.defaults.headers.common["Authentication"] =
    window.localStorage.getItem("Token");

axios.defaults.headers.common["Content-Type"] =
    window.localStorage.getItem("application/json");
