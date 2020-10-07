import React from "react";
import styled from "styled-components";

import * as Common from "../common";
import { fadeIn } from "../../helpers";

const Container = styled.header`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;
  width: 95vw;
  animation: ${fadeIn} 500ms ease-in;
`;
const Logo = styled(Common.Logo)`
  align-self: flex-start;
`;
const Nav = styled.nav`
  align-self: flex-end;
  margin: auto 0;
`;
const Button = styled.button`
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  margin: auto;
  background-color: transparent;
  border: none;
  width: 100px;
  cursor: pointer;

  &:hover {
    color: white;
  }

  &:active, &:focus {
    font-decoration: underline;
    font-decoration-color: white;
  }
`;

function Navigation() {
  return (
    <Container>
      <Logo />

      <Nav>
        <Button>About</Button>
        <Button>Contact</Button>
      </Nav>
    </Container>
  );
}

export default Navigation;