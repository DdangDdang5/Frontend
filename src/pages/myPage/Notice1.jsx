import React from "react";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Notice1 = () => {
  const { state } = useLocation();
  return (
    <NoticeLayout>
      <Header back={true} pageName="공지사항" />
      <NoticeWrap>
        <ContentWrap>
          <Head>
            <span>{state.noticeName}</span>
            <span>{state.date}</span>
          </Head>
          <Body>{state.content}</Body>
        </ContentWrap>
      </NoticeWrap>
    </NoticeLayout>
  );
};

const NoticeLayout = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
  flex-direction: column;
`;
const NoticeWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  height: ${(props) =>
    props.isIOS ? `calc(100vh - 75px)` : `calc(100vh - 65px)`};
  overflow: auto;
`;
const ContentWrap = styled.div`
  flex-direction: column;
  height: 80px;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.colors.Gray2};
`;
const Head = styled.div`
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
export default Notice1;
