import React from "react";

const MovieRenderer = (props) => {
  const { loading, data } = props;

  return (
    <div className=" w-full mt-12">
      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <div className="text-white text-xl">Loading...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          {data?.Search && data?.Search.length > 0 ? (
            data?.Search.map((item, index) => (
              <div
                key={index}
                className="border border-gray-600 rounded-md shadow-md flex flex-col p-2"
              >
                <img
                  className="w-full rounded-md object-contain"
                  style={{ height: "50vh" }}
                  src={
                    item?.Poster !== "N/A"
                      ? item?.Poster
                      : "https://via.placeholder.com/150"
                  }
                  alt={item?.Title}
                />
                <div className="text-start text-xl font-semibold mb-2">
                  {item?.Title}
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white  py-1 px-3 rounded-md mt-auto self-end text-sm">
                  Info
                </button>
              </div>
            ))
          ) : (
            <div className="text-white text-center w-full">
              No results found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieRenderer;
