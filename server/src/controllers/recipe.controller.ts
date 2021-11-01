import expressAsyncHandler from "express-async-handler";
import { Recipe } from "../models";
import { query } from "../database";

export const addRecipe = expressAsyncHandler(async (req, res) => {
    const { foodieID, recipeTitle, recipeImage, recipeText } = req.body;

    console.log({ foodieID, recipeTitle, recipeImage, recipeText } );

    try {
        const newRecipe: any = await query("INSERT INTO recipe(foodie_id,recipe_title,recipe_image,recipe_text) VALUES($1,$2,$3,$4) RETURNING *", [foodieID, recipeTitle, recipeImage, recipeText]);
        const recipe: Recipe = {
            foodieId: newRecipe.rows[0].foodie_id,
            recipeId: newRecipe.rows[0].recipe_id,
            recipeTitle: newRecipe.rows[0].recipe_title,
            recipeImage: newRecipe.rows[0].recipe_image,
            recipeText: newRecipe.rows[0].recipe_text,
        }
        res.status(200).json({
            status: 200,
            data: {
                recipe: recipe,
            },
            error: null
        });
    } catch (err) {
        throw new Error("Server Error Occured");
    }
});