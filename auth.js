import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { users } from "./db.js";

const SECRET = "SUPERSECRET_KEY_CHANGE_THIS"; // Change this later!

export function signup(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.json({ ok: false, msg: "All fields required" });
    }

    // Check if username exists
    if (users.find(u => u.username === username)) {
        return res.json({ ok: false, msg: "Username already taken" });
    }

    const hashed = bcrypt.hashSync(password, 10);

    const user = { username, email, password: hashed };
    users.push(user);

    const token = jwt.sign({ username }, SECRET);

    res.json({
        ok: true,
        token,
        user: { username, email }
    });
}

export function login(req, res) {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.json({ ok: false, msg: "User not found" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
        return res.json({ ok: false, msg: "Password incorrect" });
    }

    const token = jwt.sign({ username }, SECRET);

    res.json({
        ok: true,
        token,
        user: { username, email: user.email }
    });
}
