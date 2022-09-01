// React import
import React from "react";

// Style import
import {
  HeaderContainer,
  HeaderContent,
  HeaderIconContainer,
  Logo,
} from "./Header.styled";

const Header = ({ borderBottom, logo }) => {
  return (
    <>
      {logo ? (
        <HeaderContainer borderBottom={borderBottom}>
          <HeaderContent>
            <Logo>땅땅</Logo>
            <HeaderIconContainer>
              <img src="maskable.png" alt="search" />
              <img src="maskable.png" alt="alarm" />
            </HeaderIconContainer>
          </HeaderContent>
        </HeaderContainer>
      ) : (
        <HeaderContainer borderBottom={borderBottom}>
          <HeaderContent>
            <img src="maskable.png" alt="back" />
            <HeaderIconContainer>
              <img src="maskable.png" alt="search" />
              <img src="maskable.png" alt="alarm" />
            </HeaderIconContainer>
          </HeaderContent>
        </HeaderContainer>
      )}
    </>
  );
};

export default Header;
