import expressAsyncHandler from "express-async-handler"
import { query } from "../database"

const admin = expressAsyncHandler(async (req, res, next) => {
    const id: any = req.body.foodieId;
    const result: any = await query("SELECT * from foodie WHERE foodie_id=$1", [id]);

    if(result && result.rowCount>0){
        if(result.rows[0].foodie_is_admin){
            next();
        }else{
            res.status(404).json({
                error: "Restricted area",
            })
        }
    }
})

export {admin};