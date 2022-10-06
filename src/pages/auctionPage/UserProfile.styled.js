// Package import
import styled from "styled-components";

export const UserProfileContainer = styled.div``;

export const UserProfileContent = styled.div`
  width: 100%;

  position: absolute;
  top: 70px;
	bottom: 0;

	overflow: scroll;
`;

export const UserProfileWrap = styled.div`
  margin: 16px 20px 24px 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserProfileInfo = styled.div`
  color: ${(props) => props.theme.colors.Black};
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: ${(props) => props.theme.fontWeights.bold};

  display: flex;
  align-items: center;
  gap: 20px;

  img {
    width: 73px;
    height: 73px;
    border-radius: 50%;
  }

	svg {
		width: 73px;
		height: 73px;
	}
`;

export const MyGradeImgWrap = styled.div`
  position: relative;
	right: 20px;

  svg {
    width: 38px;
    height: 38px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  div {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.Gray2};

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -10;
  }
`;

export const UserGrade = styled.div`
  width: 46px;
  height: 46px;

  background-color: ${(props) => props.theme.colors.Gray2};
  border-radius: 50%;
`;

export const MidTabContainer = styled.div`
  margin: auto 20px 40px 20px;
	
  #auction-sale:checked ~ #auction-sale-content,
  #auction-done:checked ~ #auction-done-content {
		display: block;
  }

  input:checked + label {
    width: fit-content;

    color: ${(props) => props.theme.colors.Black};
    font-weight: ${(props) => props.theme.fontWeights.bold};
    border-bottom: 3px solid black;
  }
`;

export const MidTabHeader = styled.div`
  display: flex;
`;

export const MidTabRadioBtn = styled.input`
  display: none;
`;

export const MidTabLabel = styled.label`
	height: fit-content;
	margin-right: 30px;
	margin-bottom: 20px;
  padding: 4px;

  color: ${(props) => props.theme.colors.Gray3};
  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.normal};

  display: block;
	float: left;

	&:checked {
    width: fit-content;

    color: ${(props) => props.theme.colors.Black};
    font-weight: ${(props) => props.theme.fontWeights.bold};
    border-bottom: 3px solid;
	}
`;

export const MidTabContent = styled.div`
	width: 100%;

  display: none;
  overflow: hidden;
  /* text-overflow: ellipsis; */
  /* white-space: nowrap; */
`;

export const ItemList = styled.div`
	width: 100%;

  display: flex;
  flex-direction: column;
`;
