import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const PORT = 5000;
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

dotenv.config({
  path: "../.env",
});
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

app.use(express.json());
app.use(cors(corsOptions));

app.post("/getCurrentData", async (req, res) => {

  // Fetch the current weather and forecast
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const currentWeatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`
  )
  const weatherForecastRes = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`
  );
  const currentWeatherData = await currentWeatherRes.json();
  const weatherForecastData = await weatherForecastRes.json();

  // Process forecast data to display 24 hours of data from the time fetched
  const currentDate = new Date();
  let forecastArray = [];
  for (let eachForecast of weatherForecastData.list) {
    const forecastDate = new Date(eachForecast.dt_text);
    
    // Add forecast data to the array if the time of the forecast is after the time fetched
    if (currentDate < forecastDate) {
      forecastArray.push(eachForecast);
      count++;
    }

    // Break if the array has more than 8 forecast data
    if (forecastArray.length >= 8) {
      break;
    }
  }
  // console.log(json);
  // return res.send(JSON.stringify(json.city));
});

app.listen(PORT, () => {
  console.log("App listening on port 5000");
});
