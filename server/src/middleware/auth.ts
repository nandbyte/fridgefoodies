import jwt from "jsonwebtoken";
import { Foodie } from "../models";
import expressAsyncHandler from "express-async-handler";
import { jwtConfig } from "../utils/utils.config";
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == 'Bearer') {
        token = req.headers.authorization.split(" ")[1];
        try {
            const decoded = jwt.verify(token, "secret");
            
            if(decoded !== req.params.userId){
                return res.json({status:500,msg:"Unauthorized access will not be granted."});
            }
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not Authorized, token failed');
        }
        if (!token) {
            console.log(token);
            res.status(401);
            throw new Error('Not Authorized, no token');
        }
        next();
    }
};

export {protect};