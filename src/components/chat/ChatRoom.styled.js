// Package import
import styled from "styled-components";

export const ChatRoomContainer = styled.div`
  padding: 10px 20px;
  /* border-bottom: 1px solid gray; */

  display: flex;
  align-items: flex-start;
`;

export const ChatRoomProfile = styled.img`
  width: 73px;
  height: 73px;
  margin-right: 20px;
  border-radius: 8px;
`;

export const ChatRoomContent = styled.div`
  width: 70%;

  color: ${(props) => props.theme.colors.Black};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  line-height: 150%;
`;

export const ChatRoomInfo = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const ChatRoomNickname = styled.div`
  width: 60%;
  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.bold};

  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ChatRoomTime = styled.span`
  width: fit-content;

  color: ${(props) => props.theme.colors.Gray3};
  line-height: 140%;
`;

export const ChatRoomMessageWrap = styled.div`
  width: 70%;
  margin-top: 4px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ChatRoomMessage = styled.span`
  width: 100%;
  font-size: ${(props) => props.theme.fontSizes.ms};

  /* text 라인 수 2줄로 제한 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ChatRoomAlarm = styled.div`
  width: 20px;
  height: 20px;

  text-align: center;
  font-weight: bold;

  color: white;
  background-color: gray;
  border-radius: 10px;
`;
