import axios from "axios";
import { Comment } from "../state/types/comment.type";
import { baseUrl } from "./config.api";

export const getCommentsByRecipe = async (recipeId: number) => {
    return axios.get(baseUrl + "/comment/" + recipeId);
};

export const postComment = async (comment: Comment) => {
    console.log(
        "POST COMMENT - \n" +
            "Bearer " +
            window.localStorage.getItem("Token") +
            "\nFoodie" +
            window.localStorage.getItem("Foodie") +
            "\nFoodie" +
            window.localStorage.getItem("FoodieId")
    );
    return axios.post(
        baseUrl + "/comment/",
        { ...comment },
        {
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem("Token"),
                FoodieId: window.localStorage.getItem("FoodieId"),
            },
        }
    );
};

export const deleteComment = async (commentId: number) => {
    console.log(
        "DELETE COMMENT - " +
            "Bearer " +
            window.localStorage.getItem("Token") +
            "\nFoodie" +
            window.localStorage.getItem("Foodie")
    );
    return axios.delete(baseUrl + "/comment/" + commentId, {
        headers: {
            Authorization: "Bearer " + window.localStorage.getItem("Token"),
            FoodieId: window.localStorage.getItem("FoodieId"),
        },
    });
};
