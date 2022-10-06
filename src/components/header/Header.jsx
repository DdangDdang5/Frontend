// React import
import React, { useState } from "react";

//Redux import
import { useDispatch } from "react-redux";

// Package import
import { useNavigate } from "react-router-dom";

// Component import
import OptionModal from "../modal/OptionModal";

// Shared import
import {
  Alarm,
  Back,
  Close,
  Menu,
  Logo,
  SearchImg,
  Share,
} from "../../shared/images";

// Style import
import {
  HeaderContainer,
  HeaderContent,
  HeaderIconContainer,
  HeaderTitle,
  PageTitle,
  SaveBtn,
} from "./Header.styled";
import PageModal from "../modal/PageModal";

// props 정리
// 1. left
// - logo, back(이전버튼), close(닫기 버튼), pageName(화면 이름) -> true/false
// 2. right
// - search(검색 버튼), alerm(알림 버튼), menu(메뉴 버튼), share(공유 버튼) -> true/false
// - save(완료, 등록, 삭제 등 저장버튼) -> { type: "완료", state: false }
// 3. function
// - onClickBtn(버튼 클릭 이벤트 함수), onClickSave(완료, 등록, 삭제 등 저장 버튼 이벤트 함수) -> function

const Header = ({
  logo,
  back,
  close,
  pageName,
  search,
  alarm,
  menu,
  share,
  save,
  onClickBtn,
  onClickSave,
  onClickTitle,
  onClickBackBtn,
  color,
}) => {
  const navigate = useNavigate();
  const [optionVisible, setOptionVisible] = useState(false); // alert 모달
  const [optionContent, setOptionContent] = useState({
    modalText: "",
    btnText: "",
    isConfirm: false,
    onClickBtn: () => {},
  });

  const Declaration = () => {
    setOptionContent({
      modalText: "\n서비스 준비중입니다",
    });

    setOptionVisible(true);
  };

  return (
    <>
      <HeaderContainer>
        <HeaderContent color={color}>
          {/* left */}
          <HeaderTitle>
            {back ? (
              <Back
                onClick={onClickBackBtn ? onClickBackBtn : () => navigate(-1)}
              />
            ) : null}
            {close ? <Close id="close" onClick={() => navigate(-1)} /> : null}
            {pageName ? (
              <PageTitle onClick={onClickTitle}>{pageName}</PageTitle>
            ) : null}
            {logo ? (
              <Logo id="logo" onClick={() => navigate("/")}>
                땅땅
              </Logo>
            ) : null}
          </HeaderTitle>

          {/* right */}
          <HeaderIconContainer>
            {search ? <SearchImg onClick={() => navigate("/search")} /> : null}
            {alarm ? <Alarm onClick={() => navigate("/notification")} /> : null}
            {share ? <Share onClick={() => Declaration()} /> : null}
            {menu ? <Menu onClick={onClickBtn} /> : null}
            {save ? (
              <SaveBtn onClick={onClickSave} state={save.state}>
                {save.type}
              </SaveBtn>
            ) : null}
          </HeaderIconContainer>
        </HeaderContent>
      </HeaderContainer>
      <PageModal
        visible={optionVisible}
        setVisible={setOptionVisible}
        modalText={optionContent.modalText}
        btnText={optionContent.btnText}
        isConfirm={optionContent.isConfirm}
        onClickBtn={optionContent.onClickBtn}
      />
      ;
    </>
  );
};

export default Header;
