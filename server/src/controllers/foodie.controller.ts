import expressAsyncHandler from "express-async-handler";
import { Pool } from "pg";
import { Foodie } from "../models";
import { query } from "../database";
import jwtGenerator from "../utils/jwt-generator";


export const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists: any = await query("SELECT * FROM foodie WHERE foodie_email=$1", [email]);
    console.log(userExists);

    if (userExists.rowCount !== 0) {
        res.status(400);
        throw new Error("User Already Exists");
    }

    try {
        const newUser: any = await query("INSERT INTO foodie (foodie_name, foodie_email, foodie_password) VALUES($1,$2,$3)", [name, email, password]);
        const searched: any = await query("SELECT * FROM foodie WHERE foodie_email=$1", [email]);
        const token = jwtGenerator(searched.rows[0].foodie_id);
        console.log(token);
        res.status(200).json({
            status: 200,
            data: {
                foodie: searched.rows[0],
                token: token
            },
            error: ""
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
            res.status(200).json({
                status: 200,
                data: {
                    foodie: userExists.rows[0],
                    token: jwtGenerator(userExists.rows[0].foodie_id)
                },
                error: ""
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