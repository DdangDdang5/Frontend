import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import styled from "styled-components";
import Footer from "../../components/footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { _MyPageData, _MyPageInAuction } from "../../redux/modules/MyPageSlice";
import { findGrade } from "../../shared/Grade";
import { BasicProfile } from "../../shared/images";

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.myPage?.myPage);
  const memberId = sessionStorage?.getItem("memberId");
  console.log("22222", data);

  useEffect(() => {
    dispatch(_MyPageData(memberId));
  }, [memberId]);

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까? ")) {
      sessionStorage.clear();
      navigate("/");
    }
  };

  const handleLogIn = () => {
    if (window.confirm("로그인 하시겠습니까? ")) {
      navigate("/login");
    } else {
      navigate("/myPage");
    }
  };
  const noOneImg = () => {
    if (memberId === null) {
      return <BasicProfile onClick={() => handleLogIn()} />;
    } else {
      return <img src={data?.profileImgUrl} alt="" />;
    }
  };

  return (
    <MyPageLayout>
      <Header pageName="마이페이지" alarm={true} />

      <MyProfileWrap>
        <MyImgContainer>
          <MyImgBox>{noOneImg()}</MyImgBox>
        </MyImgContainer>

        <MyNickContainer>
          <NickBox>
            {memberId !== null ? (
              <>
                <div className="nickName">{data?.nickname}</div>
                <div
                  className="profileEdit"
                  onClick={() => {
                    navigate("/profileEdit");
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
          <MyGradeImgWrap onClick={() => navigate(`/myGrade/${memberId}`)}>
            <div></div>
            {findGrade(data?.trustGrade)}
          </MyGradeImgWrap>
        </MyNickContainer>
      </MyProfileWrap>

      <MyStateWrap>
        {memberId === null ? (
          <>
            <div className="MyStateWrap" onClick={() => handleLogIn()}>
              <div
                className="stateBox"
                onClick={() => navigate("/myPageMyAuction")}>
                <div className="title">나의 경매</div>
                <div className="count">0</div>
              </div>
              <StateBox>
                <div
                  className="title"
                  onClick={() => navigate("/myPageParticipationAuction")}>
                  참여 경매
                </div>
                <div className="count">0</div>
              </StateBox>
              <div
                className="stateBox"
                onClick={() => navigate("/MyPageInterestAuction")}>
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
                <div className="count">{data?.myParticipantCnt}</div>
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
        <ListContainer>
          <div className="listIcon">
            <div></div>
          </div>
          <div className="listTitle">이벤트</div>
        </ListContainer>
        <ListContainer>
          <div className="listIcon">
            <div></div>
          </div>
          <div className="listTitle">공지사항</div>
        </ListContainer>
        <ListContainer>
          <div className="listIcon">
            <div></div>
          </div>
          <div className="listTitle">자주 묻는 질문</div>
        </ListContainer>
        <ListContainer>
          <div className="listIcon">
            <div></div>
          </div>
          {memberId === null ? (
            <div className="listTitle" onClick={() => handleLogIn()}>
              로그인
            </div>
          ) : (
            <div className="listTitle" onClick={() => handleLogout()}>
              로그아웃
            </div>
          )}
        </ListContainer>
      </MyProfileListWrap>
      <Footer myPage={true} />
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
  svg {
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
  .profileEdit {
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

export const MyGradeImgWrap = styled.div`
  position: relative;
  right: 20px;

  svg {
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
    background-color: ${(props) => props.theme.colors.Gray2};

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -10;
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
    background-color: #ededed;
    justify-content: space-evenly;
    align-items: center;
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
  .listTitle {
    display: flex;
    font-size: 16px;
    font-weight: 400;
  }
`;
export default MyPage;
