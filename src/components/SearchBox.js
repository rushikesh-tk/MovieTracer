const SearchBox = (props) => {
  const { setSearchInput, setVideoType, setYear, getMovieData } = props;
  return (
    <div className="flex justify-center gap-2 items-center w-3/4">
      <input
        className="h-10 w-3/5 text-black p-2 focus:outline-none rounded-md shadow-md"
        placeholder="Search..."
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <select
        onChange={(e) => setVideoType(e.target.value)}
        className="h-8 bg-gray-600 text-white text-center rounded-md p-2 focus:outline-none shadow-md flex justify-center items-center appearance-none pb-8"
      >
        <option value="" selected className="bg-pink-500">
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
  );
};

export default SearchBox;
