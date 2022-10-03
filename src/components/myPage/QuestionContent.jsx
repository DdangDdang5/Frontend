import React from "react";
import styled from "styled-components";
import { UnderArrow } from "../../shared/images";

const QuestionContent = ({ text, isClick, setIsClick }) => {
  return (
    <ContentWrap onClick={() => setIsClick(!isClick)}>
      <Body>
        <div className="Q">Q.</div>
        <div>{text}</div>
      </Body>
      <Img>
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
`;
export default QuestionContent;
