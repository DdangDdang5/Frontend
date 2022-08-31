import React from "react";
import Header from "../../components/header/Header";
import styled from "styled-components";

const MyPage = () => {
  return (
    <MyPageLayout>
      <Header />
      <div>
        <div>프로필이미지</div>
        <div>닉네임</div>
      </div>
    </MyPageLayout>
  );
};

const MyPageLayout = styled.div`
  display: flex;
`;
export default MyPage;
