import expressAsyncHandler from "express-async-handler";
import { Foodie } from "../models";
import { query } from "../database";
import jwtGenerator from "../utils/jwt-generator";


export const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    
    const userExists: any = await query("SELECT * FROM foodie WHERE foodie_email=$1", [email]);
    if (userExists.rowCount !== 0) {
        res.status(400);
        throw new Error("User Already Exists");
    }

    try {
        const newUser: any = await query("INSERT INTO foodie (foodie_name, foodie_email, foodie_password) VALUES($1,$2,$3)", [name, email, password]);
        const searched: any = await query("SELECT * FROM foodie WHERE foodie_email=$1", [email]);
        const user: Foodie = {
            foodieId: searched.rows[0].foodie_id,
            foodieEmail: searched.rows[0].foodie_email,
            foodieName: searched.rows[0].foodie_name,
        }

        const token = jwtGenerator(searched.rows[0].foodie_id);
        console.log(token);
        res.status(200).json({
            status: 200,
            data: {
                foodie: user,
                token: token
            },
            error: null
        })

    } catch (err) {
        console.log(err);
    }

})

export const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const userExists: any = await query("SELECT * FROM foodie WHERE foodie_email=$1", [email]);

    if (userExists.rowCount === 0) {
        res.status(404).json({
            status: 400,
            data: {},
            error: "User not found",
        });
    } else {
        if (userExists.rows[0].foodie_password === password) {

            const user: Foodie = {
                foodieId: userExists.rows[0].foodie_id,
                foodieEmail: userExists.rows[0].foodie_email,
                foodieName: userExists.rows[0].foodie_name,
            }

            res.status(200).json({
                status: 200,
                data: {
                    foodie: user,
                    token: jwtGenerator(userExists.rows[0].foodie_id)
                },
                error: null
            })
        } else {
            res.status(401).json({
                status: 401,
                data: {},
                error: "Incorrect email or password",
            });
        }
    }
})