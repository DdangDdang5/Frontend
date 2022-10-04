// React import
import React from "react";

// Component & Shared import
import Header from "../../components/header/Header";
import NotPage from "../../shared/images/icon/NotPage.png";

// Style import
import { NotFoundContainer, NotFoundContent } from "./NotFound.styled";

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

export default NotFound;
