// React import
import React from "react";

// Package import
import styled from "styled-components";

// Shared import
import { UnderArrow } from "../../shared/images";

const QuestionContent = ({ text, onClick, isClick }) => {
  // console.log(isClick);

  return (
    <ContentWrap onClick={onClick}>
      <Body>
        <div className="Q">Q.</div>
        <div>{text}</div>
      </Body>
      <Img isClick={isClick}>
        <UnderArrow />
      </Img>
    </ContentWrap>
  );
};

const ContentWrap = styled.div`
  display: flex;
  flex-direction: row;
  height: 60px;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.colors.Gray2};
  align-items: center;
  justify-content: space-between;
`;

const Body = styled.div`
  display: flex;
  gap: 5px;
  width: 310px;
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.fontWeights};
  color: ${(props) => props.theme.colors.Black};
  line-height: 140%;
  letter-spacing: -0.05em;
  white-space: pre-line;
  .Q {
    font-size: ${(props) => props.theme.fontSizes.md};
    font-weight: ${(props) => props.theme.fontWeights.bold};
    color: ${(props) => props.theme.colors.Blue1};
  }
`;
const Img = styled.div`
  display: flex;
  transform: ${(props) => (props.isClick ? "rotate(180deg)" : "")};
`;
export default QuestionContent;
