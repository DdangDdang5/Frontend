import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MyPageList = ({ icon, listName, onClick }) => {
  return (
    <ListContainer>
      <div className="listIcon">
        <div>{icon}</div>
      </div>
      <div className="listTitle" onClick={onClick}>
        {listName}
      </div>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-start;
  align-items: center;

  .listIcon {
    display: flex;
    width: 24px;
    height: 30px;
    div {
      width: 100%;
      height: 100%;
      border-radius: 24px;
      background-color: ${(props) => props.theme.colors.SkyBlue};
    }
  }
  .listTitle {
    display: flex;
    font-size: ${(props) => props.theme.fontSizes.ms};
    font-weight: ${(props) => props.theme.fontWeights.normal};
  }
`;

export default MyPageList;
