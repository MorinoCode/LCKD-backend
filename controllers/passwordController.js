import pool from "../config/db.js";
import CryptoJS from "crypto-js";

export async function createPassword(req, res, next) {
  const { site, username, password } = req.body;
  try {
    const encrypted = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString();
    const result = await pool.query(
      "INSERT INTO passwords (site, username, password, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [site, username, encrypted, req.userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function getPasswords(req, res, next) {
  try {
    const result = await pool.query("SELECT * FROM passwords WHERE user_id = $1", [req.userId]);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}
