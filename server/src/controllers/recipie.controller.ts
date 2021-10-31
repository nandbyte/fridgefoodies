import expressAsyncHandler from "express-async-handler";
import { Recipe } from "../models";
import { query } from "express";

export const addRecipie = expressAsyncHandler(async (req, res) => {
    const {foodieID, recipeTitle, recipeCreationTime, recipeText,}
})