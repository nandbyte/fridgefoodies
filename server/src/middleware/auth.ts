import jwt from "jsonwebtoken";
import { Foodie } from "../models";
import expressAsyncHandler from "express-async-handler";
import { jwtConfig } from "../utils/utils.config";
import express from 'express';
const protect = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let token;
    if (!req.headers.authorization) {
        console.log(token);
        res.status(401).json({ error: "Not Authorized, no token found" });
        throw new Error('Not Authorized, no token');
    }
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == 'Bearer') {
        token = req.headers.authorization.split(" ")[1];
        console.log(token);
        try {
            const decoded: any = jwt.verify(token, "secret");
            if (decoded.user != req.body.foodieID) {
                return res.json({ status: 500, msg: "Unauthorized access will not be granted." });
            }
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not Authorized, token failed');
        }
        next();
    }
};

export { protect };