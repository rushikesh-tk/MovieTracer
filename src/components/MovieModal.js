import React from "react";

const MovieModal = (props) => {
  const { selectedMovie, closeModal } = props;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md max-h-full overflow-y-auto">
        <h2 className="text-white text-2xl mb-4">{selectedMovie.Title}</h2>
        <img
          className="w-full rounded-md object-contain mb-4"
          style={{ height: "40vh" }}
          src={
            selectedMovie?.Poster !== "N/A"
              ? selectedMovie?.Poster
              : "https://via.placeholder.com/150"
          }
          alt={selectedMovie?.Title}
        />
        <p className="text-white mb-4">Year: {selectedMovie?.Year}</p>
        <button
          onClick={closeModal}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MovieModal;
