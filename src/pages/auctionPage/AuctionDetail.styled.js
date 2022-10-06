// Package import
import styled from "styled-components";

export const AuctionDetailLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
export const DetailBodyWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 115px);
  overflow: scroll;
`;
export const ItemImgContainer = styled.div`
  display: flex;
`;
export const DetailBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 0px 20px; */
`;
export const DetailBodyProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 97px;
  height: 97px;
  margin-bottom: 15px;
  border-bottom: 1px solid #ebeef3;
  .DetailBodyProfile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-right: 18px;
  }
`;
export const DetailBodyProfileImg = styled.div`
  display: flex;
  align-items: center;
  padding-left: 18px;
  .noOneImg {
    height: 48px;
    width: 48px;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    margin-right: 11px;
  }
  img {
    height: 48px;
    width: 48px;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    margin-right: 11px;
  }
`;
export const DetailBodyProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  .nickName {
    font-size: ${(props) => props.theme.fontSizes.ms};
    font-weight: ${(props) => props.theme.fontWeights.bold};
    line-height: 24px;
  }
  .trustCount {
    font-size: ${(props) => props.theme.fontSizes.ms};
    font-weight: ${(props) => props.theme.fontWeights.normal};
    color: ${(props) => props.theme.colors.Gray4};
    line-height: 24px;
  }
`;

export const DetailBodyBox = styled.div`
  display: flex;
  flex-direction: column;
`;
export const DetailBodyTitle = styled.div`
  display: flex;
  padding: 0px 20px;
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  line-height: 30px;
  margin-bottom: 16px;
`;
export const DetailBodySelectTag = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  padding: 0px 20px;
  div {
    display: flex;
    border-radius: 20px;
    padding: 1px 6px;
    margin-right: 6px;

    font-size: ${(props) => props.theme.fontSizes.sm};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    background-color: ${(props) => props.theme.colors.Blue1};
    color: ${(props) => props.theme.colors.White};
    line-height: 21px;
  }
  .region {
    display: flex;
    border-radius: 20px;
    padding: 1px 6px;
    margin-right: 6px;

    font-size: ${(props) => props.theme.fontSizes.sm};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    background-color: ${(props) => props.theme.colors.White};
    color: ${(props) => props.theme.colors.Blue1};
    border: 1px solid #4d71ff;
    line-height: 21px;
  }
`;
export const DetailBodyContent = styled.div`
  display: flex;
  padding: 0px 20px;
  word-break: break-all;
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  line-height: 36px;
  height: 100%;
  white-space: pre-line;
`;
export const DetailBodyViewTag = styled.div`
  display: flex;
  padding: 0px 20px;
  flex-direction: row;
  align-items: center;
  height: 49px;
  gap: 0 9px;
  margin-bottom: 6px;

  div {
    font-size: ${(props) => props.theme.fontSizes.ms};
    font-weight: ${(props) => props.theme.fontWeights.normal};
    color: ${(props) => props.theme.colors.Gray3};
  }
`;

export const DetailBodyItemTag = styled.div`
  display: flex;
  padding: 0px 20px;
  flex-direction: row;
  align-items: center;
  height: 25px;
  gap: 6px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  div {
    display: flex;
    border-radius: 20px;
    padding: 1px 6px;

    font-size: ${(props) => props.theme.fontSizes.sm};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    background-color: ${(props) => props.theme.colors.Blue1};
    color: ${(props) => props.theme.colors.White};
    line-height: 21px;
  }
`;

export const CommentCountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 57px;
  padding: 0px 20px;
  border-top: 1px solid #dedede;
  gap: 8px;
  h3 {
    font-size: ${(props) => props.theme.fontSizes.lg};
    font-weight: ${(props) => props.theme.fontWeights.bold};
  }
  p {
    font-size: ${(props) => props.theme.fontSizes.lg};
    font-weight: ${(props) => props.theme.fontWeights.normal};
    color: #9b9b9b;
  }

  img {
    width: 16px;
    height: 16px;
  }

  svg {
    width: 10px;
    height: 18px;
    path {
      fill: ${(props) => props.theme.colors.Gray3};
    }
  }
`;

export const CommentCountWrap = styled.div`
  display: flex;
  gap: 12px;
  p {
    font-size: ${(props) => props.theme.fontSizes.lg};
    font-weight: ${(props) => props.theme.fontWeights.normal};
    color: ${(props) => props.theme.colors.Blue1};
  }
`;

export const CommentCountTitle = styled.p`
  font-weight: 700 !important;
  color: black !important;
`;

export const DetailFooterWrap = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 116px;
  flex-direction: column;
  position: absolute;
  bottom: 0;
`;
export const DetailFooterTimeContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 42px;
  background-color: ${(props) => props.theme.colors.Red};
  color: white;
  gap: 0 8px;
  span {
    font-size: ${(props) => props.theme.fontSizes.sm};
    font-weight: ${(props) => props.theme.fontWeights.normal};
    line-height: 20px;
  }
  .auctionState {
    font-size: ${(props) => props.theme.fontSizes.lg};
    font-weight: ${(props) => props.theme.fontWeights.bold};
    line-height: 30px;
  }
`;
export const DetailFooterContainer = styled.div`
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const FooterBidContainer = styled.div`
  margin: 13px 20px 14px 0px;
`;

export const FooterLeftBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  margin: 10px 0px 11px 20px;
  gap: 12px;
  .likeBox {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }
  .priceBox {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    height: 100%;

    .presentPrice {
      display: flex;
      font-size: ${(props) => props.theme.fontSizes.sm};
      font-weight: ${(props) => props.theme.fontWeights.normal};
      color: ${(props) => props.theme.colors.Gray3};
    }
    .price {
      display: flex;
      font-size: ${(props) => props.theme.fontSizes.xxl};
      font-weight: ${(props) => props.theme.fontWeights.bold};
    }
  }
`;

export const FooterRightBox = styled.div`
  display: flex;
  margin: 13px 20px 14px 0px;
  button {
    display: flex;
    width: 165px;
    height: 47px;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    color: ${(props) => props.theme.colors.White};
    background-color: ${(props) => props.theme.colors.Blue1};
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 2% auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AuctionJoinIcon = styled.div`
  width: 104px;
  height: 104px;

  background-color: ${(props) => props.theme.colors.White};
  border-radius: 50%;

  position: absolute;
  top: -30%;
  right: 50%;
  transform: translate(50%, 50%);

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 68px;
    height: 70px;

    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }
`;

export const AuctionJoinIconBackground = styled.div`
  width: 82px;
  height: 82px;

  background-color: ${(props) => props.theme.colors.Gray1};
  border-radius: 50%;

  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
`;

export const AuctionJoinModalContent = styled.div`
  padding: 20px;
`;

export const AuctionJoinCloseWrap = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

export const AuctionNowPriceWrap = styled.div`
  margin-top: 45px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;

  span {
    color: ${(props) => props.theme.colors.Black};
    font-size: ${(props) => props.theme.fontSizes.md};
    font-weight: ${(props) => props.theme.fontWeights.normal};
  }
`;

export const AuctionNowPrice = styled.span`
  font-size: ${(props) => props.theme.fontSizes.xl} !important;
  font-weight: ${(props) => props.theme.fontWeights.medium} !important;
`;

export const AuctionJoinInfo = styled.p`
  margin-top: 1px;

  color: ${(props) => props.theme.colors.Gray3};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: ${(props) => props.theme.fontWeights.normal};

  text-align: center;
`;

export const AuctionJoinInput = styled.input`
  width: calc(100% - 30px);
  height: 22px;
  margin-top: 20px;
  padding: 16px 15px;

  background: ${(props) => props.theme.colors.White};
  border: 1px solid ${(props) => props.theme.colors.Gray1};
  border-radius: 8px;
`;

export const AuctionJoinInputInfo = styled.p`
  height: 20px;
  margin-top: 8px;

  color: ${(props) => props.theme.colors.Red};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: ${(props) => props.theme.fontWeights.normal};
`;
