import React from "react";
import Header from "../../components/header/Header";
import styled from "styled-components";
import Footer from "../../components/footer/Footer";

const MyPage = () => {
  const Img = (
    <img src="https://t1.daumcdn.net/cfile/blog/231A3A3A557C6B3D0A" alt="" />
  );

  return (
    <MyPageLayout>
      <Header />

      <MyProfile>
        <div>Img</div>
        <div>
          <div>닉네임</div>
          <div>정보</div>
        </div>
      </MyProfile>

      <MyStateContainer>
        <div>판매내역</div>
        <div>구매내역</div>
        <div>관심목록</div>
      </MyStateContainer>

      <Footer />
    </MyPageLayout>
  );
};

const MyPageLayout = styled.div`
  display: flex;
  flex-direction: column;
`;
const MyProfile = styled.div`
  display: flex;
  margin: 70px 10px 10px 10px;
`;
const MyStateContainer = styled.div`
  display: flex;
  margin: 0px 10px 10px 10px;
  div {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;

export default MyPage;
