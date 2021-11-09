import expressAsyncHandler from "express-async-handler";
import { query } from "../database";

const admin = expressAsyncHandler(async (req, res, next) => {
    let token;
    if (!req.headers.foodieid) {
        console.log(token);
        res.status(401).json({ error: "Not Authorized, no token found" });
    }

    const id: any = req.headers.foodieid;
    const result: any = await query("SELECT * from foodie WHERE foodie_id=$1", [
        id,
    ]);

    if (result && result.rowCount > 0) {
        if (result.rows[0].foodie_is_admin) {
            next();
        } else {
            console.log(result.rows);
            res.status(404).json({
                error: "Restricted area",
            });
        }
    }
});

export { admin };
