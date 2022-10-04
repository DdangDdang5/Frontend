import React from "react";
import styled from "styled-components";

const AnswerContent = ({ text, isClick }) => {
  console.log(isClick);
  return (
    <ContentWrap isClick={isClick}>
      <Body>
        <div className="Q">A.</div>
        <div>{text}</div>
      </Body>
    </ContentWrap>
  );
};
const ContentWrap = styled.div`
  display: ${(props) => (props.isClick ? "flex" : "none")};
  flex-direction: row;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.Gray1};
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
export default AnswerContent;
