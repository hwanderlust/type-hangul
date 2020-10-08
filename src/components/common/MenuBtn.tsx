import React from "react";
import styled from "styled-components";

import { StyledProps } from "../../helpers";
import icon from "../../images/apeach-btn.png";

const Icon = styled.img`
  width: 100px;
  height: 100px;
  
  @media only screen and (max-width: 720px) {
    width: 50px;
    height: 50px;
  }
`;

function MenuBtn(props: StyledProps) {
  return (
    <Icon {...props} src={icon} alt="Kakao Friends' Apeach smiling - as a menu icon/button" />
  );
}

export default MenuBtn;