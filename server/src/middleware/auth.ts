import jwt from "jsonwebtoken";
import { Foodie } from "../models";
import expressAsyncHandler from "express-async-handler";
import { jwtConfig } from "../utils/utils.config";
const protect = expressAsyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == 'Bearer') {
        token = req.headers.authorization.split(" ")[1];
        try {
            const decoded = jwt.verify(token, jwtConfig);
            req.foodieId = decoded.id;
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
});

export {protect};