// React import
import React from "react";

// Style import
import {
  FooterContainer,
  FooterIcon,
  FooterItemContainer,
} from "./Footer.styled";

const Footer = () => {
  const footerList = ["홈", "검색", "채팅", "마이페이지"];

  return (
    <FooterContainer>
      <FooterItemContainer>
        {footerList.map((item, idx) => (
          <FooterIcon key={idx}>
            <img src="maskable.png" alt={item} />
            {item}
          </FooterIcon>
        ))}
      </FooterItemContainer>
    </FooterContainer>
  );
};

export default Footer;
