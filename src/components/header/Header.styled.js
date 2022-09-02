// Package import
import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 70px;
  border-bottom: ${(props) => props.borderBottom};

  position: absolute;
  top: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderContent = styled.div`
  width: 90%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
`;

export const Logo = styled.span`
  font-size: 28px;
`;

export const HeaderIconContainer = styled.div`
  width: 100px;

  display: flex;
  gap: 20px;
`;
