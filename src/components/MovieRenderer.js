import React, { useState } from "react";
import MovieModal from "./MovieModal";
import MovieCard from "./Moviecard";
import Motion from "./Motion";

const MovieRenderer = (props) => {
  const { loading, data } = props;

  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleInfoClick = (movie) => {
    setSelectedMovie(movie?.imdbID);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="w-full mt-12">
      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <div className="text-white text-xl">Loading...</div>
        </div>
      ) : data?.Search ? (
        data.Search.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
            {data.Search.map((item, index) => (
              <MovieCard
                item={item}
                index={index}
                key={item.imdbID}
                handleInfoClick={handleInfoClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-white text-center w-full">No results found</div>
        )
      ) : (
        <Motion styles="text-white text-center w-full font-semibold text-xl">
          Please enter a query to search for movies/series
        </Motion>
      )}

      {selectedMovie && (
        <MovieModal selectedMovie={selectedMovie} closeModal={closeModal} />
      )}
    </div>
  );
};

export default MovieRenderer;
