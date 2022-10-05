// React import
import React, { useEffect, useState } from "react";

// Redux import
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { _MyPageData } from "../../redux/modules/MyPageSlice";

// Package import
import { isIOS } from "react-device-detect";

// Component import
import Header from "../../components/header/Header";
import styled from "styled-components";
import Footer from "../../components/footer/Footer";
import MyPageList from "../../components/myPage/MyPageList";
import PageModal from "../../components/modal/PageModal";

// Element & Shared import
import { findGrade } from "../../shared/Grade";
import {
  Event,
  BasicProfile,
  Notice,
  Questions,
  ProfileEdit,
  Login,
  Logout,
} from "../../shared/images";

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.myPage?.myPage);
  const memberId = sessionStorage?.getItem("memberId");

  const [optionVisible, setOptionVisible] = useState(false); // alert 모달
  const [optionContent, setOptionContent] = useState({
    modalText: "",
    btnText: "",
    isConfirm: false,
    onClickBtn: () => {},
  });

  const auctionNickname = data?.nickname?.includes("kakao")
    ? data.nickname.split("kakao")[0] + "kakao"
    : data.nickname;

  const handleLogout = () => {
    setOptionContent({
      modalText: "\n로그아웃 하시겠습니까?",
      btnText: "로그아웃하기",
      isConfirm: true,
      onClickBtn: () => {
        sessionStorage.clear();
        navigate("/");
      },
    });
    setOptionVisible(true);

    // if (window.confirm("로그아웃 하시겠습니까? ")) {
    //   sessionStorage.clear();
    //   navigate("/");
    // }
  };

  const handleLogIn = () => {
    setOptionContent({
      modalText: "로그인이 필요합니다.\n 로그인하시겠습니까?",
      btnText: "로그인하기",
      isConfirm: true,
      onClickBtn: () => {
        navigate("/login");
      },
    });
    setOptionVisible(true);
  };

  const basicProfileImg = () => {
    if (memberId === null) {
      return <BasicProfile onClick={() => handleLogIn()} />;
    } else {
      if (data?.profileImgUrl === null || data?.profileImgUrl === undefined) {
        return <BasicProfile />;
      } else {
        return <img src={data?.profileImgUrl} alt="" />;
      }
    }
  };

  useEffect(() => {
    dispatch(_MyPageData(memberId));
  }, [memberId, JSON.stringify[data]]);

  return (
    <>
      <MyPageLayout>
        {/* <Header pageName="마이페이지" alarm={true} /> */}
        <Header pageName="마이페이지" />

        <MyPageWrap isIOS={isIOS}>
          <MyProfileWrap>
            <MyImgContainer>
              <MyImgBox>{basicProfileImg()}</MyImgBox>
            </MyImgContainer>

            <MyNickContainer>
              <NickBox>
                {memberId !== null ? (
                  <>
                    <div className="nickName">
                      {data?.nickname?.length > 6
                        ? data?.nickname?.split("kakao")[0] + "kakao"
                        : data?.nickname}
                    </div>
                    <div
                      className="myPageEdit"
                      onClick={() => {
                        navigate("/myPageEdit");
                      }}>
                      프로필 수정
                    </div>
                  </>
                ) : (
                  <>
                    <div className="needNickName" onClick={() => handleLogIn()}>
                      로그인이 필요합니다.
                    </div>
                  </>
                )}
              </NickBox>
              {memberId !== null ? (
                <>
                  {" "}
                  <MyGradeImgWrap
                    onClick={() =>
                      memberId && navigate(`/myGrade/${memberId}`)
                    }>
										<div></div>
                    {findGrade(data?.trustGrade)}
                  </MyGradeImgWrap>
                </>
              ) : (
                <></>
              )}
            </MyNickContainer>
          </MyProfileWrap>

          <MyStateWrap>
            {memberId === null ? (
              <>
                <div className="MyStateWrap" onClick={() => handleLogIn()}>
                  <div className="stateBox">
                    <div className="title">나의 경매</div>
                    <div className="count">0</div>
                  </div>
                  <StateBox>
                    <div className="title">참여 경매</div>
                    <div className="count">0</div>
                  </StateBox>
                  <div className="stateBox">
                    <div className="title">관심 경매</div>
                    <div className="count">0</div>
                  </div>
                </div>{" "}
              </>
            ) : (
              <>
                <div className="MyStateWrap">
                  <div
                    className="stateBox"
                    onClick={() => navigate("/myPageMyAuction")}>
                    <div className="title">나의 경매</div>
                    <div className="count">{data?.myAuctionCnt}</div>
                  </div>
                  <StateBox>
                    <div
                      className="title"
                      onClick={() => navigate("/myPageParticipationAuction")}>
                      참여 경매
                    </div>
                    <div
                      className="count"
                      onClick={() => navigate("/myPageParticipationAuction")}>
                      {data?.myParticipantCnt}
                    </div>
                  </StateBox>
                  <div
                    className="stateBox"
                    onClick={() => navigate("/MyPageInterestAuction")}>
                    <div className="title">관심 경매</div>
                    <div className="count">{data?.myFavoriteCnt}</div>
                  </div>
                </div>
              </>
            )}
          </MyStateWrap>
          <MyProfileListWrap>
            <MyPageList
              icon={<Event />}
              listName={`이벤트`}
              onClick={() => navigate(`/eventList`)}
            />
            <MyPageList
              icon={<Notice />}
              listName={`공지사항`}
              onClick={() => navigate(`/notice`)}
            />
            <MyPageList
              icon={<Questions />}
              listName={`자주 묻는 질문`}
              onClick={() => navigate(`/question`)}
            />
            <MyPageList
              icon={<ProfileEdit />}
              listName={`개인 정보 수정`}
              onClick={() => navigate(`/myPageEdit`)}
            />

            {memberId === null ? (
              <MyPageList
                icon={<Login />}
                listName={`로그인`}
                onClick={() => handleLogIn()}
              />
            ) : (
              <MyPageList
                icon={<Logout />}
                listName={`로그아웃`}
                onClick={() => handleLogout()}
              />
            )}
          </MyProfileListWrap>
        </MyPageWrap>
        <Footer myPage={true} />
      </MyPageLayout>

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

const MyPageLayout = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
  flex-direction: column;
`;
const MyPageWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  height: ${(props) =>
    props.isIOS ? `calc(100vh - 150px)` : `calc(100vh - 140px)`};
  overflow: auto;
`;
const MyProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 20px;
  margin: 15px 20px 20px 20px;
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
  svg {
    display: flex;
    width: 73px;
    height: 100%;
    border-radius: 120px;
  }
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
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 1px;
  .nickName {
    font-size: ${(props) => props.theme.fontSizes.lg};
    font-weight: ${(props) => props.theme.fontWeights.bold};
    line-height: 28px;
  }
  .myPageEdit {
    font-size: 14px;
    font-weight: 400;
    color: #9b9b9b;
  }
  .needNickName {
    font-size: ${(props) => props.theme.fontSizes.lg};
    font-weight: ${(props) => props.theme.fontWeights.bold};
    line-height: 28px;
  }
`;

export const MyGradeImgWrap = styled.div`
  position: relative;
	right: 20px;

  img {
    width: 38px;
    height: 38px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  div {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.Gray1};

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const MyStateWrap = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  margin-bottom: 40px;
  height: 86px;

  .MyStateWrap {
    display: flex;
    width: 350px;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 8px;
    background-color: ${(props) => props.theme.colors.Gray1};
    /* box-shadow: 1px 1px 4px 1px #dadce0; */

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
        font-size: ${(props) => props.theme.fontSizes.ms};
        font-weight: ${(props) => props.theme.fontWeights.normal};
        color: ${(props) => props.theme.colors.Gray4};
      }
      .count {
        font-size: ${(props) => props.theme.fontSizes.lg};
        font-weight: ${(props) => props.theme.fontWeights.bold};
      }
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
    justify-content: center;
    width: 100%;
    font-size: ${(props) => props.theme.fontSizes.ms};
    font-weight: ${(props) => props.theme.fontWeights.normal};
    color: #6d6d6d;
  }
  .count {
    display: flex;
    width: 100%;
    justify-content: center;
    font-size: ${(props) => props.theme.fontSizes.lg};
    font-weight: ${(props) => props.theme.fontWeights.bold};
  }
`;
const MyProfileListWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 20px;
  gap: 40px;
`;

export default MyPage;
