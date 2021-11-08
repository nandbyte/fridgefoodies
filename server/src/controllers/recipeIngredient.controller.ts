import expressAsyncHandler from "express-async-handler";
import { RecipeIngredient } from "../models";
import { query } from "../database";
import  axios  from "axios";

export const addRecipeIngredient = expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const { recipeId, ingredientId, ingredientVariant, ingredientQuantity } = req.body;
    
    const fetchName:any = await query("SELECT * FROM ingredient WHERE ingredient_id=$1",[ingredientId]);

    const sentence = fetchName.rows[0].ingredient_name+" "+ingredientQuantity;
    const url = encodeURI(sentence);
    const api = `https://api.edamam.com/api/nutrition-data?app_id=f956f590&app_key=b63e722a5689bf8eb4ec6b4dbb8a2335&nutrition-type=cooking&ingr=${url}`;
    console.log(api);
    let calories:any;
    await axios.get(api).then((response)=>{
        calories = response.data.calories;
    })
    console.log(calories);
    var result: any;
    try {
        result = await query("INSERT INTO recipe_ingredient(recipe_id,ingredient_id,ingredient_variant,ingredient_quantity,ingredient_calories) VALUES($1,$2,$3,$4,$5) RETURNING *", [recipeId, ingredientId, ingredientVariant, ingredientQuantity,calories]);
        console.log(result.rows);
        const ingredientName: any = await query("SELECT ingredient_name from ingredient WHERE ingredient_id=$1", [ingredientId]);
        const newRecipeIngredient: RecipeIngredient = {
            recipeIngredientId: result.rows[0].recipe_ingredient_id,
            recipeId: result.rows[0].recipe_id,
            ingredientId: result.rows[0].ingredient_id,
    
            ingredientQuantity: result.rows[0].ingredient_quantity,
            ingredientVariant: result.rows[0].ingredient_variant,
            ingredientCalories: result.rows[0].ingredient_calories
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

                        ingredientQuantity: result.rows[0].ingredient_quantity,
                        ingredientVariant: result.rows[0].ingredient_variant,
                        ingredientCalories: result.rows[0].ingredient_calories
                    }

                    const finalResult = result.rows.map(
                        (obj: any) => {
                            return {
                                recipeIngredientId: obj.recipe_ingredient_id,
                                recipeId: obj.recipe_id,
                                ingredientId: obj.ingredient_id,
                        
                                ingredientQuantity: obj.ingredient_quantity,
                                ingredientVariant: obj.ingredient_variant,
                                ingredientName: obj.ingredientname,
                                ingredientCalories: obj.ingredient_calories,
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
    const { recipeIngredientId, recipeId, ingredientId, ingredientVariant, ingredientQuantity,ingredientCalories } = req.body;

    try {
        const result: any = await query("SELECT * FROM recipe_ingredient WHERE recipe_ingredient_id = $1", [recipeIngredientId]);

        if (result.rowCount > 0) {
            const recipeIngredient: RecipeIngredient = {
                recipeIngredientId: result.rows[0].recipe_ingredient_id,
                recipeId: recipeId,
                ingredientId: ingredientId,
                
                ingredientQuantity: ingredientQuantity,
                ingredientVariant: ingredientVariant,
                ingredientCalories: ingredientCalories,
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
                
                ingredientQuantity: result.rows[0].ingredient_quantity,
                ingredientVariant: result.rows[0].ingredient_variant,
                ingredientCalories: result.rows[0].ingredient_calories
            }

            const finalResult = result.rows.map(
                (obj: any) => {
                    return {
                        recipeIngredientId: obj.recipe_ingredient_id,
                        recipeId: obj.recipe_id,
                        ingredientId: obj.ingredient_id,
                        ingredientCalories: obj.ingredient_calories,
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
                        ingredientCalories: obj.ingredient_calories,
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
