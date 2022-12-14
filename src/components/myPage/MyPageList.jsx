// React import
import React from "react";

// Package import
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
    width: 28px;
    height: 28px;
  }
  .listTitle {
    display: flex;
    font-size: ${(props) => props.theme.fontSizes.ms};
    font-weight: ${(props) => props.theme.fontWeights.normal};
  }
`;

export default MyPageList;
