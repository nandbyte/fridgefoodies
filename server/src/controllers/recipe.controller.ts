import expressAsyncHandler from "express-async-handler";
import axios from "axios";
import { Recipe } from "../models";
import { query } from "../database";

export const addRecipe = expressAsyncHandler(async (req, res) => {
    const { foodieId, recipeTitle, recipeImage, recipeText } = req.body;
    const result: any = await query(
        "SELECT * FROM recipe WHERE foodie_id=$1 AND recipe_title=$2",
        [foodieId, recipeTitle]
    );
    if (result.rowCount > 0) {
        res.status(403).json({
            status: 403,
            data: {},
            error: "Recipe already exists",
        });
    }

    try {
        var newRecipe: any;
        try {
            newRecipe = await query(
                "INSERT INTO recipe(foodie_id,recipe_title,recipe_image,recipe_text) VALUES($1,$2,$3,$4) RETURNING *",
                [foodieId, recipeTitle, recipeImage, recipeText]
            );
            // console.log(newRecipe.rows[0]);
        } catch (err) {
            console.log(err);
        }
        var rating: any;
        const recipe: Recipe = {
            foodieId: newRecipe.rows[0].foodie_id,
            recipeId: newRecipe.rows[0].recipe_id,
            recipeTitle: newRecipe.rows[0].recipe_title,
            recipeImage: newRecipe.rows[0].recipe_image,
            recipeText: newRecipe.rows[0].recipe_text,
        };

        try {
            rating = await query(
                "INSERT INTO RATING (foodie_id,recipe_id) VALUES($1,$2)",
                [foodieId, recipe.recipeId]
            );
        } catch (err) {
            console.log(err);
        }
        res.status(200).json({
            status: 200,
            data: {
                recipe: recipe,
            },
            error: null,
        });
    } catch (err) {
        console.log(err);
        throw new Error("Server Error Occured");
    }
});

export const editRecipe = expressAsyncHandler(async (req, res) => {
    const { recipeId, recipeTitle, recipeImage, recipeText } = req.body;
    console.log(req.body);
    const result: any = await query(
        "UPDATE recipe SET recipe_image=$1, recipe_text=$2, recipe_title = $3 WHERE recipe_id=$4 RETURNING *",
        [recipeImage, recipeText, recipeTitle, recipeId]
    );
    console.log(result.rows[0]);
    if (result.rowCount > 1) {
        res.status(200).json({
            status: 200,
            data: {},
            error: "Failed to Update information",
        });
    } else {
        res.status(200).json({
            status: 200,
            data: {
                recipe: result.rows[0],
            },
            error: null,
        });
    }
});

export const getAllRecipeByUsers = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;

    const result = await query(
        `    
        SELECT recipe.*,totalRating
        FROM recipe,(
        SELECT COUNT(recipe_id) as totalRating, recipe_id
        FROM rating
        GROUP BY recipe_id
        ) AS counterTable
        WHERE recipe.recipe_id = counterTable.recipe_id
        AND recipe.foodie_id = $1
    `,
        [id]
    );
    if (result.rowCount === 0) {
        res.status(200).json({
            status: 200,
            data: {
                recipes: [],
            },
            error: null,
        });
    } else {
        const finalRes = result.rows.map((obj: any) => {
            return {
                recipeId: obj.recipe_id,
                foodieId: obj.foodie_id,
                recipeTitle: obj.recipe_title,
                recipeText: obj.recipe_text,
                recipeImage: obj.recipe_image,
                totalRating: obj.totalrating,
            };
        });
        res.status(200).json({
            status: 200,
            data: {
                recipes: finalRes,
                message: "Total recipe found " + result.rowCount,
            },
            error: null,
        });
    }
});

export const getRecipeById = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    let result: any;
    let ingredientsResult: any;
    let comments: any;
    let commentsMapped: any;
    try {
        result = await query(
            `
        SELECT recipe.*,totalRating,foodie.foodie_name as foodie_name
        FROM recipe,foodie,(
        SELECT COUNT(recipe_id) as totalRating, recipe_id
        FROM rating
        GROUP BY recipe_id
    ) AS counterTable
    WHERE recipe.recipe_id = counterTable.recipe_id AND recipe.recipe_id = $1 AND recipe.foodie_id=foodie.foodie_id`,
            [id]
        );
        console.log(result.rows);
    } catch (err: any) {
        console.log(err);
        throw new Error("Error while fetching recipe");
    }

    try {
        ingredientsResult = await query(
            "SELECT recipe_ingredient.*, ingredient.ingredient_name FROM recipe_ingredient,ingredient WHERE recipe_ingredient.recipe_id = $1 AND recipe_ingredient.ingredient_id = ingredient.ingredient_id",
            [id]
        );
    } catch (err: any) {
        console.log(err);
        throw new Error("Error while fetching ingredient");
    }

    try {
        comments = await query(
            "SELECT comment.*, foodie.foodie_name as foodie_name FROM comment,foodie where recipe_id = $1 AND comment.foodie_id=foodie.foodie_id ORDER BY comment.comment_id desc",
            [id]
        );
        if (comments.rowCount > 0) {
            commentsMapped = comments.rows.map((obj: any) => {
                return {
                    commentId: obj.comment_id,
                    foodieId: obj.foodie_id,
                    recipeId: obj.recipe_id,
                    commentText: obj.comment_text,
                    foodieName: obj.foodie_name,
                };
            });
        } else {
            commentsMapped = [];
        }
        console.log(commentsMapped);
    } catch (err: any) {}
    if (result.rowCount === 0) {
        res.status(200).json({
            status: 200,
            data: {
                data: {},
            },
            error: "Recipe doesn't exists",
        });
    } else {
        let jsonArray = result.rows;
        let modified = jsonArray.map((obj: any) => {
            return {
                recipeId: obj.recipe_id,
                foodieId: obj.foodie_id,
                recipeTitle: obj.recipe_title,
                recipeText: obj.recipe_text,
                recipeImage: obj.recipe_image,
                foodieName: obj.foodie_name,
            };
        });

        let modifiedIngredient = ingredientsResult.rows.map((obj: any) => {
            return {
                recipeIngredientId: obj.recipe_ingredient_id,
                recipeId: obj.recipe_id,
                ingredientId: obj.ingredient_id,
                ingredientVariant: obj.ingredient_variant,
                ingredientQuantity: obj.ingredient_quantity,
                ingredientName: obj.ingredient_name,
                ingredientCalories: obj.ingredient_calories,
            };
        });

        res.status(200).json({
            status: 200,
            data: {
                recipe: modified,
                recipeIngredients: modifiedIngredient,
                totalRating: result.rows[0].totalrating,
                comments: commentsMapped,
            },
            message: "Recipe found",
            error: null,
        });
    }
});

export const getAllRecipe = expressAsyncHandler(async (req, res) => {
    try {
        const result: any = await query(
            `SELECT recipe.*,totalRating
        FROM recipe,(
            SELECT COUNT(recipe_id) as totalRating, recipe_id
            FROM rating
            GROUP BY recipe_id
        ) AS counterTable
        WHERE recipe.recipe_id = counterTable.recipe_id;`,
            []
        );
        let jsonArray = result.rows;

        let modified = jsonArray.map((obj: any) => {
            return {
                recipeId: obj.recipe_id,
                foodieId: obj.foodie_id,
                recipeTitle: obj.recipe_title,
                recipeText: obj.recipe_text,
                recipeImage: obj.recipe_image,
                totalRating: obj.totalrating,
            };
        });
        res.status(200).json({
            total: result.rowCount,
            data: {
                recipes: modified,
            },
        });
    } catch (err: any) {
        console.log(err);
    }
});

export const searchRecipeByKeyWord = expressAsyncHandler(async (req, res) => {
    const keyword = req.params.keyword;
    const _sort = req.query.sort === "rating" ? "totalrating" : "recipe_title";
    const _order = req.query.order;
    console.log(_sort, _order);
    try {
        const result: any = await query(
            `
        SELECT recipe.*,totalRating
        FROM recipe,(
        SELECT COUNT(recipe_id) as totalRating, recipe_id
        FROM rating
        GROUP BY recipe_id
        ) AS counterTable
        WHERE recipe.recipe_id = counterTable.recipe_id 
        AND lower(recipe_title) like lower($1)
        ORDER BY ${_sort} ${_order}`,
            ["%" + keyword + "%"]
        );
        if (result.rowCount > 0) {
            const finalResult = result.rows.map((obj: any) => {
                return {
                    recipeId: obj.recipe_id,
                    foodieId: obj.foodie_id,
                    recipeTitle: obj.recipe_title,
                    recipeText: obj.recipe_text,
                    recipeImage: obj.recipe_image,
                    totalRating: obj.totalrating,
                };
            });
            res.status(200).json({
                data: {
                    recipes: finalResult,
                },
                totalMatch: result.rowCount,
            });
        } else {
            res.status(200).json({
                data: {
                    recipes: [],
                },
                totalMatch: result.rowCount,
            });
        }
    } catch (err: any) {
        console.log(err);
    }
});

export const deleteRecipe = expressAsyncHandler(async (req, res) => {
    const recipeId = req.params.id;
    try {
        const recipeIngredientDeleteQuery: any = await query(
            "DELETE FROM recipe_ingredient WHERE recipe_id = $1 RETURNING *",
            [recipeId]
        );
        const recipeCommentDeleteQuery: any = await query(
            "DELETE FROM comment WHERE recipe_id=$1 RETURNING *",
            [recipeId]
        );
        const recipeRatingDelete: any = await query(
            "DELETE FROM rating WHERE recipe_id=$1 RETURNING *",
            [recipeId]
        );

        if (
            recipeIngredientDeleteQuery.rowCount > 0 ||
            recipeCommentDeleteQuery.rowCount > 0 ||
            recipeRatingDelete.rowCount > 0
        ) {
            const recipeDeleteQuery = await query(
                "DELETE FROM recipe WHERE recipe_id=$1 RETURNING *",
                [recipeId]
            );

            res.status(202).json({
                status: 202,
                data: [],
                message: "Recipe DELETED!",
                error: null,
            });
        } else {
            res.status(202).json({
                status: 202,
                data: [],
                error: "Can't delete the recipe!",
            });
        }
    } catch (err: any) {
        console.log(err);
    }
});

export const getTotalCalorie = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const result: any = await query(
            "SELECT SUM(ingredient_calories) as totalcalories FROM recipe_ingredient WHERE recipe_id=$1",
            [id]
        );
        if (result.rowCount > 0) {
            res.status(200).json({
                status: 200,
                data: {
                    recipeId: id,
                    totalCalories: result.rows[0].totalcalories,
                },
                error: null,
            });
        } else {
            res.status(200).json({
                status: 200,
                data: {},
                error: "Unable to fetch Calories",
            });
        }
    } catch (err: any) {
        res.status(404).json({
            error: "Recipe not found or Network error!",
            status: 404,
        });
    }
});

export const ungaBunga = expressAsyncHandler(async (req, res) => {
    const { recipeIngredient } = req.body;
    const url = encodeURI(recipeIngredient);
    const api = `https://api.edamam.com/api/nutrition-data?app_id=f956f590&app_key=b63e722a5689bf8eb4ec6b4dbb8a2335&nutrition-type=cooking&ingr=${url}`;
    axios.get(api).then((response) => {
        console.log(response.data);
        res.status(200).json({
            data: response.data.calories,
        });
    });
});
