import * as React from "react";
import styled from "styled-components";

export interface IBookProps {}

export default function Book(props: IBookProps) {
  console.log(props);

  return (
    <BookStyle>
      <img
        src="https://images-na.ssl-images-amazon.com/images/I/41yixXsFSQL._SX395_BO1,204,203,200_.jpg"
        alt=""
      />
      <BookText>
        <a href="">Computers</a>
        <h5>Node.js Разработка серверных веб-приложений</h5>
        <strong>Дэвид Хэррон</strong>
      </BookText>
    </BookStyle>
  );
}

const BookStyle = styled.div`
  border: 1px solid gray;
  flex: 0 1 180px;

  img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
  }
`;

const BookText = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 5px;

  a {
    font-size: 12px;
    color: gray;
  }

  h5 {
    font-weight: 600;
  }

  strong {
    font-size: 14px;
    color: #acacac;
    font-weight: 300;
  }
`;
