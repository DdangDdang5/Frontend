// React import
import React from "react";

// Package import
import { useNavigate } from "react-router-dom";
import { isIOS } from "react-device-detect";

// Shared import
import { Chat, Home, MyPage, SearchImg } from "../../shared/images";

// Style import
import {
  FooterContainer,
  FooterIcon,
  FooterItemContainer,
} from "./Footer.styled";

const Footer = ({ home, search, chat, myPage }) => {
  const navigate = useNavigate();

  const memberId = sessionStorage.getItem("memberId");

  const moveChatList = (memberId) => {
    if (!memberId) {
      if (window.confirm("로그인이 필요합니다. 로그인하시겠습니까?")) {
        navigate("/login");
      }
    } else {
      navigate("/chatList");
    }
  };

  return (
    <FooterContainer isIOS={isIOS}>
      <FooterItemContainer>
        <FooterIcon onClick={() => navigate("/")}>
          {home ? <Home nowpage="true" /> : <Home />}
          <span>홈</span>
        </FooterIcon>
        <FooterIcon onClick={() => navigate("/search")}>
          {search ? <SearchImg nowpage="true" /> : <SearchImg />}
          <span>검색</span>
        </FooterIcon>
        <FooterIcon onClick={() => moveChatList(memberId)}>
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
