import { Recipe, Ingredient } from "../models";
import expressAsyncHandler from "express-async-handler";
import { query } from "../database";

export const search = expressAsyncHandler(async (req, res) => {
    // best matches

    const ids: number[] = req.body.id;
    const order = req.query.order;
    console.log(req.body);
    console.log(req.query);
    let bestMatch: any[] = [];
    let bestMatchMapped: any[] = [];
    if (req.query.filter === "best") {
        for (const id of ids) {
            const current: any = await query(
                `SELECT *
            FROM recipe 
            WHERE recipe_id in (
                SELECT recipe_id FROM recipe_ingredient
                WHERE ingredient_id=$1
            )
            `,
                [id]
            );
            if (current.rowCount > 0) {
                current.rows.forEach((obj: any) => {
                    bestMatch.push({
                        foodieId: obj.foodie_id,
                        recipeId: obj.recipe_id,
                        recipeTitle: obj.recipe_title,
                        recipeImage: obj.recipe_image,
                        recipeText: obj.recipe_text,
                    });
                });
                const _ids = bestMatch.map((obj) => obj.recipeId);
                bestMatchMapped = bestMatch.filter(
                    ({ recipeId }, index) => !_ids.includes(recipeId, index + 1)
                );
            }
        }
        console.log(bestMatch);
        res.status(200).json({
            data: {
                recipes: bestMatchMapped,
            },
        });
    } else if (req.query.filter === "bounded") {
        let baseQuery = `SELECT recipe.*,counter_table.total_ingredient as total_ingredient
        from recipe,recipe_ingredient,
            (SELECT COUNT(*) as total_ingredient, recipe_id
            from recipe_ingredient group by recipe_id) 
        as counter_table
            WHERE recipe.recipe_id = recipe_ingredient.recipe_id AND recipe.recipe_id = counter_table.recipe_id `;

        const ingredientCount = ids.length;
        const str: string[] = [];
        for (let i = 0; i < ingredientCount; i++) {
            let subQuery = "";

            for (let j = 0; j < i + 1; j++) {
                subQuery += ` AND recipe_ingredient.ingredient_id=${ids[j]}`;
            }

            str.push(baseQuery + subQuery);
        }

        for (let i = 0; i < str.length; i++) {
            const result: any = await query(str[i], []);
            result.rows.forEach((recipe: any) => {
                if (recipe.total_ingredient == ids.length) {
                    bestMatch.push({
                        foodieId: recipe.foodie_id,
                        recipeId: recipe.recipe_id,
                        recipeTitle: recipe.recipe_title,
                        recipeImage: recipe.recipe_image,
                        recipeText: recipe.recipe_text,
                    });
                }
            });
        }
        console.log(bestMatch);

        const _ids = bestMatch.map((obj) => obj.recipeId);
        bestMatchMapped = bestMatch.filter(
            ({ recipeId }, index) => !_ids.includes(recipeId, index + 1)
        );

        res.status(200).json({
            data: {
                recipes: bestMatchMapped,
            },
        });
    }
});
