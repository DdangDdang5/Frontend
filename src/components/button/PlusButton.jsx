// React import
import React from "react";

// Import styled
import styled from "styled-components";

const PlusButton = () => {
  return <PlusBtn>+</PlusBtn>;
};

const PlusBtn = styled.button`
  display: flex;
  position: fixed;
  z-index: 10;
  bottom: 90px;
  right: 20px;

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
