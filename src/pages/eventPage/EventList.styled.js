// Package import
import styled from "styled-components";

export const EventListContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const EventListContent = styled.div`
  width: calc(100% - 40px);
  padding: 16px 20px;

  position: absolute;
  top: 70px;
  bottom: 0;

  display: flex;
  flex-direction: column;
  gap: 16px;

  overflow: scroll;
`;

export const EventItem = styled.div`
  width: 100%;
  height: 183px;
  min-height: 183px;

  border-radius: 8px;
`;
