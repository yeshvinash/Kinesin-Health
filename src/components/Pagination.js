import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="pagination_box">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="prev"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <span className="paginationtext">
        {/* {`${currentPage}-${Math.min(currentPage + 11, totalPages)} / ${totalPages}`} */}
        {`${currentPage} / ${totalPages}`}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="next"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
