import { Recipe, Ingredient } from "../models";
import expressAsyncHandler from "express-async-handler";
import { query } from "../database";

export const search = expressAsyncHandler(async (req, res) => {
    // best matches

    const ids: number[] = req.body.id;
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
            )`, [id]);
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
    }else{
        var allRecipe:any[];
        for(var i=0;i<req.body.id.length;i++){
            
        }
    }

})

