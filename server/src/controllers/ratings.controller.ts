import expressAsyncHandler from "express-async-handler";
import { Rating } from "../models";
import { query } from "../database";

export const addRating = expressAsyncHandler(async (req, res) => {
    const { recipeId, foodieId } = req.body;

    try {
        const result: any = await query("INSERT INTO rating(foodie_id,recipe_id) VALUES($1,$2) RETURNING *", [foodieId, recipeId]);
        const rating: Rating = {
            foodieId: result.rows[0].foodie_id,
            recipeId: result.rows[0].recipe_id,
        }
        if (result.rowCount > 0) {
            res.status(200).json({
                status: 200,
                data: {
                    rating: rating,
                },
                error: null,
            });
        } else {
            res.status(200).json({
                status: 200,
                data: {
                    rating: 0,
                },
                error: null,
            });
        }
    } catch (err: any) {
        throw new Error(err);
    }
});

export const checkRating = expressAsyncHandler(async (req, res) => {
    const { recipeId, foodieId } = req.body;

    try {
        const result: any = await query("SELECT *  FROM rating WHERE foodie_id = $1 AND recipe_id=$2", [foodieId, recipeId]);

        if (result.rowCount > 0) {
            const rating: Rating = {
                foodieId: result.rows[0].foodie_id,
                recipeId: result.rows[0].recipe_id,
            }
            res.status(200).json({
                status: 200,
                data: {
                    rating: rating,
                    rated: true,
                },
                error: null,
            });
        } else {
            res.status(200).json({
                status: 200,
                data: {
                    rated: false,
                },
                error: null,
            });
        }
    } catch (err: any) {
        throw new Error(err);
    }
});

export const getAllRatingsByRecipe = expressAsyncHandler(async (req, res) => {
    const id: any = req.params.id;

    try {
        const result: any = await query("SELECT COUNT(recipe_id) as rating FROM rating WHERE recipe_id=$1", [id]);
        if (result.rowCount > 0) {
            res.status(200).json({
                status: 200,
                data: {
                    rating: result.rows[0].rating,
                },
                error: null,
            })
        } else {
            res.status(200).json({
                status: 200,
                data: {
                    rating: 0,
                },
                error: null,
            });
        }
    } catch (err: any) {
        throw new Error(err);
    }
});


export const deleteRating = expressAsyncHandler(async (req, res) => {
    const { recipeId, foodieId } = req.body;
    try {
        const result: any = await query("DELETE FROM rating WHERE foodie_id=$1 and recipe_id=$2 RETURNING *", [foodieId, recipeId]);
        console.log(result);
        if (result.rowCount === 1) {
            res.status(202).json({
                status: 202,
                data: {
                    deleted: true,
                },
                error: null
            })
        } else {
            res.status(202).json({
                status: 202,
                data: {
                    deleted: false,
                },
                error: "Already Deleted or No entry found"
            })
        }
    } catch (err: any) {
        throw new Error(err);
    }
})