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

export const getAllRecipeByUsers = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await query("SELECT * FROM recipe WHERE foodie_id = $1", [id]);
    if (result.rowCount === 0) {
        res.status(403).json({
            status: 403,
            data: {
                message: "No recipe found for this user"
            },
            error: null,
        })
    } else {
        res.status(200).json({
            status: 200,
            data: {
                recipes: result.rows,
                message: "Total recipe found " + result.rowCount,
            },
            error: null,
        })
    }
})

export const getRecipeById = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    let result: any;
    let ingredientsResult: any;

    try {
        result = await query("SELECT * FROM recipe WHERE recipe_id = $1", [id]);
    } catch (err: any) {
        console.log(err);
        throw new Error("Error while fetching recipe");
    }

    try {
        ingredientsResult = await query("SELECT * FROM recipe_ingredient WHERE recipe_id = $1", [id]);
    } catch (err: any) {
        console.log(err);
        throw new Error("Error while fetching recipe");
    }


    if (result.rowCount === 0) {
        res.status(403).json({
            status: 403,
            data: {
                message: "The recipe you're looking for is not currently available",
            },
            error: null,
        })
    } else {
        let jsonArray = result.rows;
        let modified = jsonArray.map(
            (obj: any) => {
                return {
                    "recipeId": obj.recipe_id,
                    "foodieId": obj.foodie_id,
                    "recipeTitle": obj.recipe_title,
                    "recipeText": obj.recipe_text,
                    "recipeImage": obj.recipe_image,
                }
            }
        );

        let modifiedIngredient = ingredientsResult.rows.map(
            (obj: any) => {
                return {
                    "recipeIngredientId": obj.recipe_ingredient_id,
                    "recipeId": obj.recipe_id,
                    "ingredientId": obj.ingredient_id,
                    "ingredientVariant": obj.ingredient_variant,
                    "ingredientGuide": obj.ingredient_guide,
                    "ingredientQuantity": obj.ingredient_quantity,
                }
            }
        );

        res.status(200).json({
            status: 200,
            data: {
                recipe: modified,
                recipeIngredients: modifiedIngredient,
                message: "Recipe found",
            },
            error: null,
        })
    }
})

export const getAllRecipe = expressAsyncHandler(async (req, res) => {
    try {
        const result: any = await query("SELECT * FROM recipe", []);
        let jsonArray = result.rows;

        let modified = jsonArray.map(
            (obj: any) => {
                return {
                    "recipeId": obj.recipe_id,
                    "foodieId": obj.foodie_id,
                    "recipeTitle": obj.recipe_title,
                    "recipeText": obj.recipe_text,
                    "recipeImage": obj.recipe_image,
                }
            }
        );
        res.status(200).json({
            total: result.rowCount,
            data: {
                recipes: modified,
            },
        })
    } catch (err: any) {
        console.log(err);
    }
})

export const searchRecipeByKeyWord = expressAsyncHandler(async (req, res) => {
    const keyword = req.params.keyword;
    try {

        const result: any = await query("SELECT * FROM recipe WHERE lower(recipe_title) like lower($1)", ["%" + keyword + "%"]);
        if (result.rowCount > 0) {


            res.status(200).json({
                data: result.rows,
                totalMatch: result.rowCount,
            })
        } else {
            res.status(403).json({
                data: {},
                totalMatch: result.rowCount,
            })
        }
    } catch (err: any) {
        console.log(err);
    }
})

