import expressAsyncHandler from "express-async-handler";
import { Recipe } from "../models";
import { query } from "../database";

export const addRecipe = expressAsyncHandler(async (req, res) => {
    const { foodieID, recipeTitle, recipeImage, recipeText } = req.body;

    console.log({ foodieID, recipeTitle, recipeImage, recipeText });

    const result: any = await query("SELECT * FROM recipe WHERE foodie_id=$1 AND recipe_title=$2", [foodieID, recipeTitle]);
    if (result.rowCount > 0) {
        res.status(403).json({
            status: 403,
            data: {},
            error: "Recipe already exists"
        })
    }

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

export const editRecipe = expressAsyncHandler(async (req, res) => {
    const { recipeId, recipeTitle, recipeImage, recipeText } = req.body;

    const result: any = await query("UPDATE recipe SET recipe_image=$1, recipe_text=$2, recipe_title = $4 WHERE recipe_id=$3 RETURNING *",
        [recipeImage, recipeText, recipeId, recipeTitle]);

    if (result.rowCount > 1) {
        res.status(403).json({
            status: 403,
            data: {},
            error: "Failed to Update information"
        });
    } else {
        res.status(200).json({
            status: 200,
            data: {
                recipe: result.rows[0],
            },
            error: null
        }
        )
    }
})