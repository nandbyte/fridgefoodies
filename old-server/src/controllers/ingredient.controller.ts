import { Ingredient } from "./../models/ingredient.model";
import { Handler } from "express";
import { query } from "../database";
import { log } from "../service/logger";

export const listIngredients: Handler = async (req, res) => {
    try {
        const queryResult: any = await query("select * from ingredient", []);
        const ingredients: Ingredient[] = queryResult.rows;
        res.status(200).json(ingredients);
    } catch (err: any) {
        log.error(err.message);
    }
};

export const getIngredientById: Handler = async (req, res) => {
    try {
        const id = req.params.id;
        const queryResult: any = await query(
            "select * from ingredient where ingredient_id=$1",
            [id]
        );
        const ingredient: Ingredient = queryResult.rows[0];
        res.status(200).json(ingredient);
    } catch (err: any) {
        log.error(err.message);
    }
};
