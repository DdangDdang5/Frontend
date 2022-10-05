// Package import
import styled, { css } from "styled-components";

export const AuctionListLayout = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

export const ListCategoryWrap = styled.div`
  margin: 70px 0px 12px 0px;
  height: 48px;
  padding: 0px 20px;

  color: ${(props) => props.theme.colors.Black};

  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CategoryWrap = styled.div`
  width: fit-content;

  border-radius: 100px;
  border: 1px solid
    ${(props) =>
      props.idx
        ? props.state === "서울 전체"
          ? props.theme.colors.Gray1
          : props.theme.colors.Blue1
        : props.state === "전체 품목"
        ? props.theme.colors.Gray1
        : props.theme.colors.Blue1};
`;

export const CategoryBtn = styled.div`
  height: 30px;
  border-radius: 100px;

  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.idx
      ? props.state === "서울 전체"
        ? css`
            color: ${(props) => props.theme.colors.Black};
            background-color: ${(props) => props.theme.colors.White};
          `
        : css`
            color: ${(props) => props.theme.colors.Blue1};
            background-color: ${(props) => props.theme.colors.SkyBlue};
          `
      : props.state === "전체 품목"
      ? css`
          color: ${(props) => props.theme.colors.Black};
          background-color: ${(props) => props.theme.colors.White};
        `
      : css`
          color: ${(props) => props.theme.colors.Blue1};
          background-color: ${(props) => props.theme.colors.SkyBlue};
        `}

  svg {
    width: 12px;
    height: 7px;
    padding-right: 12px;

    path {
      fill: ${(props) =>
        props.idx
          ? props.state === "서울 전체"
            ? props.theme.colors.Black
            : props.theme.colors.Blue1
          : props.state === "전체 품목"
          ? props.theme.colors.Black
          : props.theme.colors.Blue1};
    }
  }
`;

export const CategoryBtnText = styled.div`
  margin: 4px 4px 4px 12px;

  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  line-height: 24px;
`;

export const ListContents = styled.div`
  width: calc(100% - 40px);
  height: ${(props) =>
    props.isIOS ? `calc(100vh - 200px)` : `calc(100vh - 190px)`};
  margin: auto;
  padding: 0px 20px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
  overflow: auto;
`;
