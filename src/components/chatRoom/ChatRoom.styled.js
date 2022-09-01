// Package import
import styled from "styled-components";

export const ChatRoomContainer = styled.div`
  width: 100%;
  padding: 20px 10px;
  border-bottom: 1px solid gray;

  display: flex;
  align-items: center;
`;

export const ChatRoomProfile = styled.img`
  width: 50px;
  height: 50px;
  margin: auto 20px auto 10px;
  border-radius: 29px;
`;

export const ChatRoomContent = styled.div`
  width: 70%;
`;

export const ChatRoomInfo = styled.div`
  display: flex;
  gap: 10px;
`;

export const ChatRoomMessage = styled.span`
	margin-top: 5px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
	/* background-color: aliceblue; */
`;
