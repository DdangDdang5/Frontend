// React import
import React from "react";

// Import styled
import styled from "styled-components";
import { useDispatch } from "react-redux";

const PlusButton = () => {
  const dispatch = useDispatch;

  return (
    <PlusBtnWrap>
      <DoubleModalWrap>
        <div>내 물건 팔기</div>
      </DoubleModalWrap>
      <PlusBtn>+</PlusBtn>
    </PlusBtnWrap>
  );
};

const PlusBtnWrap = styled.div`
  display: flex;
  z-index: 10;
  position: fixed;

  bottom: 90px;
  right: 20px;

  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;

  gap: 20px;

  height: 200px;
  width: 200px;
  background-color: yellow;
`;
const DoubleModalWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  border: 1px solid black;
  div {
    font-size: 20px;
  }
`;

const PlusBtn = styled.button`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 500px;
  font-size: 50px;
  color: white;
  padding: 0px 15px;
  background-color: orange;

  :hover {
    background-color: #de5539;
  }
`;
export default PlusButton;
