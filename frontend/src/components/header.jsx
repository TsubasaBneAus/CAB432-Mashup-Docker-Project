"use client";
import { useState, useEffect } from "react";

const Header = (props) => {
  const [pageCountData, setPageCountData] = useState(0);

  // Display links in the header
  const displayLinks = () => {
    // Change the display of the links
    if (props.usedPage == "/") {
      return (
        <button
          className="text-xl text-white hover:text-slate-400"
          onClick={() => props.setModalState(true)}
        >
          Search Weather & News
        </button>
      );
    } else {
      return <h1 className="invisible text-xl">Search Weather & News</h1>;
    }
  };

  const fetchNumberOfVisits = async () => {
    // Send a POST request to the API server
    try {
      const res = await fetch("http://localhost:5000/getNumberOfVisits");
      const data = await res.json();
      console.log(data);
      setPageCountData(data.pageCount);
      sessionStorage.setItem("pageCount", data.pageCount);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const pageCountStorage = sessionStorage.getItem("pageCount");
    if (!pageCountStorage) {
      fetchNumberOfVisits();
    } else {
      setPageCountData(pageCountStorage);
    }
  }, []);

  return (
    <header className="flex w-auto items-center justify-around bg-slate-800 py-1 text-white shadow-xl">
      <button
        className="text-4xl font-semibold text-white hover:text-slate-400"
        onClick={() => window.open("/", "_self")}
      >
        Today's Dashboard
      </button>
      <div className="flex">
        {displayLinks()}
        <p className="text-xl text-white ml-5">
          Total number of visits: {pageCountData}
        </p>
      </div>
    </header>
  );
};

export default Header;
