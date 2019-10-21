import React from 'react';

function Pagination({ pages, handlePageChange, currentPage }) {
  return (
    <nav aria-label="Page navigation example" style={{ cursor: 'pointer' }}>
      <ul className="pagination pagination-lg justify-content-center">
        {pages.map((page, index) => (
          <li
            className="page-item page-link"
            key={index + page}
            onClick={() => handlePageChange(page)}
            style={{
              backgroundColor: currentPage === page ? '#dee2e6' : '#fff'
            }}
          >
            {page}
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default Pagination;
