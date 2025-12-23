import dotenv from "dotenv";
const key = process.env.GEMINI_API_KEY || "";
console.log(`Key length is: ${key.trim().length} characters`);
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Fix path for .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

app.use(cors());
app.use(express.json());

const apiKey = "AIzaSyCjpq89dSIYJJdrD6y3V1GRXWemTNcJKCU";
const genAI = new GoogleGenerativeAI(apiKey);

console.log("--- DEBUGGING KEY ---");
console.log("Key starts with:", apiKey.substring(0, 6));
console.log("Key length is:", apiKey.length);
console.log("----------------------");

// API Route
app.post("/api/gemini", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("Received from user:", prompt);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("AI successfully generated a response.");
    res.json({ response: text });
  } catch (error) {
    console.error(" Google API Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, "127.0.0.1", () => {
  console.log("-----------------------------------------");
  console.log(`Server running at http://127.0.0.1:${PORT}`);
  console.log(`Key loaded: ${process.env.GEMINI_API_KEY ? "YES" : "NO"}`);
  console.log("-----------------------------------------");
});
