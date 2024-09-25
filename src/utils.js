export const addMovieToFavourites = (movieId, name) => {
  try {
    let movies = JSON.parse(localStorage.getItem("favourites")) || [];
    const exists = movies.some((item) => item.movieId === movieId);
    if (exists) {
      return false;
    }

    let favMovie = { movieId, name };
    movies.push(favMovie);
    localStorage.setItem("favourites", JSON.stringify(movies));
    return true;
  } catch (error) {
    console.error("Failed to add movie to favourites:", error);
    return false;
  }
};

export const getFavourites = () => {
  try {
    let movies = JSON.parse(localStorage.getItem("favourites")) || [];
    return movies;
  } catch (error) {
    console.error("Failed to add movie to favourites:", error);
    return [];
  }
};

export const removeMovieFromFavourites = (movieId) => {
  try {
    let movies = JSON.parse(localStorage.getItem("favourites")) || [];
    const newMovieData = movies.filter((item) => item.movieId !== movieId);
    if (newMovieData.length !== movies.length) {
      localStorage.setItem("favourites", JSON.stringify(newMovieData));
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to remove movie from favourites:", error);
    return false;
  }
};

export const isMoviePresent = (movieId) => {
  try {
    const movies = JSON.parse(localStorage.getItem("favourites")) || [];
    return movies.some((item) => item.movieId === movieId);
  } catch (error) {
    console.error("Failed to check for movie in favourites:", error);
    return false;
  }
};
