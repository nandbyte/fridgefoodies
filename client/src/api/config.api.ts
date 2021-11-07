import axios from "axios";

// export const baseUrl = "http://localhost:4000";
export const baseUrl = "http://02f9-103-122-249-3.ngrok.io";

axios.defaults.headers.post["Authorization"] =
    "Bearer " + window.localStorage.getItem("Token");

axios.defaults.headers.post["FoodieId"] =
    "Bearer " + window.localStorage.getItem("FoodieId");

axios.defaults.headers.post["Foodie"] =
    "Bearer " + window.localStorage.getItem("Foodie");

axios.defaults.headers.put["Authorization"] =
    "Bearer " + window.localStorage.getItem("Token");

axios.defaults.headers.put["FoodieId"] =
    "Bearer " + window.localStorage.getItem("FoodieId");

axios.defaults.headers.put["Foodie"] =
    "Bearer " + window.localStorage.getItem("Foodie");

axios.defaults.headers.delete["Authorization"] =
    "Bearer " + window.localStorage.getItem("Token");

axios.defaults.headers.delete["FoodieId"] =
    "Bearer " + window.localStorage.getItem("FoodieId");

axios.defaults.headers.delete["Foodie"] =
    "Bearer " + window.localStorage.getItem("Foodie");
