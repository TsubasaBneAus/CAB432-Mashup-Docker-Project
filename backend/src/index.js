import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

const app = express();
const PORT = 5000;
const corsOptions = {
  credentials: true,
};
const prisma = new PrismaClient();

// Read environmental variables from the .env file
dotenv.config({
  path: "../.env",
});
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

app.use(express.json());
app.use(cors(corsOptions));

app.get("/getNumberOfVisits", async (req, res) => {
  try {
    // Fetch the current number of page counts
    const currentData = await prisma.pageCount.findUnique({
      where: {
        id: 1,
      },
    });

    // Create data newly if the data does not exit,
    // otherwise update data
    let updatedData;
    if (currentData == null) {
      updatedData = await prisma.pageCount.create({
        data: {
          pageCount: 1,
        },
      });
    } else {
      updatedData = await prisma.pageCount.update({
        where: {
          id: 1,
        },
        data: {
          pageCount: currentData.pageCount + 1,
        },
      });
    }
    res.send(updatedData);
  } catch (err) {
    console.log(err);
    res.send({
      id: 1,
      pageCount: -1,
    });
  }
});

app.post("/getDataAtFirst", async (req, res) => {
  try {
    // Fetch the current weather and forecast in Brisbane
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const currentWeatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const currentWeatherData = await currentWeatherRes.json();
    const forecastData = await forecastRes.json();

    // Process the current weather
    const currentDate = new Date();
    let weatherArray = [];
    weatherArray.push({
      weather: currentWeatherData.weather[0].main,
      icon: currentWeatherData.weather[0].icon,
      temp: currentWeatherData.main.temp,
      date: currentDate,
    });

    // Process the forecast data to display 24 hours of data from the time fetched
    for (let eachForecast of forecastData.list) {
      const forecastDate = new Date(eachForecast.dt_txt);

      // Add forecast data to the array if the time of the forecast is after the time fetched
      if (currentDate < forecastDate) {
        weatherArray.push({
          weather: eachForecast.weather[0].main,
          icon: eachForecast.weather[0].icon,
          temp: eachForecast.main.temp,
          date: forecastDate,
        });
      }

      // Break if the array has more than 9 weather data
      if (weatherArray.length >= 9) {
        break;
      }
    }

    // Fetch 100 top headlines of the news
    const topHeadlines = await fetch(
      `https://newsapi.org/v2/top-headlines?pageSize=100&country=${currentWeatherData.sys.country}&apiKey=${NEWS_API_KEY}`
    );
    const topHeadlinesData = await topHeadlines.json();

    res.send({
      city: currentWeatherData.name,
      weather: weatherArray,
      topHeadlines: topHeadlinesData.articles,
    });
  } catch (err) {
    console.log(err);
    res.send({
      city: "failed",
      weather: [],
      topHeadlines: [],
    });
  }
});

app.post("/getDataWithCityName", async (req, res) => {
  try {
    // Fetch the current weather and forecast
    const cityName = req.body.cityName;
    const currentWeatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const currentWeatherData = await currentWeatherRes.json();
    const forecastData = await forecastRes.json();

    // Process the current weather
    const currentDate = new Date();
    let weatherArray = [];
    weatherArray.push({
      weather: currentWeatherData.weather[0].main,
      icon: currentWeatherData.weather[0].icon,
      temp: currentWeatherData.main.temp,
      date: currentDate,
    });

    // Process the forecast data to display 24 hours of data from the time fetched
    for (let eachForecast of forecastData.list) {
      const forecastDate = new Date(eachForecast.dt_txt);

      // Add forecast data to the array if the time of the forecast is after the time fetched
      if (currentDate < forecastDate) {
        weatherArray.push({
          weather: eachForecast.weather[0].main,
          icon: eachForecast.weather[0].icon,
          temp: eachForecast.main.temp,
          date: forecastDate,
        });
      }

      // Break if the array has more than 9 weather data
      if (weatherArray.length >= 9) {
        break;
      }
    }

    // Fetch 100 top headlines of the news
    const topHeadlines = await fetch(
      `https://newsapi.org/v2/top-headlines?pageSize=100&country=${currentWeatherData.sys.country}&apiKey=${NEWS_API_KEY}`
    );
    const topHeadlinesData = await topHeadlines.json();

    res.send({
      city: currentWeatherData.name,
      weather: weatherArray,
      topHeadlines: topHeadlinesData.articles,
    });
  } catch (err) {
    console.log(err);
    res.send({
      city: "failed",
      weather: [],
      topHeadlines: [],
    });
  }
});

app.post("/getYouTubeVideos", async (req, res) => {
  try {
    // Make the news title shorter for calling YouTube API
    const newsTitle = req.body.newsTitle;
    const indexOfDash = newsTitle.lastIndexOf("-");
    let modifiedText;
    if (indexOfDash !== -1) {
      modifiedText = newsTitle.substring(0, indexOfDash);
    } else {
      modifiedText = newsTitle;
    }
  
    // Fetch up to 50 YouTube Videos related to the news title
    const youtubeVideosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&q=${modifiedText}&key=${YOUTUBE_API_KEY}`
    );
    const youtubeVideosData = await youtubeVideosRes.json();
  
    res.send(youtubeVideosData.items);
  } catch (err) {
    console.log(err);
    res.send(["error"]);
  }
});

app.listen(PORT, () => {
  console.log("App listening on port 5000");
});
