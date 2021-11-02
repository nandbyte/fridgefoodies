import { log } from "./../service/logger";
import { Client, Pool } from "pg";
import config from "../config";

const pool = new Pool(config.db);

export const query = (text: any, params: any[]) => {
    return pool.query(text, params);
};
