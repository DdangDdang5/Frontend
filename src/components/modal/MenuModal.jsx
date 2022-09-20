import React from "react";
import styled from "styled-components";

const MenuModal = ({ handleDelete }) => {
  return (
    <MenuModalLayout>
      <div>경매글 수정하기</div>
      <div onClick={() => handleDelete}>경매글 삭제하기</div>
    </MenuModalLayout>
  );
};

const MenuModalLayout = styled.div`
  display: flex;
  position: absolute;
  z-index: 100;
  top: 69px;
  right: 0;
  width: 190px;
  height: 112px;
  background-color: white;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
  border-radius: 0px 0px 8px 8px;
  div {
    display: flex;
    margin-left: 20px;
    font-size: 16px;
    font-weight: 400;
  }
`;
export default MenuModal;
