const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
require("dotenv").config({path: "./.env"});

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;
console.log("API Key: ", process.env.API_KEY);

app.get("/weather", async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch weather data" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
