import React from "react";
import styled from "styled-components";

const NoticeContent = ({ noticeName, date, content }) => {
  return (
    <ContentWrap>
      <Header>
        <span>{noticeName}</span>
        <span>{date}</span>
      </Header>
      <Body>{content}</Body>
    </ContentWrap>
  );
};

const ContentWrap = styled.div`
  flex-direction: column;
  height: 80px;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.colors.Gray2};
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin-bottom: 8px;
  span {
    font-size: ${(props) => props.theme.fontSizes.sm};
    font-weight: ${(props) => props.theme.fontWeights.fontWeights};
    color: ${(props) => props.theme.colors.Gray3};
  }
`;
const Body = styled.div`
  display: flex;
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.fontWeights};
  color: ${(props) => props.theme.colors.Black};
  line-height: 140%;
  letter-spacing: -0.05em;
  white-space: pre-line;
`;

export default NoticeContent;
