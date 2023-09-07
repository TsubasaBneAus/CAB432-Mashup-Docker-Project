"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";

const Home = () => {
  const [currentData, setCurrentData] = useState({
    city: null,
    weather: [],
  });

  // Fetch the current data on weather and news based on the user's location
  const fetchDataWithCoords = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const res = await fetch("http://localhost:5000/getCurrentData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        });
        const data = await res.json();
        setCurrentData(data);
      } catch (err) {
        console.log(err);
      }
    });
  };

  // Extract hours data from the Date object
  const extractHours = (weatherDate) => {
    const date = new Date(weatherDate);
    const extractedHours = date.toLocaleTimeString([], {
      hour: "2-digit",
    });
    return extractedHours;
  };

  // Display the information of the current weather and forecast
  const displayWeather = () => {
    let weatherArray = [];
    const weather = currentData.weather;
    for (let i = 0; i < weather.length; i++) {
      if (i == 0) {
        weatherArray.push(
          <div className="flex flex-col justify-center">
            <p className="text-center text-2xl font-semibold text-white">Now</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather[i].icon}@2x.png`}
              alt="weatherIcon"
            />
            <p className="text-center text-2xl font-semibold text-white">
              {Math.round(weather[i].temp)} &#8451;
            </p>
          </div>,
        );
      } else {
        weatherArray.push(
          <div className="flex flex-col justify-center">
            <p className="text-center text-2xl font-semibold text-white">
              {extractHours(weather[i].date)}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${weather[i].icon}@2x.png`}
              alt="weatherIcon"
            />
            <p className="text-center text-2xl font-semibold text-white">
              {Math.round(weather[i].temp)} &#8451;
            </p>
          </div>,
        );
      }
    }

    return (
      <div className="mx-auto flex w-full max-w-4xl flex-col justify-center rounded-lg bg-sky-600 py-1 shadow-xl">
        <h1 className="text-center text-3xl font-semibold text-white">
          Weather in {currentData.city}
        </h1>
        <div className="flex justify-center">{weatherArray}</div>
      </div>
    );
  };

  useEffect(() => {
    fetchDataWithCoords();
  }, []);

  // Check if the app is loading
  if (currentData.city == null) {
    return (
      <div>
        <div className="fixed z-10 flex h-screen w-screen items-center justify-center text-white">
          <CircularProgress color="inherit" size={100} />
        </div>
        <div className="blur-sm brightness-50 backdrop-blur-sm">
          <div className="flex h-screen flex-col bg-emerald-100">
            <Header />
            <main className="grow" />
            <Footer />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex h-screen flex-col bg-emerald-100">
        <Header />
        <main className="grow">{displayWeather()}</main>
        <Footer />
      </div>
    );
  }
};

export default Home;
