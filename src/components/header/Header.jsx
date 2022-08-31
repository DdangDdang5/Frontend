import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderWrap>
      {/* 조건문 넣어서 페이지별로 다르게 보이게 */}
      <HeaderLeft>경매목록</HeaderLeft>
      <HeaderRight>
        <div>돋보기</div>
        <div>알람</div>
      </HeaderRight>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const HeaderLeft = styled.div`
  font: bold;
  margin: 10px;
`;
const HeaderRight = styled.div`
  display: flex;
  div {
    margin: 10px;
  }
`;
export default Header;
