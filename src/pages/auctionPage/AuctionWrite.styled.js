// Package import
import styled from "styled-components";

export const AuctionWriteLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const AuctionWriteWrap = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 70px;
  padding: 0px 20px;

  height: ${(props) =>
    props.isIOS ? `calc(100vh - 160px)` : `calc(100vh - 150px)`};
  overflow: scroll;
  .form {
    display: flex;
    flex-direction: column;
  }
`;
export const WriteImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 93px;
  gap: 12px;
  /* height: 93px; */
  /* overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  } */
`;
export const ImgBoxBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-width: 93px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.Blue1};
  background-color: ${(props) => props.theme.colors.SkyBlue};
  .inBoxBtnContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    gap: 5px;
    width: 100%;
    height: 100%;
  }
  .imgCount {
    font-size: ${(props) => props.theme.fontSizes.ssm};
    font-weight: ${(props) => props.theme.fontWeights.normal};
  }
`;

export const ImgBoxWrap = styled.div`
  display: flex;
  min-height: 93px;
  gap: 12px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ImgBox = styled.div`
  display: flex;
  height: 100%;
  min-width: 93px;
  width: 93px;
  gap: 16px;
  position: relative;

  img {
    display: flex;
    object-fit: cover;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .deleteBox {
    position: absolute;
    top: 3px;
    right: 3px;
    width: 14px;
    height: 14px;
    border-radius: 14px;
  }
`;
export const WriteTitleContainer = styled.div`
  display: flex;
  margin: 32px 0px 16px 0px;
  min-height: 24px;
  align-items: center;
  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.bold};

  div {
    margin-left: 5px;
    font-size: ${(props) => props.theme.fontSizes.sm};
    font-weight: ${(props) => props.theme.fontWeights.fontWeights};
    color: ${(props) => props.theme.colors.Gray3};
  }
`;

export const WritePriceWrap = styled.div`
  display: flex;
  position: relative;
  div {
    position: absolute;
    top: 16px;
    right: 11px;
    font-size: ${(props) => props.theme.fontSizes.md};
    font-weight: ${(props) => props.theme.fontWeights.fontWeights};
    color: ${(props) => props.theme.colors.Gray3};
  }
`;

export const WriteInputBox = styled.input`
  display: flex;
  width: 100%;
  min-height: 56px;
  /* 인풋태그 디브 박스 안벗어나게 */
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.colors.Gray2};
  border-radius: 8px;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 9px;
  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.fontWeights};
  letter-spacing: -0.05em;
  line-height: 150%;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
export const WriteBtnBox = styled.button`
  display: flex;
  width: 100%;
  min-height: 48px;
  align-items: center;
  justify-content: space-between;

  background-color: ${(props) => props.theme.colors.White};
  border: 1px solid ${(props) => props.theme.colors.Gray2};
  border-radius: 8px;
  box-sizing: border-box;

  font-size: 18px;
  font-weight: 400;
  padding: 0px 10px;
  .WriteBtnBoxWrap {
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: ${(props) => props.theme.colors.Black};
    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
export const WriteDeliveryStateContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 48px;
  gap: 20px;
  justify-content: center;
`;
export const DirectBtn = styled.button`
  display: flex;
  width: 165px;
  height: 100%;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  border-radius: 100px;
  border: ${(props) =>
    props.state ? "1px solid #4D71FF" : "1px solid #a5a9b6"};
  background-color: ${(props) => (props.state ? "#E9F3FF" : "white")};
  color: ${(props) => (props.state ? "#4D71FF" : "#a5a9b6")};
`;
export const DeliveryBtn = styled.button`
  display: flex;
  width: 165px;
  height: 100%;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  border-radius: 100px;
  border: ${(props) =>
    props.state ? "1px solid #4D71FF" : "1px solid #a5a9b6"};
  background-color: ${(props) => (props.state ? "#E9F3FF" : "white")};
  color: ${(props) => (props.state ? "#4D71FF" : "#a5a9b6")};
`;

export const WriteTitleAuctionDay = styled.div`
  display: flex;

  justify-content: center;
  gap: 20px;
  .btn1 {
    width: 100px;
    height: 48px;
    border-radius: 100px;
    border: ${(props) =>
      props.children[0].props.state === 10
        ? "1px solid #4D71FF"
        : "1px solid #a5a9b6"};
    background-color: ${(props) =>
      props.children[0].props.state === 10 ? "#E9F3FF" : "white"};
    color: ${(props) =>
      props.children[0].props.state === 10 ? "#4D71FF" : "#a5a9b6"};
  }
  .btn5 {
    width: 100px;
    height: 48px;
    border-radius: 100px;
    border: ${(props) =>
      props.children[0].props.state === 30
        ? "1px solid #4D71FF"
        : "1px solid #a5a9b6"};
    background-color: ${(props) =>
      props.children[0].props.state === 30 ? "#E9F3FF" : "white"};
    color: ${(props) =>
      props.children[0].props.state === 30 ? "#4D71FF" : "#a5a9b6"};
  }
  .btn7 {
    width: 100px;
    height: 48px;
    border-radius: 100px;
    border: ${(props) =>
      props.children[0].props.state === 60
        ? "1px solid #4D71FF"
        : "1px solid #a5a9b6"};
    background-color: ${(props) =>
      props.children[0].props.state === 60 ? "#E9F3FF" : "white"};
    color: ${(props) =>
      props.children[0].props.state === 60 ? "#4D71FF" : "#a5a9b6"};
  }
`;
export const WriteTextArea = styled.textarea`
  padding: 10px;
  display: flex;
  width: 100%;
  min-height: 192px;
  box-sizing: border-box;
  resize: none;
  letter-spacing: -0.05em;
  word-spacing: -0.05em;
  line-height: 150%;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.Gray2};
  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.fontWeights};
`;
