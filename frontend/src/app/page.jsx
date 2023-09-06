"use client";

import { useState, useEffect } from "react";

const Home = () => {
  const [currentData, setCurrentData] = useState({
    city: "",
    weather: [],
  });
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });

  // Fetch the current data on weather and news
  const fetchCurrentData = async (latitude, longitude) => {
    try {
      const res = await fetch("http://localhost:5000/getCurrentData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude: latitude,
          longitude: longitude,
        }),
      });
      const data = await res.json();
      setCurrentData(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch user's current location data
  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLocation({
        latitude: latitude,
        longitude: longitude,
      });
      fetchCurrentData(latitude, longitude);
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
    // Check if "currentData" is empty
    if (!currentData) {
      return null;
    } else {
      let weatherArray = [];
      const weather = currentData.weather;
      for (let i = 0; i < weather.length; i++) {
        if (i == 0) {
          weatherArray.push(
            <div className="flex flex-col justify-center">
              <p className="text-2xl font-semibold text-white text-center">
                Now
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${weather[i].icon}@2x.png`}
                alt="weatherIcon"
              />
              <p className="text-2xl font-semibold text-white text-center">
                {Math.round(weather[i].temp)} &#8451;
              </p>
            </div>
          );
        } else {
          weatherArray.push(
            <div className="flex flex-col justify-center">
              <p className="text-2xl font-semibold text-white text-center">
                {extractHours(weather[i].date)}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${weather[i].icon}@2x.png`}
                alt="weatherIcon"
              />
              <p className="text-2xl font-semibold text-white text-center">
                {Math.round(weather[i].temp)} &#8451;
              </p>
            </div>
          );
        }
      }

      return (
        <div className="bg-sky-600 rounded-lg shadow-xl w-full max-w-4xl flex flex-col justify-center mx-auto py-1">
          <h1 className="text-3xl font-semibold text-white text-center">
            Weather in {currentData.city}
          </h1>
          <div className="flex justify-center">{weatherArray}</div>
        </div>
      );
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <div className="bg-emerald-100 h-screen">
      <div className="bg-indigo-800 shadow-xl py-2 mb-5">
        <h1 className="text-4xl font-semibold text-white text-center">
          Today's Dashboard
        </h1>
      </div>
      {displayWeather()}
    </div>
  );
};

export default Home;
