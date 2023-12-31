"use client";
import {
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";

const News = ({ params }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [newsData, setNewsData] = useState({
    author: null,
    content: null,
    description: null,
    publishedAt: null,
    source: null,
    title: null,
    url: null,
    urlToImage: null,
  });
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const usedPage = "/news";

  // Fetch YouTube videos related to the news
  const fetchYouTubeVideos = async (rawNewsData) => {
    try {
      const res = await fetch(`${baseUrl}/getYouTubeVideos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newsTitle: rawNewsData.title,
          publishedAfter: rawNewsData.publishedAt,
        }),
      });
      const data = await res.json();
      console.log(data);
      setYoutubeVideos(data);
    } catch (err) {
      console.log(err);
      setYoutubeVideos(["error"]);
    }
  };

  // Handle the submission event of the button in the form
  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(`${newsData.url}`, "_blank");
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

  // Display the detail of the news
  const displayNews = () => {
    return (
      <form
        className="mx-auto my-2 flex w-full max-w-6xl flex-col justify-center rounded-lg bg-stone-800 px-10 py-3 shadow-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-3 text-center text-3xl font-semibold text-white">
          {newsData.title}
        </h1>
        <p className="text-center text-2xl font-semibold text-white">
          Published at {formatDateTime(newsData.publishedAt)}
        </p>
        <p className="mb-3 text-center text-2xl font-semibold text-white">
          Retrieved From {newsData.source.name}
        </p>
        <button
          type="submit"
          className="mx-28 rounded-md bg-blue-700 text-xl font-semibold text-white hover:bg-blue-900"
        >
          Go To the Source
        </button>
      </form>
    );
  };

  // Display YouTube videos related to the news
  const displayYouTubeVideos = () => {
    // Check if the videos are fetched correctly
    if (youtubeVideos[0] == "error") {
      return (
        <div className="mx-auto flex h-full max-h-[400px] w-full max-w-6xl flex-col justify-center rounded-lg bg-stone-800 pl-3 pr-1">
          <h1 className="my-5 text-center text-3xl font-semibold text-white">
            Failed to fetch the Related YouTube Videos
          </h1>
        </div>
      );
    }

    let youtubeVideosArray = [];
    for (let i = 0; i < youtubeVideos.length; i++) {
      const title = youtubeVideos[i].snippet.title;
      const thumbnail = youtubeVideos[i].snippet.thumbnails.medium.url;
      const url = `https://www.youtube.com/watch?v=${youtubeVideos[i].id.videoId}`;
      const publishedDateTime = youtubeVideos[i].snippet.publishedAt;

      youtubeVideosArray.push(
        <div key={i} className="flex justify-center">
          <Card
            sx={{ maxWidth: 345 }}
            className="h-full w-full border-2 border-gray-600 bg-stone-800 text-lg font-semibold shadow-lg"
          >
            <CardActionArea
              className="h-full w-full"
              onClick={() => {
                window.open(url, "_blank");
              }}
            >
              <CardMedia component="img" image={thumbnail} alt="youtubeVideo" />
              <CardContent className="flex h-36 w-full flex-col justify-center bg-stone-800 text-white">
                <p>{title}</p>
                <hr />
                <p>Published at {formatDateTime(publishedDateTime)}</p>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>,
      );
    }

    // Check if at least one YouTube video exists
    if (youtubeVideos.length > 0) {
      return (
        <div className="mx-auto flex h-full max-h-[400px] w-full max-w-6xl flex-col justify-center rounded-lg bg-stone-800 pl-3 pr-1">
          <h1 className="my-5 text-center text-3xl font-semibold text-white">
            Related YouTube Videos
          </h1>
          <div className="mb-5 grid grid-cols-3 gap-2 overflow-y-scroll">
            {youtubeVideosArray}
          </div>
        </div>
      );
    } else {
      return (
        <div className="mx-auto flex h-full max-h-[400px] w-full max-w-6xl flex-col justify-center rounded-lg bg-stone-800 pl-3 pr-1">
          <h1 className="my-5 text-center text-3xl font-semibold text-white">
            Related YouTube Videos
          </h1>
          <div className="mb-5 flex justify-center text-center text-xl font-semibold text-white">
            <h1>Nothing Matched</h1>
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    const sessionStorageData = sessionStorage.getItem(`news_id_${params.id}`);
    const data = JSON.parse(sessionStorageData);
    setNewsData(data);
    fetchYouTubeVideos(data);
  }, []);

  // Check if the page is loading
  if (youtubeVideos.length == 0) {
    return (
      <div>
        <div className="fixed z-10 flex h-screen w-screen items-center justify-center text-white">
          <CircularProgress color="inherit" size={100} />
        </div>
        <div className="blur-sm brightness-50 backdrop-blur-sm">
          <div className="flex h-screen flex-col bg-emerald-100">
            <Header usedPage={usedPage} />
            <main className="grow" />
            <Footer />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex h-screen flex-col bg-emerald-100">
        <Header usedPage={usedPage} />
        <main className="flex grow flex-col">
          {displayNews()}
          {displayYouTubeVideos()}
        </main>
        <Footer />
      </div>
    );
  }
};

export default News;
