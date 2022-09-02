// React import
import React from "react";

// Package import
import { useNavigate } from "react-router-dom";

// Style import
import {
  FooterContainer,
  FooterIcon,
  FooterItemContainer,
} from "./Footer.styled";

const Footer = () => {
  const navigate = useNavigate();

  const footerList = [
    ["홈", "/"],
    ["검색", "/search"],
    ["채팅", "/chatList"],
    ["마이페이지", "mypage"],
  ];

  return (
    <FooterContainer>
      <FooterItemContainer>
        {footerList.map((item, idx) => (
          <FooterIcon key={idx}>
            <img
              src="maskable.png"
              alt={item[0]}
              onClick={() => navigate(item[1])}
            />
            {item[0]}
          </FooterIcon>
        ))}
      </FooterItemContainer>
    </FooterContainer>
  );
};

export default Footer;
