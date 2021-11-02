import { Secret } from "jsonwebtoken";

export const jwtConfig: Secret = process.env.JWT_SECRET ?? "secret";
