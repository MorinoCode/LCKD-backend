import pool from "../config/db.js";
import CryptoJS from "crypto-js";


export async function createPassword(req, res, next) {
  const { site, username, password } = req.body;

 
  if (!site || !username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
 
    const encrypted = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString();

   
    const result = await pool.query(
      `INSERT INTO passwords (site, username, password, user_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, site, username`,
      [site, username, encrypted, req.userId]
    );

    res.status(201).json({
      message: "Password saved successfully.",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("❌ Error saving password:", err);
    next(err);
  }
}


export async function getPasswords(req, res, next) {
  try {
    const result = await pool.query(
      "SELECT id, site, username, password FROM passwords WHERE user_id = $1",
      [req.userId]
    );


    const decrypted = result.rows.map((row) => ({
      id: row.id,
      site: row.site,
      username: row.username,
      password: CryptoJS.AES.decrypt(row.password, process.env.CRYPTO_SECRET).toString(CryptoJS.enc.Utf8),
    }));

    res.json(decrypted);
  } catch (err) {
    console.error("❌ Error fetching passwords:", err);
    next(err);
  }
}
