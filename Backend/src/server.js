// const express = require("express");
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./Routes/notesRoutes.js";
import { connectDB } from "./Config/db.js";
import rateLimiter from "./middleware/ratelimiter.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

if(process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173",
    }));
}

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"../Frontend/dist")));

    app.get("*",(req, res) => {
    res.sendFile(path.join(__dirname, "..Frontend", "dist", "index.html"));
})
}



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on Port:", PORT);
    });
});

// mongodb+srv://rishikumarxyx:XQRx4NTrKL4AcjWq@cluster0.j7tuxf3.mongodb.net/notes_db?retryWrites=true&w=majority&appName=Cluster0