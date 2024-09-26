import React, { useEffect, useState } from "react";
import SearchBox from "./components/SearchBox";
import MovieRenderer from "./components/MovieRenderer";
import Pagination from "./components/Pagination";
import { toast, Toaster } from "sonner";
import Motion from "./components/Motion";
import { getFavourites, removeMovieFromFavourites } from "./utils";
import FavModal from "./components/FavModal";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const App = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [videoType, setVideoType] = useState(""); // movie, series, episode
  const [year, setYear] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const favs = getFavourites();
    setFavourites(favs);
  }, [showModal, selectedMovie]);

  useEffect(() => {
    if (!searchInput) return;
    getMovieData();
  }, [currPage, videoType, year]);

  const handleRemoveFromFavourites = (movieId) => {
    removeMovieFromFavourites(movieId);
    setFavourites(favourites.filter((movie) => movie.movieId !== movieId));
    toast.success("Movie removed from favourites");
  };

  const getMovieData = async () => {
    try {
      if (!searchInput) {
        toast.error("Search box is empty");
        return;
      }
      setLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?s=${searchInput}&type=${videoType}&y=${year}&page=${currPage}&apikey=${API_KEY}`
      );

      const data = await res.json();
      setData(data);
      setTotalResults(data?.totalResults);
    } catch (error) {
      toast.error("Failed to load movies");
      console.log("Error : ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    const lastPage = Math.ceil(totalResults / 10);
    console.log("yyyyyy 11111", currPage);
    if (currPage === lastPage) {
      console.log("yyyyyy");
      toast.info("You are at last page");
      return;
    }
    setCurrPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    console.log("zzzzzz 22222222", currPage);
    if (currPage === 1) {
      console.log("zzzzz 22222222");
      toast.info("You are at 1st page");
      return;
    }
    setCurrPage((prev) => prev - 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrPage(pageNumber);
  };

  return (
    <div className="bg-gray-900 min-h-screen w-full flex flex-col justify-start items-center text-white p-10">
      <Motion styles="flex justify-between items-center w-full  p-3">
        <SearchBox
          setSearchInput={setSearchInput}
          setVideoType={setVideoType}
          setYear={setYear}
          getMovieData={getMovieData}
          setShowModal={setShowModal}
        />
      </Motion>

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

      {showModal && (
        <FavModal
          favourites={favourites}
          handleRemoveFromFavourites={handleRemoveFromFavourites}
          setShowModal={setShowModal}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      )}

      <Toaster />
    </div>
  );
};

export default App;
