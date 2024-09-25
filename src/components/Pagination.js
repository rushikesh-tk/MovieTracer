const Pagination = (props) => {
  const {
    handleNextPage,
    handlePrevPage,
    handlePageClick,
    currPage,
    totalResults,
  } = props;
  const totalPages = Math.ceil(totalResults / 10);

  const pageWindow = 5;

  const startPage = Math.max(1, currPage - Math.floor(pageWindow / 2));
  const endPage = Math.min(totalPages, startPage + pageWindow - 1);

  const adjustedStartPage = Math.max(1, endPage - pageWindow + 1);

  const pageNumbers = [];
  for (let i = adjustedStartPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="w-full flex justify-end items-center mt-3 gap-3">
        <button
          className="px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600"
          onClick={handlePrevPage}
        >
          Prev
        </button>
        <span className="px-3 py-1 rounded-md bg-blue-700 text-white hover:bg-blue-600">
          {currPage}
        </span>
        <button
          className="px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600"
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>

      <div className="w-full flex justify-end items-center mt-3 gap-3">
        {adjustedStartPage > 1 && (
          <>
            <button
              onClick={() => handlePageClick(1)}
              className="px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600"
            >
              1
            </button>
            {adjustedStartPage > 2 && <span className="px-2">...</span>}
          </>
        )}

        {pageNumbers?.map((item) => (
          <button
            key={item}
            onClick={() => handlePageClick(item)}
            className={`px-3 py-1 rounded-md ${
              item === currPage
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            {item}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2">...</span>}
            <button
              onClick={() => handlePageClick(totalPages)}
              className="px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Pagination;
