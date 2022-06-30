import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Book, { IBookProps } from "./components/Book/Book";
import Select from "./components/Select/Select";
import { GlobalStyle } from "./styles/global";

import { useAppSelector, useAppDispatch } from "./redux/hooks/hooks";
import { getBooks, selectStatus } from "./redux/book/bookSlice";
import { useSelector } from "react-redux";
import { IBook } from "./redux/types";

const categorySelect = [
  {
    type: "all",
    id: 1,
  },
  {
    type: "biography",
    id: 2,
  },
  {
    type: "computers",
    id: 3,
  },
  {
    type: "history",
    id: 4,
  },
  {
    type: "medical",
    id: 5,
  },
  {
    type: "poetry",
    id: 6,
  },
];

const sortSelect = [
  {
    type: "relevance",
    id: 1,
  },
  {
    type: "newest",
    id: 2,
  },
];

function App() {
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectStatus);

  useEffect(() => {
    console.log(status);
    dispatch(getBooks(1));
  }, []);

  // @ts-ignore
  const books = useSelector((state) => state.books.books);

  return (
    <>
      <GlobalStyle />
      <h1>Search for books</h1>
      <input type="search" />
      <div>
        <div>
          <h4>Categories</h4>
          <Select selectType={categorySelect} />
        </div>
        <div>
          <h4>Sorting by</h4>
          <Select selectType={sortSelect} />
        </div>
      </div>

      {/* <button type="button" onClick={handleClick}>
        {status === "loading" ? "Loading todos..." : "Load todos"}
      </button> */}

      <div>
        <h3>Found 100 results</h3>
        <BookList>
          {books.map((book: IBook) => {
            if (status === "loading") {
              return <div>loading...</div>;
            } else {
              return <Book key={book.id} {...book} />;
            }
          })}
        </BookList>
      </div>
    </>
  );
}

const BookList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;

export default App;
