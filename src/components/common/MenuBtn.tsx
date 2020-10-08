import React from "react";
import styled from "styled-components";

import icon from "../../images/apeach-btn.png";

const Icon = styled.img`
  width: 100px;
  height: 100px;
  
  @media only screen and (max-width: 720px) {
    width: 50px;
    height: 50px;
  }
`;

interface MenuBtnProps {
  style?: React.CSSProperties;
}

function MenuBtn(props?: MenuBtnProps) {
  return (
    <Icon style={props?.style} src={icon} alt="Kakao Friends' Apeach smiling - as a menu icon/button" />
  );
}

export default MenuBtn;