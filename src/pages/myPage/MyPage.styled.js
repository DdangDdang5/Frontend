// Package import
import styled from "styled-components";

export const MyPageLayout = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
  flex-direction: column;
`;
export const MyPageWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  height: ${(props) =>
    props.isIOS ? `calc(100vh - 150px)` : `calc(100vh - 140px)`};
  overflow: auto;
`;
export const MyProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 20px;
  margin: 15px 20px 20px 20px;
`;
export const MyImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 73px;
  height: 73px;
`;
export const MyImgBox = styled.div`
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
export const MyNickContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
export const NickBox = styled.div`
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

export const MyStateWrap = styled.div`
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
export const StateBox = styled.div`
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
export const MyProfileListWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 20px;
  gap: 40px;
`;
