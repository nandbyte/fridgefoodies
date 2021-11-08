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
    if (req.query.filter === 'best') {
        for (const id of ids) {
            const current: any = await query(`SELECT *
            FROM recipe 
            WHERE recipe_id in (
                SELECT recipe_id FROM recipe_ingredient
                WHERE ingredient_id=$1
            )
            `,
                [id]);
            if (current.rowCount > 0) {
                current.rows.forEach(
                    (obj: any) => {
                        bestMatch.push({
                            foodieId: obj.foodie_id,
                            recipeId: obj.recipe_id,
                            recipeTitle: obj.recipe_title,
                            recipeImage: obj.recipe_image,
                            recipeText: obj.recipe_text
                        });
                    }
                )
            }
        }
        console.log(bestMatch);
        res.status(200).json({
            data: {
                recipes: bestMatch,
            },
        });
    } else {
        let base = "SELECT recipe.* from recipe,recipe_ingredient WHERE recipe.recipe_id = recipe_ingredient.recipe_id "

        const len_ids = ids.length;
        const str: string[] = [];
        for (let i = 0; i < len_ids; i++) {
            let substr = "";

            for (let j = 0; j < i + 1; j++) {
                substr += ` AND recipe_ingredient.ingredient_id=${ids[j]}`;
            }
            str.push(base+substr);
        }
        var finalResult:any[] =[];
        for(let i=0;i<str.length;i++){
            const result:any = await query(str[i],[]);
            finalResult.push(result.rows);
        }
        res.status(200).json({
            data: [finalResult],
        })
    }

})

