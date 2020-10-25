import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { Fonts, Sizes } from "../../helpers";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
`;
const Item = styled.li`
  font-size: ${Sizes.variable.font.medium};
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-family: ${Fonts.playfair};

  &:focus {
    text-decoration: underline;
    text-decoration-color: black;
    outline: none;
  }

  &:hover {
    color: white;
  }
`;

function Page404() {
  return (
    <Main>
      <div>
        <h1>Oops! Looks like you're a bit lost.</h1>
        <p>"<strong>{useLocation().pathname}</strong>" isn't a path we have on this site.</p>
        <h2>If you're here, you're here for the games! Please have a gander.</h2>
        <List>
          <Item><StyledLink to="/game/pop">Pop</StyledLink></Item>
          <Item><StyledLink to="/game/jump">Jump</StyledLink></Item>
        </List>
      </div>
    </Main>
  );
}

export default Page404;