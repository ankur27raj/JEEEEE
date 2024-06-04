import React, { useState } from 'react';
import styled from 'styled-components';
const PaginationContainer = styled.div`
    display: flex;
    justify-content: space-between; /* Aligns children to left and right */
    align-items: center;
    padding: 10px;
    margin: 1rem;
    // background-color: #f8f9fa;
    // border-radius: 8px;
    // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SelectContainer = styled.div`
    display: flex;
    align-items: center;
`;

const SelectStyled = styled.select`
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
    font-size: 14px;
    color: #333;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const PaginationWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Arrow = styled.button`
    padding: 8px;
    margin: 4px;
    background-color: #ccc;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: #333;

    &:hover {
        background-color: #aaa;
    }
`;

const PageNumber = styled.div`
    padding: 8px 12px;
    margin: 4px;
    border-radius: 4px;
    cursor: pointer;
    background-color: ${({ index, currentPage }) =>
        index === currentPage ? '#a9abac' : '#e6e6e6'};
    color: ${({ index, currentPage }) => (index === currentPage ? '#fff' : '#333')};

    &:hover {
        background-color: ${({ index, currentPage }) =>
            index === currentPage ? '#a9abac' : '#d9d9d9'};
    }
`;


export default function Pagination({ probPerPage, setProbPerPage, totalProb, setCurrentPage, currentPage }) {
    const [currentRangeStart, setCurrentRangeStart] = useState(1);

    const totalPages = Math.ceil(totalProb / probPerPage);

    const handlePrev = () => {
        if (currentRangeStart > 1) {
            setCurrentRangeStart((prev) => prev - 1); 
        }
        if(currentPage > 1)setCurrentPage(currentPage-1);
    };

    const handleNext = () => {
            if(currentRangeStart+4 < totalPages)setCurrentRangeStart((prev) => prev + 1);
            if(currentPage < totalPages)setCurrentPage(currentPage+1);
    };

    const handleProbPage = (e) =>{
        setProbPerPage(e.target.value);
        setCurrentPage(1);
    }
    return (
        <PaginationContainer>
            {/* Select container */}
            <SelectContainer>
                <SelectStyled
                    id="kind"
                    name="kind"
                    value={probPerPage}
                    onChange={handleProbPage}
                >
                    <option value={10}>10/Page</option>
                    <option value={20}>20/Page</option>
                    <option value={50}>50/Page</option>
                </SelectStyled>
            </SelectContainer>

            {/* Pagination wrapper */}
            <PaginationWrapper>
                {/* Previous button */}
                <Arrow onClick={handlePrev}>
                    &lt;
                </Arrow>

                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages - currentRangeStart + 1) }, (_, i) => {
                    const pageNumber = currentRangeStart + i;
                    return (
                        <PageNumber
                            key={pageNumber}
                            index={pageNumber}
                            currentPage={currentPage}
                            onClick={() => setCurrentPage(pageNumber)}
                        >
                            {pageNumber}
                        </PageNumber>
                    );
                })}

                {/* Next button */}
                <Arrow onClick={handleNext}>
                    &gt;
                </Arrow>
            </PaginationWrapper>
        </PaginationContainer>
    );
}
