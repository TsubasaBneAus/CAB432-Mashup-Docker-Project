"use client";

import { useState, useEffect } from "react";

const Home = () => {
  const [currentData, setCurrentData] = useState([]);
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
      console.log(data);
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

  useEffect(() => {
    fetchLocation();
  }, []);

  // Check if "currentDate" is empty
  if (currentData.length == 0) {
    return (
      <h1 className="text-2xl">
        The current location: ({location.latitude}, {location.longitude})
      </h1>
    );
  } else {
    return (
      <div className="bg-slate-900 h-screen">
        <h1 className="text-2xl mx-auto">
          The current location: ({location.latitude}, {location.longitude})
        </h1>
        <div className="bg-zinc-300 rounded-lg w-11/12 flex justify-center mx-auto">
          <img
            src={`https://openweathermap.org/img/wn/${currentData[0].icon}@2x.png`}
            alt="alternatetext"
          />
          <img
            src={`https://openweathermap.org/img/wn/${currentData[1].icon}@2x.png`}
            alt="alternatetext"
          />
          <img
            src={`https://openweathermap.org/img/wn/${currentData[2].icon}@2x.png`}
            alt="alternatetext"
          />
          <img
            src={`https://openweathermap.org/img/wn/${currentData[3].icon}@2x.png`}
            alt="alternatetext"
          />
          <img
            src={`https://openweathermap.org/img/wn/${currentData[4].icon}@2x.png`}
            alt="alternatetext"
          />
          <img
            src={`https://openweathermap.org/img/wn/${currentData[5].icon}@2x.png`}
            alt="alternatetext"
          />
          <img
            src={`https://openweathermap.org/img/wn/${currentData[6].icon}@2x.png`}
            alt="alternatetext"
          />
          <img
            src={`https://openweathermap.org/img/wn/${currentData[7].icon}@2x.png`}
            alt="alternatetext"
          />
          <img
            src={`https://openweathermap.org/img/wn/${currentData[8].icon}@2x.png`}
            alt="alternatetext"
          />
        </div>
      </div>
    );
  }
};

export default Home;
