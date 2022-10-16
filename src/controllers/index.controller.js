import { Router } from "express";
import { pool } from "../db.js";
const router = Router();

export const ping = async(req, res) => {
    const [result] = await pool.query('SELECT 1 + 1 AS result')
    res.json(result)
 }


export default router;