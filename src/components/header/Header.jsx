import React from 'react'
import styled from 'styled-components';

const Header = () => {
	return (
		<HeaderContainer>
			<HeaderContent>
				<Logo>땅땅</Logo>
				<HeaderIconContainer>
					<img src="maskable.png" alt="search" />
					<img src="maskable.png" alt="alarm" />
				</HeaderIconContainer>
			</HeaderContent>
		</HeaderContainer>
	)
}

const HeaderContainer = styled.div`
	width: 100vw;
	height: 70px;
	position: absolute;
	top: 0;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const HeaderContent = styled.div`
	width: 90vw;

	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Logo = styled.span`
	font-size: 28px;
`;

const HeaderIconContainer = styled.div`
	width: 100px;
	
	display: flex;
	gap: 20px;

	img {
		width: 40px;
		height: 40px;
		object-fit: contain;
	}
`;

export default Header