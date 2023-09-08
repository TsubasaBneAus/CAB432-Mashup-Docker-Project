"use client";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Footer from "../components/footer";
import Header from "../components/header";
import CardComponent from "../components/card";
import { useEffect, useState } from "react";

const Home = () => {
  const [currentData, setCurrentData] = useState({
    city: null,
    weather: [],
  });
  const [cityName, setCityName] = useState("");
  const [modalState, setModalState] = useState(false);

  // Fetch the current data on weather and news based on the user's location
  const fetchDataWithCoords = () => {
    // Set null to "city" to implement a loading page at first
    setCurrentData({
      city: null,
      weather: [],
    });

    // Send a POST request to the API server
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const res = await fetch("http://localhost:5000/getDataWithCoords", {
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
        console.log(data);
        setCurrentData(data);
      } catch (err) {
        console.log(err);
      }
    });
  };

  // Fetch the current data on weather and news based on the city a user entered
  const fetchDataWithCityName = async () => {
    // Set null to "city" to implement a loading page at first
    setCurrentData({
      city: null,
      weather: [],
    });

    // Send a POST request to the API server
    try {
      const res = await fetch("http://localhost:5000/getDataWithCityName", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cityName: cityName,
        }),
      });
      const data = await res.json();
      console.log(data);
      setCurrentData(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Handle the submission event of the button in the modal
  const handleSubmit = (e) => {
    e.preventDefault();
    setModalState(false);
    fetchDataWithCityName();
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
          <div key={i} className="flex flex-col justify-center">
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
          <div key={i} className="flex flex-col justify-center">
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
      <div className="mx-auto flex w-full max-w-4xl flex-col justify-center rounded-lg bg-sky-600 py-3 shadow-xl">
        <h1 className="text-center text-3xl font-semibold text-white mb-5">
          Weather in {currentData.city}
        </h1>
        <div className="flex justify-center">{weatherArray}</div>
      </div>
    );
  };

  const displayCards = () => {
    return (
      <div className="mx-auto mt-5 flex w-full max-w-4xl flex-col justify-center rounded-lg bg-gray-700 py-3">
        <h1 className="text-center text-3xl font-semibold text-white mb-5">
          Top Headlines in {currentData.city}
        </h1>
        <div className="flex justify-center mb-2">
          <CardComponent />
          <CardComponent />
        </div>
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
            <Header
              setModalState={setModalState}
              fetchDataWithCoords={fetchDataWithCoords}
            />
            <main className="grow" />
            <Footer />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex h-screen flex-col bg-emerald-100">
        <Header
          setModalState={setModalState}
          fetchDataWithCoords={fetchDataWithCoords}
        />
        <main className="flex grow flex-col">
          <Modal
            open={modalState}
            onClose={() => setModalState(false)}
            className="m-auto flex h-1/3 justify-center"
          >
            <div className="flex h-full w-2/3 flex-col justify-between rounded-lg bg-white">
              <p className="mt-5 text-center text-3xl font-bold text-black">
                Search Weather & News
              </p>
              <p className="my-5 text-center text-2xl font-semibold text-black">
                Please enter the name of the city you want to search:
              </p>
              <form
                className="flex flex-col justify-center"
                onSubmit={handleSubmit}
              >
                <TextField
                  id="cityName"
                  label="City Name"
                  variant="outlined"
                  className="mx-auto mb-5 w-2/3"
                  onChange={(e) => setCityName(e.target.value)}
                  required
                />
                <Button
                  variant="contained"
                  className="mx-auto mb-5 w-2/3 bg-sky-500 text-base normal-case"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </div>
          </Modal>
          {displayWeather()}
          {displayCards()}
        </main>
        <Footer />
      </div>
    );
  }
};

export default Home;
