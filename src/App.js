import React, { useEffect, useState } from "react";
import SearchBox from "./components/SearchBox";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const App = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [videoType, setVideoType] = useState(""); //movie, series, episode
  const [year, setYear] = useState("");
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {}, []);

  const getMovieData = async () => {
    try {
      if (!searchInput) return;

      const res = await fetch(
        `http://www.omdbapi.com/?s=${searchInput}&type=${videoType}&y=${year}&page=${currPage}&apikey=${API_KEY}` // by imdb id
      );

      const data = await res.json();
      console.log("data===", data);
      setData(data);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  return (
    <div className="bg-gray-700 h-screen w-full flex flex-col justify-start items-center text-white p-10 space-x-4">
      <SearchBox
        setSearchInput={setSearchInput}
        setVideoType={setVideoType}
        setYear={setYear}
        getMovieData={getMovieData}
      />

      <div className="bg-slate-700 self-center mt-12 w-4/5 border border-white">
        <div>
          <img src="https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg" />
          <div>Movie Title</div>
          <button>More Details</button>
        </div>
      </div>
    </div>
  );
};

export default App;
