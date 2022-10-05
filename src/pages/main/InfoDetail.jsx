// React import
import React from "react";

// Package import
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Shared import
import { Close } from "../../shared/images";

const InfoDetail = () => {
	const navigate = useNavigate();

  return (
    <InfoDetailContainer>
			<InfoDetailHeader>
				<Close className="close" onClick={() => navigate(-1)} />
			</InfoDetailHeader>
      <img src="/InfoDetailImg.png" alt="" />
    </InfoDetailContainer>
  );
};

const InfoDetailContainer = styled.div`
  width: 100%;

  position: absolute;
  top: 0;
  bottom: 0;
	
  img {
    width: 100%;
  }
`;

const InfoDetailHeader = styled.div`
	padding: 20px;

	position: fixed;

	svg {
		width: 20px;
		height: 20px;
	}
`;

export default InfoDetail;
