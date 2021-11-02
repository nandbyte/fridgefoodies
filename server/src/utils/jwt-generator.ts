import { jwtConfig } from "./utils.config";
import jwt from "jsonwebtoken";

const jwtGenerator = (userId: string) => {
    const payload = {
        user: userId,
    };

    return jwt.sign(payload, jwtConfig, { expiresIn: "30d" });
};

export default jwtGenerator;
