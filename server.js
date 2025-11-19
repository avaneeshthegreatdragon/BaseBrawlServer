import express from "express";
import cors from "cors";
import { signup, login } from "./auth.js";

const app = express();
app.use(cors());
app.use(express.json());

// signup route
app.post("/api/signup", signup);

// login route
app.post("/api/login", login);

// Test route
app.get("/", (req, res) => {
    res.send("Base Brawl Online Server Running!");
});

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
