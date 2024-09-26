import Motion from "./Motion";

const MovieCard = ({ item, index, handleInfoClick }) => {
  return (
    <Motion styles="border border-gray-600 rounded-md shadow-md flex flex-col p-2">
      <>
        <img
          className="w-full rounded-md object-contain"
          style={{ height: "50vh" }}
          src={
            item?.Poster !== "N/A"
              ? item?.Poster
              : "https://via.placeholder.com/350"
          }
          alt={item?.Title}
        />
        <div className="text-start text-xl font-semibold mb-2">
          {item?.Title}
        </div>
        <button
          onClick={() => handleInfoClick(item)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md mt-auto self-end text-sm"
        >
          Info
        </button>
      </>
    </Motion>
  );
};

export default MovieCard;
