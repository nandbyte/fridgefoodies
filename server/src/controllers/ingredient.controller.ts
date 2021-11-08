import { Ingredient } from "./../models/ingredient.model";
import { Handler } from "express";
import { query } from "../database";
import { log } from "../service/logger";
import expressAsyncHandler from "express-async-handler";

export const listIngredients: Handler = async (req, res) => {
    try {
        const queryResult: any = await query("select * from ingredient order by ingredient_id asc", []);
        const ingredients: Ingredient[] = queryResult.rows;
        const modified = ingredients.map(
            (obj: any) => {
                return {
                    ingredientId: obj.ingredient_id,
                    ingredientName: obj.ingredient_name,
                }
            }
        )
        res.status(200).json({
            status: 200,
            data: {
                ingredient: modified,
            },
            error: null,
        });
    } catch (err: any) {
        log.error(err.message);
    }
};

export const getIngredientById: Handler = async (req, res) => {
    try {
        const id = req.params.id;
        const result: any = await query(
            "select * from ingredient where ingredient_id=$1",
            [id]
        );
        const ingredient: Ingredient = {
            ingredientId: result.rows[0].ingredient_id,
            ingredientName: result.rows[0].ingredient_name,
            ingredientDescription: result.rows[0].ingredient_description
        }
        res.status(200).json({
            status: 200,
            data: {
                ingredient: ingredient,
            },
            error: null,
        });
    } catch (err: any) {
        log.error(err.message);
    }
};

export const addIngredient = expressAsyncHandler(async (req, res) => {
    const { ingredientName, ingredientDescription } = req.body;

    try {
        const result: any = await query("INSERT INTO ingredient(ingredient_name,ingredient_description) VALUES($1,$2) RETURNING *",
            [ingredientName, ingredientDescription]);

        if (result.rowCount > 0) {

            const ingrediant: Ingredient = {
                ingredientId: result.rows[0].ingredient_id,
                ingredientName: result.rows[0].ingredient_name,
                ingredientDescription: result.rows[0].ingredient_description
            }
            res.status(200).json({
                status: 200,
                data: {
                    ingrediant: ingrediant,
                },
                error: null,
            })
        } else {
            res.status(200).json({
                status: 200,
                data: {
                    ingredient:{}
                },
                error: "Can't add the ingredient"
            });
        }

    } catch (err: any) {
        res.status(203).json({
            status: 203,
            data:{},
            error:"Ingredient Already present",
        })
        console.log(err);
    }
})

export const editIngredient = expressAsyncHandler(async (req, res) => {
    const { ingredientId, ingredientName, ingredientDescription } = req.body;

    try {
        var result: any = await query("SELECT * FROM ingredient WHERE ingredient_id = $1",
            [ingredientId]);
        if (result.rowCount > 0) {

            result = await query("UPDATE ingredient SET ingredient_name=$1, ingredient_description = $2 WHERE ingredient_id=$3 RETURNING *", [ingredientName, ingredientDescription, ingredientId]);

            const ingredient: Ingredient = {
                ingredientId: result.rows[0].ingredient_id,
                ingredientName: result.rows[0].ingredient_name,
                ingredientDescription: result.rows[0].ingredient_description,
            }

            res.status(200).json({
                status: 200,
                data: {
                    ingrediant: ingredient,
                },
                error: null,
            })
        } else {
            res.status(200).json({
                status: 200,
                data: {
                    ingrediant: {},
                },
                error: "Unable to updated the recipe"
            });
        }

    } catch (err: any) {
        console.log(err);
    }
})




