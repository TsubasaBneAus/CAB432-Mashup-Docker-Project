"use client";
import { CircularProgress, Button } from "@mui/material";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const News = ({ params }) => {
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
  const [youtubeVideos, setYoutubeVideos] = useState({});
  const usedPage = "/news";

  // Fetch YouTube videos related to the news
  const fetchYouTubeVideos = async () => {
    try {
      const res = await fetch("http://localhost:5000/getYouTubeVideos", {
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
      setYoutubeVideos(data);
    } catch (err) {
      console.log(err);
    }
  }

  // Handle the submission event of the button in the modal
  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(`${newsData.url}`, "_blank");
  };

  // Display the detail of the news
  const displayNews = () => {
    return (
      <form
        className="mx-auto flex w-full max-w-6xl flex-col justify-center rounded-lg bg-stone-800 px-40 py-3 shadow-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-3 text-center text-3xl font-semibold text-white">
          {newsData.title}
        </h1>
        <p className="mb-3 text-center text-2xl font-semibold text-white">
          {newsData.description}
        </p>
        <p className="mb-3 text-center text-2xl font-semibold text-white">
          Retrieved From {newsData.source.name}
        </p>
        <Button
          variant="contained"
          className="mx-auto mb-2 w-2/3 bg-sky-500 text-base normal-case"
          type="submit"
        >
          Go To The Source
        </Button>
      </form>
    );
  };

  // Display YouTube videos related to the news
  const displayYouTubeVideos = () => {
    return (
      <div>

      </div>
    )
  }

  useEffect(() => {
    const localStorageData = localStorage.getItem(`news_id_${params.id}`);
    const data = JSON.parse(localStorageData);
    console.log(data);
    setNewsData(data);
  }, []);

  // Check if the app is loading
  if (newsData.author == null) {
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
