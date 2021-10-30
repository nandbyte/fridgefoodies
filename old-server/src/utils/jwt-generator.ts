import { jwtConfig } from "./utils.config";
import jwt from "jsonwebtoken";

const jwtGenerator = (userId: string) => {
    const payload = {
        user: userId,
    };

    jwt.sign(payload, jwtConfig, { expiresIn: "1hr" });
};

export default jwtGenerator;
