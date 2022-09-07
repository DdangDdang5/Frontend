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

      <MyProfileWrap>
        <MyImgContainer>
          <MyImgBox>
            {Img}
            {/* <div>사진</div> */}
          </MyImgBox>
        </MyImgContainer>

        <MyNickContainer>
          <NickBox>
            <div className="nickName">닉네임</div>
            <div
              className="profileEdit"
              onClick={() => {
                navigate("/profileEdit");
              }}>
              프로필 수정
            </div>
          </NickBox>
          <LevelBox>
            <div className="levelIcon">등급</div>
          </LevelBox>
        </MyNickContainer>
      </MyProfileWrap>

      <MyStateWrap>
        <div className="stateBox">
          <div className="title">나의 경매</div>
          <div className="count">12</div>
        </div>
        <StateBox>
          <div className="title">참여 경매</div>
          <div className="count">36</div>
        </StateBox>
        <div className="stateBox">
          <div className="title">관심 경매</div>
          <div className="count">50</div>
        </div>
      </MyStateWrap>
      <MyProfileListWrap>
        <ListContainer>
          <div className="listIcon">
            <div></div>
          </div>
          <div className="listTilte">이벤트</div>
        </ListContainer>
        <ListContainer>
          <div className="listIcon">
            <div></div>
          </div>
          <div className="listTilte">공지사항</div>
        </ListContainer>
        <ListContainer>
          <div className="listIcon">
            <div></div>
          </div>
          <div className="listTilte">자주 묻는 질문</div>
        </ListContainer>
      </MyProfileListWrap>
      <Footer />
    </MyPageLayout>
  );
};

const MyPageLayout = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
  flex-direction: column;
`;
const MyProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 20px;
  margin: 93px 20px 20px 20px;
`;
const MyImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 73px;

  height: 73px;
`;
const MyImgBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  img {
    display: flex;
    width: 73px;
    height: 100%;
    border-radius: 120px;
  }
  /* div {
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
  } */
`;
const MyNickContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
const NickBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 88px;
  height: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 1px;
  .nickName {
    font-size: 20px;
    font-weight: 700;
  }
  .profileEdit {
    font-size: 14px;
    font-weight: 400;
    color: #9b9b9b;
  }
`;
const LevelBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  .levelIcon {
    display: flex;
    width: 46px;
    height: 46px;
    border-radius: 46px;
    justify-content: center;
    align-items: center;

    background-color: grey;
  }
`;
const MyStateWrap = styled.div`
  display: flex;
  position: relative;
  width: 350px;
  margin: 0px 20px 40px 20px;
  height: 86px;
  justify-content: space-evenly;
  align-items: center;
  background-color: #ededed;

  .stateBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 114px;
    height: 100%;
    margin: 16px 0px;

    .title {
      display: flex;

      font-size: 16px;
      font-weight: 400px;
      color: #6d6d6d;
    }
    .count {
      font-size: 20px;
      font-weight: 700;
    }
  }
`;
const StateBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 114px;
  height: 26px;

  border-left: 1px solid black;
  border-right: 1px solid black;

  .title {
    display: flex;

    font-size: 16px;
    font-weight: 400px;
    color: #6d6d6d;
  }
  .count {
    font-size: 20px;
    font-weight: 700;
  }
`;
const MyProfileListWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 20px;
  gap: 40px;
`;
const ListContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-start;
  align-items: center;

  .listIcon {
    display: flex;
    width: 24px;
    height: 24px;
    div {
      width: 100%;
      height: 100%;
      border-radius: 24px;
      background-color: #d9d9d9;
    }
  }
  .listTilte {
    display: flex;
    font-size: 16px;
    font-weight: 400;
  }
`;
export default MyPage;
