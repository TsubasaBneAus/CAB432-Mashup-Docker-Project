"use client";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ModalComponent from "@/components/modalComponent";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [currentData, setCurrentData] = useState({
    city: null,
    weather: [],
    topHeadlines: [],
  });
  const [cityName, setCityName] = useState("");
  const [modalState, setModalState] = useState(false);
  const usedPage = "/";
  const errorCurrentData = {
    city: "failed",
    weather: [],
    topHeadlines: [],
  };
  const router = useRouter();

  // Fetch the current data on weather and news in Brisbane initially
  const fetchDataAtFirst = async () => {
    // Set null to "city" to implement a loading page at first
    setCurrentData({
      city: null,
      weather: [],
    });

    // Send a POST request to the API server
    try {
      const res = await fetch(`${baseUrl}/getDataAtFirst`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude: -27.470125,
          longitude: 153.021072,
        }),
      });
      const data = await res.json();
      setCurrentData(data);
    } catch (err) {
      console.log(err);
      setCurrentData(errorCurrentData);
    }
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
      const res = await fetch(`${baseUrl}/getDataWithCityName`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cityName: cityName,
        }),
      });
      const data = await res.json();
      setCurrentData(data);
    } catch (err) {
      console.log(err);
      setCurrentData(errorCurrentData);
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
    // Check if the data is fetched correctly
    if (currentData.city == errorCurrentData.city) {
      return (
        <div className="mx-auto my-2 flex w-full max-w-6xl flex-col justify-center rounded-lg bg-sky-600 shadow-xl">
          <h1 className="mb-5 text-center text-3xl font-semibold text-white">
            Failed to fetch the Weather
          </h1>
        </div>
      );
    }

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
      <div className="mx-auto my-2 flex w-full max-w-6xl flex-col justify-center rounded-lg bg-sky-600 shadow-xl">
        <h1 className="mb-5 text-center text-3xl font-semibold text-white">
          Weather in {currentData.city}
        </h1>
        <div className="flex justify-center">{weatherArray}</div>
      </div>
    );
  };

  // Format ISO datetime to display the datetime with AUS format
  const formatDateTime = (dateTimeToFormat) => {
    const date = new Date(dateTimeToFormat);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;

    return formattedDateTime;
  };

  // Display cards of the top headlines
  const displayCards = () => {
    // Check if the data is fetched correctly
    if (currentData.city == errorCurrentData.city) {
      return (
        <div className="mx-auto mb-2 flex h-full max-h-[400px] w-full max-w-6xl flex-col justify-center rounded-lg bg-stone-800 pl-3 pr-1">
          <h1 className="my-5 text-center text-3xl font-semibold text-white">
            Failed to fetch the Top Headlines
          </h1>
        </div>
      );
    }

    let articlesArray = [];
    const articles = currentData.topHeadlines;
    for (let i = 0; i < articles.length; i++) {
      articlesArray.push(
        <div key={i} className="flex justify-center">
          <Card
            sx={{ maxWidth: 345 }}
            className="h-full w-full border-2 border-gray-600 bg-stone-800 shadow-lg"
          >
            <CardActionArea
              className="h-full w-full"
              onClick={() => {
                sessionStorage.setItem(
                  `news_id_${i}`,
                  JSON.stringify(articles[i]),
                );
                router.push(`/news/${i}`);
              }}
            >
              <CardContent className="h-full w-full bg-stone-800 text-lg font-semibold text-white">
                <p>{articles[i].title}</p>
                <hr />
                <p>{formatDateTime(articles[i].publishedAt)}</p>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>,
      );
    }

    return (
      <div className="mx-auto mb-2 flex h-full max-h-[400px] w-full max-w-6xl flex-col justify-center rounded-lg bg-stone-800 pl-3 pr-1">
        <h1 className="my-5 text-center text-3xl font-semibold text-white">
          Top Headlines in {currentData.city}
        </h1>
        <div className="mb-5 grid grid-cols-3 gap-2 overflow-y-scroll">
          {articlesArray}
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchDataAtFirst();
    console.log(baseUrl);
  }, []);

  // Check if the page is loading
  if (currentData.city == null) {
    return (
      <div>
        <div className="fixed z-10 flex h-screen w-screen items-center justify-center text-white">
          <CircularProgress color="inherit" size={100} />
        </div>
        <div className="blur-sm brightness-50 backdrop-blur-sm">
          <div className="flex h-screen flex-col bg-emerald-100">
            <Header setModalState={setModalState} usedPage={usedPage} />
            <main className="grow" />
            <Footer />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex h-screen flex-col">
        <Header setModalState={setModalState} usedPage={usedPage} />
        <main className="flex grow flex-col bg-emerald-100">
          <ModalComponent
            modalState={modalState}
            setModalState={setModalState}
            handleSubmit={handleSubmit}
            setCityName={setCityName}
          />
          {displayWeather()}
          {displayCards()}
        </main>
        <Footer />
      </div>
    );
  }
};

export default Home;
