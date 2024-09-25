import React, { useEffect, useState } from "react";
import SearchBox from "./components/SearchBox";
import MovieRenderer from "./components/MovieRenderer";
import Pagination from "./components/Pagination";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const App = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [videoType, setVideoType] = useState(""); // movie, series, episode
  const [year, setYear] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState("");

  useEffect(() => {
    getMovieData();
  }, [currPage, videoType, year]);

  const getMovieData = async () => {
    try {
      if (!searchInput) return;
      setLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?s=${searchInput}&type=${videoType}&y=${year}&page=${currPage}&apikey=${API_KEY}`
      );

      const data = await res.json();
      console.log(data);
      setData(data);
      setTotalResults(data?.totalResults);
    } catch (error) {
      console.log("Error : ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    const lastPage = Math.ceil(totalResults / 10);
    setCurrPage((prev) => (prev === lastPage ? prev : prev + 1));
  };

  const handlePrevPage = () => {
    setCurrPage((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handlePageClick = (pageNumber) => {
    setCurrPage(pageNumber);
  };

  return (
    <div className="bg-gray-900 min-h-screen w-full flex flex-col justify-start items-center text-white p-10">
      <SearchBox
        setSearchInput={setSearchInput}
        setVideoType={setVideoType}
        setYear={setYear}
        getMovieData={getMovieData}
      />

      {data.length !== 0 && (
        <Pagination
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          currPage={currPage}
          totalResults={totalResults}
          handlePageClick={handlePageClick}
        />
      )}

      <MovieRenderer loading={loading} data={data} searchInput={searchInput} />
    </div>
  );
};

export default App;
