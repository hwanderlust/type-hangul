import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import logo from "../../images/logo.png";

const Button = styled(Link)`
  display: block;
`;

function Logo() {
  return (
    <Button to="/">
      <img src={logo} alt="a 'T' with the Korean ㅎ as a logo" />
    </Button>
  );
}

export default Logo;