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

export const searchByCalorie = expressAsyncHandler(async (req, res) => {
    const min = req.query.min;
    const max = req.query.max;

    const order = req.query.sort == "rating"? "total_rating":"total_calorie";
    const sort = req.query.order;

    console.log(min,max,order,sort);

    const queryString = `SELECT 
            recipe.recipe_id as recipe_id,
            recipe.recipe_title as recipe_title,
            recipe.recipe_image as recipe_image,
            calorie_counter.calorie as total_calorie,
            totalRating.total_rating as total_rating
            from recipe, (
                SELECT sum(ingredient_calories) as calorie,recipe_id
                FROM recipe_ingredient
                GROUP BY recipe_id
            ) as calorie_counter,
            (   SELECT COUNT(*) as total_rating, recipe_id
                FROM rating
                GROUP BY recipe_id
                ) as totalRating
            WHERE calorie_counter.recipe_id = recipe.recipe_id 
                    AND recipe.recipe_id = totalRating.recipe_id
                    AND calorie_counter.calorie > ${min}
                    AND calorie_counter.calorie <${max}
            ORDER BY ${order} ${sort}        
            `
    try{
        const result:any = await query(queryString,[]);
        if(result.rowCount>0){
            const mappedData = result.rows.map(
                (obj:any)=>{
                    return{
                        recipeId: obj.recipe_id,
                        recipeTitle: obj.recipe_title,
                        recipeImage: obj.recipe_image,
                        totalCalorie: obj.total_calorie,
                        totalRating: obj.total_rating
                    }
                }
            )
            res.status(200).json(
                { 
                    status: 200,
                    data: mappedData,
                    error: null,
                },
            )
        }else{
            res.status(200).json({
                status: 200,
                data:[],
                error:"No recipe found for the given calorie range"
            })
        }
    }catch(err:any){
        console.log(err);
    }
})