/* eslint-disable react/prop-types */
import styled from "styled-components";
import PaginationButton from "./PaginationButton";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

function Pagination({ totalPages, currentPage, setCurrentPage }) {
  const ButtonContainer = styled.div`
    display: grid;
    justify-content: flex-start;
    max-width: 90%;
    grid-gap: 6px;
    margin: 1.5rem auto;
    background-color: transparent;
    overflow-x: auto;
    padding: 0.5rem 1.75rem;
    align-items: center;

    &::-webkit-scrollbar-thumb {
      display: none;
    }
  `;

  const renderPageButtons = () => {
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <PaginationButton
          key={i}
          onClick={() => setCurrentPage(i)}
          active={i === currentPage}
        >
          {i}
        </PaginationButton>
      );
    }

    return pageButtons;
  };

  return (
    <ButtonContainer
      style={{
        width: `calc((3.125rem * ${totalPages}) + 3.25rem * 2)`,
        gridTemplate: `45px / repeat(${totalPages + 2}, 45px)`,
      }}
      id="pagination"
    >
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((page) => page - 1)}
      >
        <HiChevronLeft size={20} />
      </PaginationButton>
      {renderPageButtons()}
      <PaginationButton
        onClick={() => setCurrentPage((page) => page + 1)}
        disabled={currentPage === totalPages}
      >
        <HiChevronRight size={20} />
      </PaginationButton>
    </ButtonContainer>
  );
}

export default Pagination;
