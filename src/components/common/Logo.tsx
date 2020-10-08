import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { StyledProps } from "../../helpers";
import logo from "../../images/logo.png";

const Button = styled(Link)`
  display: block;
`;
const Icon = styled.img`
  height: 100px;
  transform: translateY(-10%);

  @media only screen and (max-width: 720px) {
    height: 50px;
    transform: translateY(-25%);
  }
`;

function Logo(props: StyledProps) {
  return (
    <Button {...props} to="/">
      <Icon src={logo} alt="a 'T' with the Korean ㅎ as a logo" />
    </Button>
  );
}

export default Logo;