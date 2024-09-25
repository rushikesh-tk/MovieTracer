import { useEffect, useState } from "react";
import { getFavourites, removeMovieFromFavourites } from "../utils";
import FavModal from "./FavModal";
import { toast } from "sonner";

const SearchBox = (props) => {
  const { setSearchInput, setVideoType, setYear, getMovieData } = props;
  const [showModal, setShowModal] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const favs = getFavourites();
    setFavourites(favs);
  }, [showModal, selectedMovie]);

  const handleRemoveFromFavourites = (movieId) => {
    removeMovieFromFavourites(movieId);
    setFavourites(favourites.filter((movie) => movie.movieId !== movieId));
    toast.success("Movie removed from favourites");
  };

  return (
    <div className="flex justify-between items-center w-full  p-3">
      <div className="flex justify-center gap-3 items-center w-full">
        <input
          className="h-10 w-3/5 text-black p-2 focus:outline-none rounded-md shadow-md"
          placeholder="Search..."
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <select
          onChange={(e) => setVideoType(e.target.value)}
          className="h-8 bg-gray-600 text-white text-center rounded-md p-2 focus:outline-none shadow-md flex justify-center items-center appearance-none pb-8"
        >
          <option value="" selected>
            Select Genre
          </option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>

        <select
          className="h-8 bg-gray-600 text-white text-center rounded-md p-2 focus:outline-none shadow-md overflow-auto flex justify-center items-center appearance-none pb-8"
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="" selected>
            Select Year
          </option>
          {Array.from(new Array(50), (val, index) => {
            const year = 2024 - index;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>

        <button
          className="bg-gray-600 h-10 p-2 pt-4 pb-4 w-28 text-center flex justify-center items-center cursor-pointer rounded-md shadow-md"
          onClick={getMovieData}
        >
          Search
        </button>
      </div>

      <div className="ml-auto">
        <button
          className="bg-red-500 h-10 p-2 rounded-md shadow-md"
          onClick={() => setShowModal(true)}
        >
          Favourites
        </button>
      </div>

      {showModal && (
        <FavModal
          favourites={favourites}
          handleRemoveFromFavourites={handleRemoveFromFavourites}
          setShowModal={setShowModal}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      )}
    </div>
  );
};

export default SearchBox;
