// React import
import React from "react";

import styled from "styled-components";
import Header from "../../components/header/Header";
import { isIOS } from "react-device-detect";
import NoticeContent from "../../components/myPage/NoticeContent";

const Notice = () => {
  return (
    <NoticeLayout>
      {/* <Header back={true} pageName="공지사항" alarm={true} /> */}
      <Header back={true} pageName="공지사항" />
      <NoticeWrap isIOS={isIOS}>
        <NoticeContent
          id={1}
          noticeName={"업데이트"}
          date={"2022.9.30"}
          content={
            "V 1.0 땅땅의 서비스가 시작 되었습니다.\n 많은 분들의 성원 부탁드려요!"
          }
        />
        <NoticeContent
          id={2}
          noticeName={"업데이트"}
          date={"2022.10.2"}
          content={"V 1.1 여러분들의 피드백을 받아.\n 수정을 하였습니다!"}
        />
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

export default Notice;
