const Pagination = (props) => {
  const { handleNextPage, handlePrevPage, currPage } = props;

  return (
    <div className="w-full flex justify-end items-center mt-3 gap-3">
      <button
        className="bg-gray-700 h-4 px-3 py-3 w-20 text-center flex justify-center items-center cursor-pointer rounded-md shadow-md"
        onClick={handlePrevPage}
      >
        Prev
      </button>
      <span>{currPage}</span>
      <button
        className="bg-gray-700 h-4 px-3 py-3 w-20 text-center flex justify-center items-center cursor-pointer rounded-md shadow-md"
        onClick={handleNextPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
