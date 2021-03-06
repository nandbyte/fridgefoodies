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
        const newUser: any = await query("INSERT INTO foodie (foodie_name, foodie_email, foodie_password, foodie_is_admin) VALUES($1,$2,$3,false)", [name, email, password]);
        const searched: any = await query("SELECT * FROM foodie WHERE foodie_email=$1", [email]);
        const user: Foodie = {
            foodieId: searched.rows[0].foodie_id,
            foodieEmail: searched.rows[0].foodie_email,
            foodieName: searched.rows[0].foodie_name,
            isAdmin: searched.rows[0].foodie_is_admin
        }

        res.status(200).json({
            status: 200,
            data: {
                foodie: user
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
                isAdmin: userExists.rows[0].foodie_is_admin
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

export const foodieDetails = expressAsyncHandler(async(req,res)=>{
    const {foodieid,authorization} = req.headers;
    console.log(req.headers);
    try{
        const result:any = await query("SELECT * FROM foodie WHERE foodie_id=$1",[foodieid]);
        if(result.rowCount>0){
            res.status(200).json({
                status: 200,
                data:{
                    foodie:{
                        foodieId: foodieid,
                        foodieName: result.rows[0].foodie_name,
                        foodieEmail: result.rows[0].foodie_email,
                        isAdmin: result.rows[0].foodie_is_admin
                    }
                }
            })
        }
    }catch(err:any){
        console.log(err);
    }
})