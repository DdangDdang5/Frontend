// React import
import React from "react";

// Package import
import { useNavigate } from "react-router-dom";

// Shared import
import {
  Alarm,
  Back,
  Close,
  Menu,
  Logo,
  Search,
  Share,
} from "../../shared/images";

// Style import
import {
  HeaderContainer,
  HeaderContent,
  HeaderIconContainer,
  HeaderTitle,
  PageTitle,
} from "./Header.styled";

// props 정리
// 1. left
// - logo, back(이전버튼), close(닫기 버튼), pageName(화면 이름) -> true/false
// 2. right
// - search(검색 버튼), alerm(알림 버튼), menu(메뉴 버튼), share(공유 버튼) -> true/false
// - save(완료, 등록, 삭제 등 저장버튼) -> { type: "완료" }
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
  handleDelete,
}) => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <HeaderContent>
        {/* left */}
        <HeaderTitle>
          {back ? <Back onClick={() => navigate(-1)} /> : null}
          {close ? <Close onClick={() => navigate(-1)} /> : null}
          {pageName ? <PageTitle>{pageName}</PageTitle> : null}
          {logo ? (
            <Logo className="logo" onClick={() => navigate("/")}>
              땅땅
            </Logo>
          ) : null}
        </HeaderTitle>

        {/* right */}
        <HeaderIconContainer>
          {search ? <Search onClick={() => navigate("/search")} /> : null}
          {alarm ? <Alarm /> : null}
          {share ? <Share /> : null}
          {menu ? <Menu onClick={handleDelete} /> : null}
          {save ? <span onClick={onClickSave}>{save.type}</span> : null}
        </HeaderIconContainer>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
