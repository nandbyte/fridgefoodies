import { config } from "dotenv";

config();

export default {
    port: process.env.PORT || 3000,
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_DATABASE,
    },
};
