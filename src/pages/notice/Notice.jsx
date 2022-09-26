// React import
import React from "react";

import styled from "styled-components";
import Header from "../../components/header/Header";

const Notice = () => {
  return (
    <NoticeWrap>
      <Header back={true} pageName="공지사항" alarm={true} />
      <div></div>
    </NoticeWrap>
  );
};

const NoticeWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export default Notice;
