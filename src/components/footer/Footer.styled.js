// Package import
import styled from "styled-components";

export const FooterContainer = styled.div`
  width: 100%;
  height: 70px;
  border-top: 1px solid gray;
  z-index: 1;
  position: absolute;
  background-color: white;
  bottom: 0;
  position: fixed;
`;

export const FooterItemContainer = styled.div`
  width: 90%;
  height: 100%;
  margin: auto;
  display: flex;
`;

export const FooterIcon = styled.div`
  width: 25%;
  height: 90%;
  margin: auto;
  font-size: small;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 30px;
    height: 30px;
    margin-bottom: 5px;
    object-fit: contain;
    border-radius: 20px;
  }
`;
