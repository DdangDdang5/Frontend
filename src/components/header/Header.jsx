// React import
import React from "react";

// Package import
import { useNavigate } from "react-router-dom";

// Style import
import {
  HeaderContainer,
  HeaderContent,
  HeaderIconContainer,
  Logo,
} from "./Header.styled";

const Header = ({ borderBottom, logo }) => {
	const navigate = useNavigate();

  return (
    <>
      {logo ? (
        <HeaderContainer borderBottom={borderBottom}>
          <HeaderContent>
            <Logo onClick={() => navigate('/')}>땅땅</Logo>
            <HeaderIconContainer>
              <img src="maskable.png" alt="search" onClick={() => navigate('/search')}/>
              <img src="maskable.png" alt="alarm" />
            </HeaderIconContainer>
          </HeaderContent>
        </HeaderContainer>
      ) : (
        <HeaderContainer borderBottom={borderBottom}>
          <HeaderContent>
            <img src="maskable.png" alt="back" onClick={() => navigate(-1)}/>
            <HeaderIconContainer>
              <img src="maskable.png" alt="search" onClick={() => navigate('/search')}/>
              <img src="maskable.png" alt="alarm" />
            </HeaderIconContainer>
          </HeaderContent>
        </HeaderContainer>
      )}
    </>
  );
};

export default Header;
