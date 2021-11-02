import expressAsyncHandler from "express-async-handler";
import { RecipeIngredient } from "../models";
import { query } from "../database";

export const addRecipeIngredient = expressAsyncHandler(async (req, res) => {
    const { recipeId, ingredientId, ingredientVariant, ingredientGuide, ingredientQuantity } = req.body;

    try {
        const result: any = await query("INSERT INTO recipe_ingredient(recipe_id,ingredient_id,ingredient_variant,ingredient_guide,ingredient_quantity) VALUES($1,$2,$3,$4,$5) RETURNING *", [recipeId, ingredientId, ingredientVariant, ingredientGuide, ingredientQuantity]);

        const newRecipeIngredient: RecipeIngredient = {
            recipeIngredientId: result.rows[0].recipe_ingredient_id,
            recipeId: result.rows[0].recipe_id,
            ingredientId: result.rows[0].ingredient_id,
            ingredientGuide: result.rows[0].ingredient_guide,
            ingredientQuantity: result.rows[0].ingredient_quantity,
            ingredientVariant: result.rows[0].ingredient_variant
        }

        if (result.rowCount > 0) {
            res.status(200).json({
                status: 200,
                data: {
                    recipeIngrediant: newRecipeIngredient,
                },
                error: null,
            })
        }

    } catch (err: any) {
        throw new Error(err);
    }

})


export const editRecipeIngredient = expressAsyncHandler(async (req, res) => {
    const { recipeIngredientId, recipeId, ingredientId, ingredientVariant, ingredientGuide, ingredientQuantity } = req.body;

    try {
        const result: any = await query("SELECT * FROM recipe_ingredient WHERE recipe_ingredient_id = $1", [recipeIngredientId]);

        if (result.rowCount > 0) {
            const recipeIngredient: RecipeIngredient = {
                recipeIngredientId: result.rows[0].recipe_ingredient_id,
                recipeId: recipeId,
                ingredientId: ingredientId,
                ingredientGuide: ingredientGuide,
                ingredientQuantity: ingredientQuantity,
                ingredientVariant: ingredientVariant
            }

            res.status(202).json({
                status: 202,
                data: {
                    recipeIngrediant: recipeIngredient,
                },
                error: null,
            })

        }

    } catch (err: any) {
        throw new Error(err);
    }

})

export const getRecipeIngredientById = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        const result: any = await query("SELECT * FROM recipe_ingredient WHERE recipe_ingredient_id = $1", [id]);

        if (result.rowCount > 0) {
            const recipeIngredient: RecipeIngredient = {
                recipeIngredientId: result.rows[0].recipe_ingredient_id,
                recipeId: result.rows[0].recipe_id,
                ingredientId: result.rows[0].ingredient_id,
                ingredientGuide: result.rows[0].ingredient_guide,
                ingredientQuantity: result.rows[0].ingredient_quantity,
                ingredientVariant: result.rows[0].ingredient_variant
            }

            res.status(200).json({
                status: 200,
                data: {
                    recipeIngrediant: recipeIngredient,
                },
                error: null,
            })

        } else {
            res.status(403).json({
                status: 403,
                data: {},
                error: "Didn't find any Recipe with given ID",
            })
        }

    } catch (err: any) {
        throw new Error(err);
    }
})

