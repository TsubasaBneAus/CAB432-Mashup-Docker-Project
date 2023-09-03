"use client";

import { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>UserName: {data.name}, Email: {data.email}</h1>
    </div>
  )
};

export default Home;