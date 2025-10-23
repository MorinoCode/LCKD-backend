import pool from "../config/db.js";
import bcrypt from "bcrypt";


export async function getUserProfile(req, res, next) {
  try {
    const result = await pool.query("SELECT id, username FROM users WHERE id = $1", [
      req.userId,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}


export async function updateUserProfile(req, res, next) {
  const { username, password } = req.body;

  try {
    
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const query = `
      UPDATE users 
      SET username = COALESCE($1, username),
          password = COALESCE($2, password)
      WHERE id = $3
      RETURNING id, username;
    `;

    const values = [username || null, hashedPassword || null, req.userId];
    const result = await pool.query(query, values);

    res.json({ message: "Profile updated", user: result.rows[0] });
  } catch (err) {
    next(err);
  }
}


export async function deleteUser(req, res, next) {
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [req.userId]);
    res.json({ message: "User account deleted successfully" });
  } catch (err) {
    next(err);
  }
}
