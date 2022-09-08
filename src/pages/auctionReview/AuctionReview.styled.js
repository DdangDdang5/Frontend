// Package import
import { type } from "@testing-library/user-event/dist/type";
import styled from "styled-components";

export const AuctionReviewContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const AuctionReviewContent = styled.div`
  width: 100%;

  color: ${(props) => props.theme.colors.Black};

  position: absolute;
  top: 70px;
  bottom: 70px;
`;

export const ReviewItemWrap = styled.div`
  padding: 16px 20px;
  background-color: ${(props) => props.theme.colors.Gray1};

  font-size: ${(props) => props.theme.fontSizes.sm};
`;

export const ReviewItemWrapTitle = styled.span`
  margin-bottom: 8px;

  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const ReviewItem = styled.div`
  margin: 8px auto;

  display: flex;

  img {
    width: 75px;
    height: 75px;
    border-radius: 8px;
  }
`;

export const ReviewItemContent = styled.div`
  width: calc(100% - 93px);
  margin-left: 18px;
`;

export const TagWrap = styled.div`
  margin-bottom: 10px;

  display: flex;
  gap: 4px;

  span {
    padding: 2px 6px;

    background-color: ${(props) => props.backgroundColor};
    border-radius: 100px;

    color: ${(props) => props.color};
    font-weight: ${(props) => props.theme.fontWeights.medium};
  }
`;

export const ReviewItemTitle = styled.span`
  width: 100%;
  margin: 4px auto;

  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.normal};

  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ReviewItemPriceWrap = styled.div`
  font-size: ${(props) => props.theme.fontSizes.sm};

  display: flex;
  align-items: center;
  gap: 4px;

  span {
    color: ${(props) => props.theme.colors.Gray3};
    font-weight: ${(props) => props.theme.fontWeights.normal};
  }
`;

export const ReviewItemPrice = styled.span`
  color: ${(props) => props.theme.colors.Black} !important;
  font-size: ${(props) => props.theme.fontSizes.md} !important;
  font-weight: ${(props) => props.theme.fontWeights.medium} !important;
`;

export const QuestionList = styled.div`
  width: 100%;
  padding: 32px 0;

  position: absolute;
  top: 154px;
  bottom: 0;

  display: flex;
  flex-direction: column;
  gap: 40px;
  overflow-y: scroll;
`;

export const AnswerContainer = styled.div`
  margin: auto 20px;

  p {
    font-size: ${(props) => props.theme.fontSizes.ms};
    font-weight: ${(props) => props.theme.fontWeights.bold};
  }
`;

export const AnswerList = styled.div`
  margin: 16px 14px auto 14px;

  display: flex;
  justify-content: space-between;
`;

export const AnswerItem = styled.label`
  /* width: 20%; */

  /* background-color: beige; */
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: ${(props) => props.theme.fontWeights.normal};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AnswerRadioBtn = styled.input.attrs({ type: "radio" })`
  width: 48px;
  height: 48px;
  margin-bottom: 4px;

  color: ${(props) => props.theme.colors.Gray1};

  &:checked {
    /* display: none; */
    background: ${(props) => props.theme.colors.Gray3};

    & + span {
      /* border: 2px solid black; */
      display: inline-block;
    }
  }
`;
