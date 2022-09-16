// Package import
import styled from "styled-components";

export const ChatContainer = styled.div``;

export const ChatContent = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.Gray1};

  position: absolute;
  top: 70px;
  bottom: 70px;

  overflow-y: scroll;
`;

export const AuctionTimeWrap = styled.div`
  width: 100%;
  height: 42px;

  color: ${(props) => props.theme.colors.White};
  background-color: ${(props) => props.theme.colors.Red};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: ${(props) => props.theme.fontWeights.normal};

  display: flex;
  justify-content: center;
  align-items: center;
	gap: 8px;
`;

export const AuctionTime = styled.span`
  font-size: ${(props) => props.theme.fontSizes.lg} !important;
  font-weight: ${(props) => props.theme.fontWeights.bold} !important;
`;

export const MemberList = styled.div``;

export const ChatMessageList = styled.ul`
  margin: 20px 12px;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ChatMessage = styled.div`
  width: 100%;
  /* margin-bottom: 20px; */

  color: ${(props) => props.theme.colors.Black};
  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.normal};

  display: flex;
  align-items: stretch;
  justify-content: ${(props) => (props.isMe ? "flex-end" : "baseline")};
  gap: 8px;
`;

export const MessageProfile = styled.img`
  width: 48px;
  height: 48px;

  border-radius: 50%;
`;

export const MessageWrap = styled.div`
  max-width: 65%;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Message = styled.li`
  padding: 10px 14px;

  background-color: ${(props) =>
    props.isMe ? props.theme.colors.Blue1 : props.theme.colors.White};
  border-radius: ${(props) =>
    props.isMe ? "16px 16px 4px 16px" : "4px 16px 16px 16px"};
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);

  // remove li marker
  list-style-type: none;

  div {
    display: inline-block;
    overflow: auto;
    word-break: break-all;
    white-space: normal;
  }
`;

export const MessageInfo = styled.div`
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: ${(props) => props.theme.fontWeights.normal};

  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.isMe ? "flex-end" : "baseline"};
  justify-content: end;
`;

export const MessageChecked = styled.span`
  color: ${(props) => props.theme.colors.Blue1};
`;

export const MessageTime = styled.span`
  color: ${(props) => props.theme.colors.Gray3};
`;

export const ChatFooter = styled.div`
  width: calc(100% - 40px);
  height: 70px;
  padding: 0 20px;

  position: absolute;
  bottom: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;

		path {
			fill: ${(props) => props.theme.colors.Gray3};
		}
  }

	.add:active {
		path {
			fill: ${(props) => props.theme.colors.Blue1};
		}
	}
`;

export const MessageInput = styled.input`
  width: 100%;
  height: 24px;
  margin: auto 20px auto 14px;
  padding: 5px 10px;

  border: none;

  color: ${(props) => props.theme.colors.Black};
  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.normal};

  &::placeholder {
    color: ${(props) => props.theme.colors.Gray3};
  }

  &:focus {
    outline: none;
  }
`;

export const SendBtn = styled.button`
  width: 26px;
  height: 26px;
  padding: 0;

  background-color: transparent;
  border: none;
	
	&:active {
		svg {
			path {
				fill: ${(props) => props.theme.colors.Blue1};
			}
		}
	}
`;

export const MenuItemList = styled.div`
	padding: 8px 0px;
	color: ${(props) => props.theme.colors.Black};
	font-size: ${(props) => props.theme.fontSizes.ms};
	font-weight: ${(props) => props.theme.fontWeights.normal};
`;

export const MenuItem = styled.div`
	padding: 12px 20px;
`;