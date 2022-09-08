// React import
import React from "react";

// Package import
import { useNavigate } from "react-router-dom";

// Style import
import {
  HeaderContainer,
  HeaderContent,
  HeaderIconContainer,
  HeaderTitle,
  Logo,
  PageTitle,
} from "./Header.styled";

const Header = ({ borderBottom, logo, page, write, movePage }) => {
  const navigate = useNavigate();

  return (
    <HeaderContainer borderBottom={borderBottom}>
      <HeaderContent>
        {logo ? (
          <Logo onClick={() => navigate("/")}>땅땅</Logo>
        ) : (
          <HeaderTitle>
            <img src="maskable.png" alt="back" onClick={() => navigate(-1)} />
            <PageTitle>{page}</PageTitle>
          </HeaderTitle>
        )}
        <HeaderIconContainer>
          {write ? (
            <span onClick={movePage}>완료</span>
          ) : (
            <>
              <img
                src="maskable.png"
                alt="search"
                onClick={() => navigate("/search")}
              />
              <img src="maskable.png" alt="alarm" />
            </>
          )}
        </HeaderIconContainer>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
