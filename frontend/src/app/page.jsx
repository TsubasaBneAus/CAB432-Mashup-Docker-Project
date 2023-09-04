"use client";

import { useState, useEffect } from "react";

const Home = () => {
  const [currentData, setCurrentData] = useState({});
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });

  const [date, setDate] = useState();

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

  const setdate = () => {
    const dateObject = new Date();
    const year = dateObject.getFullYear();
    const month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
    const date = ("0" + dateObject.getDate()).slice(-2);
    const hours = ("0" + dateObject.getHours()).slice(-2);
    const minutes = ("0" + dateObject.getMinutes()).slice(-2);
    const seconds = ("0" + dateObject.getSeconds()).slice(-2);
    const currentDate = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    console.log(currentDate);
    console.log(new Date());
    const date1 = new Date().getTime();
    const date2 = new Date("2023-09-04 19:00:00").getTime();
    if (date1 < date2) {
      setDate("TRUE");
    } else {
      setDate("FALSE");
    }
  };

  useEffect(() => {
    // fetchLocation();
    setdate();
  }, []);

  return (
    <div>
      {/* <h1 className="text-2xl">Fetched Info: {data.name} {data.country}</h1> */}
      <h1 className="text-2xl">
        {/* The current location: ({location.latitude}, {location.longitude}) */}
        {date}
      </h1>
    </div>
  );
};

export default Home;
