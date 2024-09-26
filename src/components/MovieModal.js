import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  addMovieToFavourites,
  isMoviePresent,
  removeMovieFromFavourites,
} from "../utils";
import { toast } from "sonner";
import Motion from "./Motion";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const MovieModal = ({ selectedMovie, closeModal }) => {
  const [loading, setLoading] = useState(false);
  const [movieData, setMovieData] = useState({});
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    getMovieDetails();
    setIsFav(isMoviePresent(selectedMovie));
  }, [selectedMovie]);

  const getMovieDetails = async () => {
    try {
      if (!selectedMovie) return;
      setLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`
      );

      const data = await res.json();
      setMovieData(data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const {
    Title,
    Poster,
    BoxOffice,
    Ratings,
    Plot,
    Year,
    Genre,
    Runtime,
    imdbRating,
  } = movieData;

  const toggleFavorite = () => {
    console.log("movie...", selectedMovie, Title);
    if (isFav) {
      removeMovieFromFavourites(selectedMovie);
      setIsFav(false);
      toast.success(`${Title} is removed from favourites`);
    } else {
      addMovieToFavourites(selectedMovie, Title);
      setIsFav(true);
      toast.success(`${Title} is added to favourites`);
    }
  };

  return (
    <Motion
      styles="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      duration="0.5"
    >
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-4xl max-h-full overflow-y-auto flex flex-col sm:flex-row">
        {loading ? (
          <div className="text-white text-xl text-center">Loading...</div>
        ) : (
          <>
            <div className="sm:w-1/2 flex flex-col items-center sm:items-start">
              <h2 className="text-white text-3xl font-bold mb-4 text-center sm:text-left">
                {Title}
              </h2>

              <img
                className="w-full rounded-md object-contain mb-4"
                style={{ height: "60vh" }}
                src={
                  Poster !== "N/A" ? Poster : "https://via.placeholder.com/350"
                }
                alt={Title}
              />
            </div>

            <div className="sm:w-1/2 sm:ml-6 text-left text-white mt-12 relative">
              <p className="mb-2">
                <strong>Year:</strong> {Year}
              </p>
              <p className="mb-2">
                <strong>Genre:</strong> {Genre}
              </p>
              <p className="mb-2">
                <strong>Runtime:</strong> {Runtime}
              </p>
              <p className="mb-2">
                <strong>IMDb Rating:</strong> {imdbRating}
              </p>
              {BoxOffice && (
                <p className="mb-2">
                  <strong>Box Office:</strong> {BoxOffice}
                </p>
              )}
              {Plot && (
                <p className="mb-4">
                  <strong>Plot:</strong> {Plot}
                </p>
              )}
              {Ratings && Ratings.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">Ratings:</h3>
                  <ul className="list-disc list-inside">
                    {Ratings.map((rating, index) => (
                      <li key={index}>
                        <strong>{rating.Source}:</strong> {rating.Value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="absolute bottom-1 right-1 flex gap-2">
                <button
                  className="py-2 px-4 rounded-md mt-6"
                  onClick={toggleFavorite}
                >
                  <Heart fill={isFav ? "red" : "gray"} stroke="5px" />
                </button>

                <button
                  onClick={closeModal}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md mt-6"
                >
                  Close
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Motion>
  );
};

export default MovieModal;
