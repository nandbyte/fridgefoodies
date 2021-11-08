import jwt from "jsonwebtoken";

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
            console.log("Creds: ",decoded.user,req.body.foodieId );
            if (decoded.user != req.headers.foodie) {
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