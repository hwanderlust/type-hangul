import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import * as Common from "../common";
import { Fonts, fadeIn } from "../../helpers";

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
const List = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  width: 130px;
  margin: 0;
  padding: 0;
`;
const CustomLink = styled(Link)`
  font-family: ${Fonts.playfair};
  font-size: 16px;
  margin: auto;
  width: 100px;
  text-decoration: none;
  color: black;

  &:hover {
    color: white;
  }

  &:active, &:focus {
    font-decoration: underline;
  }
`;

function Navigation() {
  return (
    <Container>
      <Logo />

      <Nav>
        <List>
          <li><CustomLink to="/about">About</CustomLink></li>
          <li><CustomLink to="/contact">Contact</CustomLink></li>
        </List>
      </Nav>
    </Container>
  );
}

export default Navigation;