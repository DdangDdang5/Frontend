// React import
import React from "react";

// Package import
import { useNavigate } from "react-router-dom";

// Shared import
import { Chat, Home, MyPage, Search } from "../../shared/images";

// Style import
import {
  FooterContainer,
  FooterIcon,
  FooterItemContainer,
} from "./Footer.styled";

const Footer = ({ home, search, chat, myPage }) => {
  const navigate = useNavigate();

  return (
    <FooterContainer>
      <FooterItemContainer>
        <FooterIcon onClick={() => navigate("/")}>
          {home ? <Home nowpage="true" /> : <Home />}
          <span>홈</span>
        </FooterIcon>
        <FooterIcon onClick={() => navigate("/search")}>
          {search ? <Search nowpage="true" /> : <Search />}
          <span>검색</span>
        </FooterIcon>
        <FooterIcon onClick={() => navigate("/chatList")}>
          {chat ? <Chat nowpage="true" /> : <Chat />}
          <span>채팅</span>
        </FooterIcon>
        <FooterIcon onClick={() => navigate("/myPage")}>
          {myPage ? <MyPage nowpage="true" /> : <MyPage />}
          <span>마이페이지</span>
        </FooterIcon>
      </FooterItemContainer>
    </FooterContainer>
  );
};

export default Footer;
