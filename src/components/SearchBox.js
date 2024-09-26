const SearchBox = (props) => {
  const { setSearchInput, setVideoType, setYear, getMovieData, setShowModal } =
    props;

  return (
    <>
      <div className="flex justify-center gap-3 items-center w-full">
        <input
          className="h-10 w-3/5 text-black p-2 focus:outline-none rounded-md shadow-md focus:bg-gray-200 focus:outline-gray-400 px-4 font-medium"
          placeholder="Search..."
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") getMovieData();
          }}
        />

        <select
          onChange={(e) => setVideoType(e.target.value)}
          className="h-10 bg-gray-600 hover:bg-gray-700 text-white text-center rounded-md shadow-md px-2"
        >
          <option value="" selected>
            Select Genre
          </option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>

        <select
          className="h-10 bg-gray-600 hover:bg-gray-700 text-white text-center rounded-md shadow-md px-2"
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
          className="bg-blue-600 hover:bg-blue-700 h-10 p-2 pt-4 pb-4 w-28 text-center flex justify-center items-center cursor-pointer rounded-md shadow-md"
          onClick={getMovieData}
        >
          Search
        </button>
      </div>

      <div className="ml-auto">
        <button
          className="bg-red-600 hover:bg-red-700 h-10 p-2 rounded-md shadow-md"
          onClick={() => setShowModal(true)}
        >
          Favourites
        </button>
      </div>
    </>
  );
};

export default SearchBox;
