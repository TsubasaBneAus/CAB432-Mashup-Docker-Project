import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const PORT = 5000;
const corsOptions = {
  // origin: "http://localhost:3000",
  // credentials: true,
  // optionsSuccessStatus: 200,
};

// Read environmental variables from the .env file
dotenv.config({
  path: "../.env",
});
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

app.use(express.json());
app.use(cors(corsOptions));

app.post("/getDataWithCoords", async (req, res) => {
  // // Fetch the current weather and forecast
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

  //   // Break if the array has more than 9 weather data
  //   if (weatherArray.length >= 9) {
  //     break;
  //   }
  // }

  // Fetch top headlines of the news
  // const topHeadlines = await fetch(
  //   `https://newsapi.org/v2/top-headlines?country=${currentWeatherData.sys.country}&apiKey=${NEWS_API_KEY}`
  // );
  // const topHeadlinesData = await topHeadlines.json();

  // console.log({
  //   city: currentWeatherData.name,
  //   weather: weatherArray,
  // });
  // res.send({
  //   city: currentWeatherData.name,
  //   weather: weatherArray,
  // });

  // For testing
  res.send({
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
    topHeadlines: [
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Sydney Morning Herald",
        title:
          "Australia news LIVE: Marise Payne confirms retirement from politics; PM will visit China later this year - Sydney Morning Herald",
        description: null,
        url: "https://news.google.com/rss/articles/CBMinwFodHRwczovL3d3dy5zbWguY29tLmF1L25hdGlvbmFsL2F1c3RyYWxpYS1uZXdzLWxpdmUtcG0tY29uZmlybXMtdmlzaXQtdG8tY2hpbmEtbGF0ZXItdGhpcy15ZWFyLXByaWNlLXNheXMtdm9pY2UtdGltaW5nLWh1cnRzLXBvc3RhbC12b3RlcnMtMjAyMzA5MDctcDVlMnZ2Lmh0bWzSAZ8BaHR0cHM6Ly9hbXAuc21oLmNvbS5hdS9uYXRpb25hbC9hdXN0cmFsaWEtbmV3cy1saXZlLXBtLWNvbmZpcm1zLXZpc2l0LXRvLWNoaW5hLWxhdGVyLXRoaXMteWVhci1wcmljZS1zYXlzLXZvaWNlLXRpbWluZy1odXJ0cy1wb3N0YWwtdm90ZXJzLTIwMjMwOTA3LXA1ZTJ2di5odG1s?oc=5",
        urlToImage: null,
        publishedAt: "2023-09-08T04:29:03Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Sydney Morning Herald",
        title:
          "Australia news LIVE: Marise Payne confirms retirement from politics; PM will visit China later this year - Sydney Morning Herald",
        description: null,
        url: "https://news.google.com/rss/articles/CBMinwFodHRwczovL3d3dy5zbWguY29tLmF1L25hdGlvbmFsL2F1c3RyYWxpYS1uZXdzLWxpdmUtcG0tY29uZmlybXMtdmlzaXQtdG8tY2hpbmEtbGF0ZXItdGhpcy15ZWFyLXByaWNlLXNheXMtdm9pY2UtdGltaW5nLWh1cnRzLXBvc3RhbC12b3RlcnMtMjAyMzA5MDctcDVlMnZ2Lmh0bWzSAZ8BaHR0cHM6Ly9hbXAuc21oLmNvbS5hdS9uYXRpb25hbC9hdXN0cmFsaWEtbmV3cy1saXZlLXBtLWNvbmZpcm1zLXZpc2l0LXRvLWNoaW5hLWxhdGVyLXRoaXMteWVhci1wcmljZS1zYXlzLXZvaWNlLXRpbWluZy1odXJ0cy1wb3N0YWwtdm90ZXJzLTIwMjMwOTA3LXA1ZTJ2di5odG1s?oc=5",
        urlToImage: null,
        publishedAt: "2023-09-08T04:29:03Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Sydney Morning Herald",
        title:
          "Australia news LIVE: Marise Payne confirms retirement from politics; PM will visit China later this year - Sydney Morning Herald",
        description: null,
        url: "https://news.google.com/rss/articles/CBMinwFodHRwczovL3d3dy5zbWguY29tLmF1L25hdGlvbmFsL2F1c3RyYWxpYS1uZXdzLWxpdmUtcG0tY29uZmlybXMtdmlzaXQtdG8tY2hpbmEtbGF0ZXItdGhpcy15ZWFyLXByaWNlLXNheXMtdm9pY2UtdGltaW5nLWh1cnRzLXBvc3RhbC12b3RlcnMtMjAyMzA5MDctcDVlMnZ2Lmh0bWzSAZ8BaHR0cHM6Ly9hbXAuc21oLmNvbS5hdS9uYXRpb25hbC9hdXN0cmFsaWEtbmV3cy1saXZlLXBtLWNvbmZpcm1zLXZpc2l0LXRvLWNoaW5hLWxhdGVyLXRoaXMteWVhci1wcmljZS1zYXlzLXZvaWNlLXRpbWluZy1odXJ0cy1wb3N0YWwtdm90ZXJzLTIwMjMwOTA3LXA1ZTJ2di5odG1s?oc=5",
        urlToImage: null,
        publishedAt: "2023-09-08T04:29:03Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Sydney Morning Herald",
        title:
          "Australia news LIVE: Marise Payne confirms retirement from politics; PM will visit China later this year - Sydney Morning Herald",
        description: null,
        url: "https://news.google.com/rss/articles/CBMinwFodHRwczovL3d3dy5zbWguY29tLmF1L25hdGlvbmFsL2F1c3RyYWxpYS1uZXdzLWxpdmUtcG0tY29uZmlybXMtdmlzaXQtdG8tY2hpbmEtbGF0ZXItdGhpcy15ZWFyLXByaWNlLXNheXMtdm9pY2UtdGltaW5nLWh1cnRzLXBvc3RhbC12b3RlcnMtMjAyMzA5MDctcDVlMnZ2Lmh0bWzSAZ8BaHR0cHM6Ly9hbXAuc21oLmNvbS5hdS9uYXRpb25hbC9hdXN0cmFsaWEtbmV3cy1saXZlLXBtLWNvbmZpcm1zLXZpc2l0LXRvLWNoaW5hLWxhdGVyLXRoaXMteWVhci1wcmljZS1zYXlzLXZvaWNlLXRpbWluZy1odXJ0cy1wb3N0YWwtdm90ZXJzLTIwMjMwOTA3LXA1ZTJ2di5odG1s?oc=5",
        urlToImage: null,
        publishedAt: "2023-09-08T04:29:03Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Sydney Morning Herald",
        title:
          "Australia news LIVE: Marise Payne confirms retirement from politics; PM will visit China later this year - Sydney Morning Herald",
        description: null,
        url: "https://news.google.com/rss/articles/CBMinwFodHRwczovL3d3dy5zbWguY29tLmF1L25hdGlvbmFsL2F1c3RyYWxpYS1uZXdzLWxpdmUtcG0tY29uZmlybXMtdmlzaXQtdG8tY2hpbmEtbGF0ZXItdGhpcy15ZWFyLXByaWNlLXNheXMtdm9pY2UtdGltaW5nLWh1cnRzLXBvc3RhbC12b3RlcnMtMjAyMzA5MDctcDVlMnZ2Lmh0bWzSAZ8BaHR0cHM6Ly9hbXAuc21oLmNvbS5hdS9uYXRpb25hbC9hdXN0cmFsaWEtbmV3cy1saXZlLXBtLWNvbmZpcm1zLXZpc2l0LXRvLWNoaW5hLWxhdGVyLXRoaXMteWVhci1wcmljZS1zYXlzLXZvaWNlLXRpbWluZy1odXJ0cy1wb3N0YWwtdm90ZXJzLTIwMjMwOTA3LXA1ZTJ2di5odG1s?oc=5",
        urlToImage: null,
        publishedAt: "2023-09-08T04:29:03Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Sydney Morning Herald",
        title:
          "Australia news LIVE: Marise Payne confirms retirement from politics; PM will visit China later this year - Sydney Morning Herald",
        description: null,
        url: "https://news.google.com/rss/articles/CBMinwFodHRwczovL3d3dy5zbWguY29tLmF1L25hdGlvbmFsL2F1c3RyYWxpYS1uZXdzLWxpdmUtcG0tY29uZmlybXMtdmlzaXQtdG8tY2hpbmEtbGF0ZXItdGhpcy15ZWFyLXByaWNlLXNheXMtdm9pY2UtdGltaW5nLWh1cnRzLXBvc3RhbC12b3RlcnMtMjAyMzA5MDctcDVlMnZ2Lmh0bWzSAZ8BaHR0cHM6Ly9hbXAuc21oLmNvbS5hdS9uYXRpb25hbC9hdXN0cmFsaWEtbmV3cy1saXZlLXBtLWNvbmZpcm1zLXZpc2l0LXRvLWNoaW5hLWxhdGVyLXRoaXMteWVhci1wcmljZS1zYXlzLXZvaWNlLXRpbWluZy1odXJ0cy1wb3N0YWwtdm90ZXJzLTIwMjMwOTA3LXA1ZTJ2di5odG1s?oc=5",
        urlToImage: null,
        publishedAt: "2023-09-08T04:29:03Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Sydney Morning Herald",
        title:
          "Australia news LIVE: Marise Payne confirms retirement from politics; PM will visit China later this year - Sydney Morning Herald",
        description: null,
        url: "https://news.google.com/rss/articles/CBMinwFodHRwczovL3d3dy5zbWguY29tLmF1L25hdGlvbmFsL2F1c3RyYWxpYS1uZXdzLWxpdmUtcG0tY29uZmlybXMtdmlzaXQtdG8tY2hpbmEtbGF0ZXItdGhpcy15ZWFyLXByaWNlLXNheXMtdm9pY2UtdGltaW5nLWh1cnRzLXBvc3RhbC12b3RlcnMtMjAyMzA5MDctcDVlMnZ2Lmh0bWzSAZ8BaHR0cHM6Ly9hbXAuc21oLmNvbS5hdS9uYXRpb25hbC9hdXN0cmFsaWEtbmV3cy1saXZlLXBtLWNvbmZpcm1zLXZpc2l0LXRvLWNoaW5hLWxhdGVyLXRoaXMteWVhci1wcmljZS1zYXlzLXZvaWNlLXRpbWluZy1odXJ0cy1wb3N0YWwtdm90ZXJzLTIwMjMwOTA3LXA1ZTJ2di5odG1s?oc=5",
        urlToImage: null,
        publishedAt: "2023-09-08T04:29:03Z",
        content: null,
      },
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Sydney Morning Herald",
        title:
          "Australia news LIVE: Marise Payne confirms retirement from politics; PM will visit China later this year - Sydney Morning Herald",
        description: null,
        url: "https://news.google.com/rss/articles/CBMinwFodHRwczovL3d3dy5zbWguY29tLmF1L25hdGlvbmFsL2F1c3RyYWxpYS1uZXdzLWxpdmUtcG0tY29uZmlybXMtdmlzaXQtdG8tY2hpbmEtbGF0ZXItdGhpcy15ZWFyLXByaWNlLXNheXMtdm9pY2UtdGltaW5nLWh1cnRzLXBvc3RhbC12b3RlcnMtMjAyMzA5MDctcDVlMnZ2Lmh0bWzSAZ8BaHR0cHM6Ly9hbXAuc21oLmNvbS5hdS9uYXRpb25hbC9hdXN0cmFsaWEtbmV3cy1saXZlLXBtLWNvbmZpcm1zLXZpc2l0LXRvLWNoaW5hLWxhdGVyLXRoaXMteWVhci1wcmljZS1zYXlzLXZvaWNlLXRpbWluZy1odXJ0cy1wb3N0YWwtdm90ZXJzLTIwMjMwOTA3LXA1ZTJ2di5odG1s?oc=5",
        urlToImage: null,
        publishedAt: "2023-09-08T04:29:03Z",
        content: null,
      },
    ],
  });
});

app.post("/getDataWithCityName", async (req, res) => {
  // // Fetch the current weather and forecast
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

  //   // Break if the array has more than 9 weather data
  //   if (weatherArray.length >= 9) {
  //     break;
  //   }
  // }

  // // Fetch top headlines of the news
  // const topHeadlines = await fetch(
  //   `https://newsapi.org/v2/top-headlines?country=${currentWeatherData.sys.country}&apiKey=${NEWS_API_KEY}`
  // );
  // const topHeadlinesData = await topHeadlines.json();

  // For testing
  res.send({
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
    topHeadlines: [
      {
        source: {
          id: "google-news",
          name: "Google News",
        },
        author: "Sydney Morning Herald",
        title:
          "Australia news LIVE: Marise Payne confirms retirement from politics; PM will visit China later this year - Sydney Morning Herald",
        description: null,
        url: "https://news.google.com/rss/articles/CBMinwFodHRwczovL3d3dy5zbWguY29tLmF1L25hdGlvbmFsL2F1c3RyYWxpYS1uZXdzLWxpdmUtcG0tY29uZmlybXMtdmlzaXQtdG8tY2hpbmEtbGF0ZXItdGhpcy15ZWFyLXByaWNlLXNheXMtdm9pY2UtdGltaW5nLWh1cnRzLXBvc3RhbC12b3RlcnMtMjAyMzA5MDctcDVlMnZ2Lmh0bWzSAZ8BaHR0cHM6Ly9hbXAuc21oLmNvbS5hdS9uYXRpb25hbC9hdXN0cmFsaWEtbmV3cy1saXZlLXBtLWNvbmZpcm1zLXZpc2l0LXRvLWNoaW5hLWxhdGVyLXRoaXMteWVhci1wcmljZS1zYXlzLXZvaWNlLXRpbWluZy1odXJ0cy1wb3N0YWwtdm90ZXJzLTIwMjMwOTA3LXA1ZTJ2di5odG1s?oc=5",
        urlToImage: null,
        publishedAt: "2023-09-08T04:29:03Z",
        content: null,
      },
    ],
  });

  // res.send(
  //  {
  //     city: currentWeatherData.name,
  //     weather: weatherArray,
  //     topHeadlines: topHeadlinesData.articles,
  //   }
  // );
});

app.get("/getYouTubeVideos", async (req, res) => {
  const newsTitle = req.body.newsTitle;
  const youtubeVideosRes = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${newsTitle}key=${YOUTUBE_API_KEY}`
  );
  const youtubeVideosData = await youtubeVideosRes.json()
  res.send();
});

app.listen(PORT, () => {
  console.log("App listening on port 5000");
});
