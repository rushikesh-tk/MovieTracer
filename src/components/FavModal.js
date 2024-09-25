const FavModal = (props) => {
  const { favourites, handleRemoveFromFavourites, setShowModal } = props;

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
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveFromFavourites(movie.movieId)}
                >
                  Remove
                </button>
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
    </div>
  );
};

export default FavModal;
