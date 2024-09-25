import React, { useEffect, useState } from "react";
import SearchBox from "./components/SearchBox";
import MovieRenderer from "./components/MovieRenderer";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const App = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [videoType, setVideoType] = useState(""); // movie, series, episode
  const [year, setYear] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getMovieData = async () => {
    try {
      if (!searchInput) return;
      setLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?s=${searchInput}&type=${videoType}&y=${year}&page=${currPage}&apikey=${API_KEY}`
      );

      const data = await res.json();

      setData(data);
    } catch (error) {
      console.log("Error : ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen w-full flex flex-col justify-start items-center text-white p-10">
      <SearchBox
        setSearchInput={setSearchInput}
        setVideoType={setVideoType}
        setYear={setYear}
        getMovieData={getMovieData}
      />

      <MovieRenderer loading={loading} data={data} />
    </div>
  );
};

export default App;
