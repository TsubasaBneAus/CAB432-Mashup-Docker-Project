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

app.post("/getDataWithCoords", async (req, res) => {
  // Fetch the current weather and forecast
  // const latitude = req.body.latitude;
  // const longitude = req.body.longitude;
  // const currentWeatherRes = await fetch(
  //   `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
  // );
  // const forecastRes = await fetch(
  //   `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
  // );
  // const currentWeatherData = await currentWeatherRes.json();
  // const forecastData = await forecastRes.json();

  // // Process the current weather
  // const currentDate = new Date();
  // let weatherArray = [];
  // weatherArray.push({
  //   weather: currentWeatherData.weather[0].main,
  //   icon: currentWeatherData.weather[0].icon,
  //   temp: currentWeatherData.main.temp,
  //   date: currentDate,
  // });

  // // Process the forecast data to display 24 hours of data from the time fetched
  // for (let eachForecast of forecastData.list) {
  //   const forecastDate = new Date(eachForecast.dt_txt);

  //   // Add forecast data to the array if the time of the forecast is after the time fetched
  //   if (currentDate < forecastDate) {
  //     weatherArray.push({
  //       weather: eachForecast.weather[0].main,
  //       icon: eachForecast.weather[0].icon,
  //       temp: eachForecast.main.temp,
  //       date: forecastDate,
  //     });
  //   }

  //   // Break if the array has more than 8 weather data
  //   if (weatherArray.length >= 8) {
  //     break;
  //   }
  // }

  // Fetch top headlines of the news
  // const topHeadlines = await fetch(
  //   `https://newsapi.org/v2/top-headlines?country=${currentWeatherData.sys.country}&apiKey=${NEWS_API_KEY}`
  // );
  // const topHeadlinesData = topHeadlines.json();

  // console.log(JSON.stringify({
  //   city: currentWeatherData.name,
  //   weather: weatherArray,
  // }));
  // res.send(JSON.stringify({
  //   city: currentWeatherData.name,
  //   weather: weatherArray,
  // }));

  // For testing
  res.send(
    JSON.stringify({
      city: "Brisbane",
      weather: [
        {
          weather: "Clouds",
          icon: "02n",
          temp: "19.4",
          date: "2023-09-07T12:11:45.740Z",
        },
      ],
    })
  );
  // return res.send(
  //   JSON.stringify({
  //     weather: weatherArray,
  //     topHeadlines: topHeadlinesData.articles,
  //   })
  // );
});

app.post("/getDataWithCityName", async (req, res) => {
  // Fetch the current weather and forecast
  // const cityName = req.body.cityName;
  // const currentWeatherRes = await fetch(
  //   `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`
  // );
  // const forecastRes = await fetch(
  //   `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`
  // );
  // const currentWeatherData = await currentWeatherRes.json();
  // const forecastData = await forecastRes.json();

  // // Process the current weather
  // const currentDate = new Date();
  // let weatherArray = [];
  // weatherArray.push({
  //   weather: currentWeatherData.weather[0].main,
  //   icon: currentWeatherData.weather[0].icon,
  //   temp: currentWeatherData.main.temp,
  //   date: currentDate,
  // });

  // // Process the forecast data to display 24 hours of data from the time fetched
  // for (let eachForecast of forecastData.list) {
  //   const forecastDate = new Date(eachForecast.dt_txt);

  //   // Add forecast data to the array if the time of the forecast is after the time fetched
  //   if (currentDate < forecastDate) {
  //     weatherArray.push({
  //       weather: eachForecast.weather[0].main,
  //       icon: eachForecast.weather[0].icon,
  //       temp: eachForecast.main.temp,
  //       date: forecastDate,
  //     });
  //   }

  //   // Break if the array has more than 8 weather data
  //   if (weatherArray.length >= 8) {
  //     break;
  //   }
  // }

  // Fetch top headlines of the news
  // const topHeadlines = await fetch(
  //   `https://newsapi.org/v2/top-headlines?country=${currentWeatherData.sys.country}&apiKey=${NEWS_API_KEY}`
  // );
  // const topHeadlinesData = topHeadlines.json();

  // console.log(JSON.stringify({
  //   city: currentWeatherData.name,
  //   weather: weatherArray,
  // }));
  // res.send(JSON.stringify({
  //   city: currentWeatherData.name,
  //   weather: weatherArray,
  // }));

  // For testing
  res.send(
    JSON.stringify({
      city: "Brisbane",
      weather: [
        {
          weather: "Clouds",
          icon: "02n",
          temp: "19.4",
          date: "2023-09-07T12:11:45.740Z",
        },
        {
          weather: "Clouds",
          icon: "02n",
          temp: "19.4",
          date: "2023-09-07T12:11:45.740Z",
        },
      ],
    })
  );
  // return res.send(
  //   JSON.stringify({
  //     weather: weatherArray,
  //     topHeadlines: topHeadlinesData.articles,
  //   })
  // );
});

app.listen(PORT, () => {
  console.log("App listening on port 5000");
});
