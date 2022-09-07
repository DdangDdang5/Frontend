import React from "react";
import Header from "../../components/header/Header";
import styled from "styled-components";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const Img = (
    <img src="https://t1.daumcdn.net/cfile/blog/231A3A3A557C6B3D0A" alt="" />
  );

  return (
    <MyPageLayout>
      <Header />

      <MyProfile>
        <MyImgWrap>
          <MyImgBox>
            {Img}
            <div>사진</div>
          </MyImgBox>
        </MyImgWrap>

        <div>
          <div>닉네임</div>
          <div>정보</div>
        </div>
      </MyProfile>

      <div>
        <div>매너온도</div>
        <div>매너온도 점수</div>
      </div>

      <MyStateContainer>
        <button>판매내역</button>
        <button>구매내역</button>
        <button>관심목록</button>
      </MyStateContainer>
      <div>
        <button
          onClick={() => {
            navigate("/profileEdit");
          }}>
          프로필 수정
        </button>
        <div>키워드 알림</div>
        <div></div>
        <div></div>
      </div>
			
      <Footer />
    </MyPageLayout>
  );
};

const MyPageLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  background-color: beige;
`;
const MyProfile = styled.div`
  display: flex;
  flex-direction: column;

  margin: 70px 10px 10px 10px;
  background-color: skyblue;
  margin-top: 70px;
`;
const MyImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
  margin-top: 32px;

  background-color: aqua;
`;
const MyImgBox = styled.div`
  display: flex;
  width: 120px;
  height: 100%;

  img {
    display: flex;
    width: 120px;
    height: 120px;
    border-radius: 120px;
  }
  div {
    display: flex;
    position: absolute;
    top: 186px;
    left: 219px;
    width: 36px;
    height: 36px;
    border-radius: 36px;
    align-items: center;
    justify-content: center;
    background-color: white;
  }
`;
const MyStateContainer = styled.div`
  display: flex;
  margin: 0px 10px 10px 10px;
  button {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;

export default MyPage;
