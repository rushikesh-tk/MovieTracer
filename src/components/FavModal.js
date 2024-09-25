import { useState } from "react";
import MovieModal from "./MovieModal";

const FavModal = (props) => {
  const {
    favourites,
    handleRemoveFromFavourites,
    setShowModal,
    selectedMovie,
    setSelectedMovie,
  } = props;

  //   const [selectedMovie, setSelectedMovie] = useState(null);

  const handleInfoClick = (id) => {
    setSelectedMovie(id);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg max-h-full overflow-y-auto">
        <h2 className="text-white text-2xl font-bold mb-4">Your Favourites</h2>
        {favourites.length === 0 ? (
          <p className="text-white">No favourite movies found</p>
        ) : (
          <ul className="list-none">
            {favourites.map((movie) => (
              <li
                key={movie.movieId}
                className="flex justify-between items-center mb-2"
              >
                <span className="text-white">{movie.name}</span>
                <div>
                  <button
                    onClick={() => handleInfoClick(movie.movieId)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded-md mt-auto self-end text-sm"
                  >
                    View
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 ml-2"
                    onClick={() => handleRemoveFromFavourites(movie.movieId)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md mt-4"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </div>

      {selectedMovie && (
        <MovieModal selectedMovie={selectedMovie} closeModal={closeModal} />
      )}
    </div>
  );
};

export default FavModal;
