// React import
import React from "react";

// Package import
import styled from "styled-components";

// Component & Shared import
import Header from "../../components/header/Header";
import NotPage from "../../shared/images/icon/NotPage.png";

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Header back={true} />

      <NotFoundContent>
				<img src={NotPage} alt="not-page" />
        <span>페이지를 찾을 수 없어요</span>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

const NotFoundContainer = styled.div`
  width: 100%;
`;

const NotFoundContent = styled.div`
  width: 100%;

  position: absolute;
  top: 70px;
  bottom: 70px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

  img {
    width: 200px;
    height: 150px;
  }

  span {
    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: ${(props) => props.theme.fontWeights.normal};
    font-size: ${(props) => props.theme.fontSizes.md};
    line-height: 140%;
  }
`;

export default NotFound;
