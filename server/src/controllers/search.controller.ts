import { Recipe, Ingredient } from "../models";
import expressAsyncHandler from "express-async-handler";
import { query } from "../database";

export const search = expressAsyncHandler(async (req, res) => {
    // best matches

    const ids: number[] = req.body.id;
    console.log(req.body);
    console.log(req.query);
    let bestMatch: any[] = [];
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
                    bestMatch.push(obj);
                }
            )
        }
    }

    res.status(200).json({
        data: {
            bestMatch: bestMatch,
        },
    });

})

