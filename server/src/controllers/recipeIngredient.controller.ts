import expressAsyncHandler from "express-async-handler";
import { RecipeIngredient } from "../models";
import { query } from "../database";

export const addRecipeIngredient = expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const { recipeId, ingredientId, ingredientVariant, ingredientGuide, ingredientQuantity } = req.body;
    var result: any;
    try {
        result = await query("INSERT INTO recipe_ingredient(recipe_id,ingredient_id,ingredient_variant,ingredient_guide,ingredient_quantity) VALUES($1,$2,$3,$4,$5) RETURNING *", [recipeId, ingredientId, ingredientVariant, ingredientGuide, ingredientQuantity]);
        console.log(result.rows);
        const ingredientName: any = await query("SELECT ingredient_name from ingredient WHERE ingredient_id=$1", [ingredientId]);
        const newRecipeIngredient: RecipeIngredient = {
            recipeIngredientId: result.rows[0].recipe_ingredient_id,
            recipeId: result.rows[0].recipe_id,
            ingredientId: result.rows[0].ingredient_id,
            ingredientGuide: result.rows[0].ingredient_guide,
            ingredientQuantity: result.rows[0].ingredient_quantity,
            ingredientVariant: result.rows[0].ingredient_variant

        }

        if (result.rowCount > 0) {
            const id: number = recipeId;
            try {
                result = await query("SELECT recipe_ingredient.*, ingredient.ingredient_name as ingredientName FROM recipe_ingredient,ingredient WHERE recipe_ingredient.recipe_id = $1 and recipe_ingredient.ingredient_id = ingredient.ingredient_id", [id]);
                console.log(result.rows[0])
                if (result.rowCount > 0) {
                    const recipeIngredient: RecipeIngredient = {
                        recipeIngredientId: result.rows[0].recipe_ingredient_id,
                        recipeId: result.rows[0].recipe_id,
                        ingredientId: result.rows[0].ingredient_id,
                        ingredientGuide: result.rows[0].ingredient_guide,
                        ingredientQuantity: result.rows[0].ingredient_quantity,
                        ingredientVariant: result.rows[0].ingredient_variant
                    }

                    const finalResult = result.rows.map(
                        (obj: any) => {
                            return {
                                recipeIngredientId: obj.recipe_ingredient_id,
                                recipeId: obj.recipe_id,
                                ingredientId: obj.ingredient_id,
                                ingredientGuide: obj.ingredient_guide,
                                ingredientQuantity: obj.ingredient_quantity,
                                ingredientVariant: obj.ingredient_variant,
                                ingredientName: obj.ingredientname
                            }
                        }
                    )

                    res.status(200).json({
                        status: 200,
                        total: finalResult.rowCount,
                        data: {
                            recipeIngredients: finalResult,
                        },
                        error: null,
                    })

                } else {
                    res.status(200).json({
                        status: 200,
                        data: {
                            recipeIngredient: [],
                        },
                        error: "Didn't find any Recipe with given ID",
                    })
                }

            } catch (err: any) {
                throw new Error(err);
            }

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
        const result: any = await query("SELECT recipe_ingredient.*, ingredient.ingredient_name as ingredientName FROM recipe_ingredient,ingredient WHERE recipe_ingredient.recipe_id = $1 and recipe_ingredient.ingredient_id = ingredient.ingredient_id", [id]);
        console.log(result.rows[0])
        if (result.rowCount > 0) {
            const recipeIngredient: RecipeIngredient = {
                recipeIngredientId: result.rows[0].recipe_ingredient_id,
                recipeId: result.rows[0].recipe_id,
                ingredientId: result.rows[0].ingredient_id,
                ingredientGuide: result.rows[0].ingredient_guide,
                ingredientQuantity: result.rows[0].ingredient_quantity,
                ingredientVariant: result.rows[0].ingredient_variant
            }

            const finalResult = result.rows.map(
                (obj: any) => {
                    return {
                        recipeIngredientId: obj.recipe_ingredient_id,
                        recipeId: obj.recipe_id,
                        ingredientId: obj.ingredient_id,
                        ingredientGuide: obj.ingredient_guide,
                        ingredientQuantity: obj.ingredient_quantity,
                        ingredientVariant: obj.ingredient_variant,
                        ingredientName: obj.ingredientname
                    }
                }
            )

            res.status(200).json({
                status: 200,
                total: finalResult.rowCount,
                data: {
                    recipeIngredients: finalResult,
                },
                error: null,
            })

        } else {
            res.status(200).json({
                status: 200,
                data: {
                    recipeIngredient: [],
                },
                error: "Didn't find any Recipe with given ID",
            })
        }

    } catch (err: any) {
        throw new Error(err);
    }
})

export const deleteRecipeIngredient = expressAsyncHandler(async (req, res) => {

    const recipeIngredientId = req.params.id;

    try {
        var getRecipeIdQuery: any = await query("SELECT * from recipe_ingredient WHERE recipe_ingredient_id=$1", [recipeIngredientId]);
        console.log(getRecipeIdQuery.rows);
        var recipeId: number = 0;
        if (getRecipeIdQuery.rowCount > 0) {
            recipeId = getRecipeIdQuery.rows[0].recipe_id;
        }

        var result: any = await query("DELETE FROM recipe_ingredient WHERE recipe_ingredient_id=$1 RETURNING * ", [recipeIngredientId]);
        console.log(result.rows);
        if (result.rowCount > 0) {
            const allRecipeIngredient: any = await query("SELECT recipe_ingredient.*, ingredient.ingredient_name as ingredientName FROM recipe_ingredient,ingredient WHERE recipe_ingredient.recipe_id = $1 and recipe_ingredient.ingredient_id = ingredient.ingredient_id", [recipeId]);
            console.log(allRecipeIngredient.rows);
            const allRecipeIngredientMapped: any = allRecipeIngredient.rows.map(
                (obj: any) => {
                    return {
                        recipeIngredientId: obj.recipe_ingredient_id,
                        recipeId: obj.recipe_id,
                        ingredientId: obj.ingredient_id,
                        ingredientVariant: obj.ingredient_variant,
                        ingredientGuide: obj.ingredient_guide,
                        ingredientQuantity: obj.ingredient_quantity,
                        ingredientName: obj.ingredientname
                    }
                }
            );

            res.status(200).json({
                totalCount: allRecipeIngredient.rowCount,
                data: {
                    recipeIngredients: allRecipeIngredientMapped,
                },
                error: null,
            })
        } else {
            res.status(202).json({
                totalCount: 0,
                data: {
                    recipeIngredients: [],
                },
                error: null,
            })
        }

    } catch (err: any) {
        console.log(err);
        throw new Error(err);
    }
})
