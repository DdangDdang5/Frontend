// React import
import React, { useState } from "react";

// Package import
import { useNavigate } from "react-router-dom";
import { isIOS } from "react-device-detect";

// Component & Shared import
import PageModal from "../modal/PageModal";
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

  const [optionVisible, setOptionVisible] = useState(false); // alert 모달
  const [optionContent, setOptionContent] = useState({
    modalText: "",
    btnText: "",
    isConfirm: false,
    onClickBtn: () => {},
  });

	// 1:1 채팅방 목록 화면으로 이동
  const moveChatList = (memberId) => {
    if (!memberId) {
      setOptionContent({
        modalText: "로그인이 필요합니다.\n 로그인하시겠습니까?",
        btnText: "로그인하기",
        isConfirm: true,
        onClickBtn: () => navigate("/login"),
      });
      setOptionVisible(true);
    } else {
      navigate("/chatList");
    }
  };

  return (
    <>
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

			{/* alert 모달 */}
      <PageModal
        visible={optionVisible}
        setVisible={setOptionVisible}
        modalText={optionContent.modalText}
        btnText={optionContent.btnText}
        isConfirm={optionContent.isConfirm}
        onClickBtn={optionContent.onClickBtn}
      />
    </>
  );
};

export default Footer;
