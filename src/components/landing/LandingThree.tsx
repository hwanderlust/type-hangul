import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import styled, { keyframes } from 'styled-components';

import apeach from "../../images/apeach-btn.png";
import { Disclosure } from "../common";
import { Fonts, fadeIn, } from "../../helpers";

import Navigation from "./Navigation";
import { Title, typewriteByLetter } from "./helpers";

const rotate = keyframes`
  0% { transform: translateX(-25px) translateY(-50%); }
  50% { transform: translateX(-25px) translateY(-50%) rotate(5deg); }
  100% { transform: translateX(-25px) translateY(-50%); }
`;

const titleText = "어느 게임을 하고 싶어요?";
const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Container = styled.form`
  display: flex;
  flex-direction: column;
  opacity: 0;
  animation: ${fadeIn} 750ms ease-in;
  animation-delay: ${titleText.length * 100}ms;
  animation-fill-mode: forwards;
`;
const Radio = styled.input.attrs(props => ({
  type: "radio",
  name: "game",
}))`
  transform: translateX(-25px);

  &:not(:checked) {
    opacity: 0;
  }

  &:checked::before {
    content: "";
    position: absolute;
    transform: translateX(-25px) translateY(-50%);
    background-image: url("${apeach}");
    background-size: cover;
    height: 50px;
    width: 50px;
  }
  
  &:focus, &:active {
    &:checked::before {
      animation: ${rotate} 1s ease infinite;
    }
  }
`;
const Submit = styled.input.attrs(props => ({
  type: "submit",
}))`
  opacity: 0;
`

interface GameOptionProps {
  description: string;
}
const CustomLink = styled(Link)`
  font-family: ${Fonts.playfair};
  font-size: 48px;
  font-weight: 400;
  color: #FFF;
  text-decoration: none;

  &:hover {
    color: black;
  }

  &::after {
    content: "${(props: GameOptionProps) => props.description}";
    color: black;
    font-family: ${Fonts.roboto};
    font-size: 12px;
    margin-left: 16px;
    position: absolute;
    transform: translateY(31px);
  }
`;

type Game = "run" | "pop" | "jump";

function LandingThree() {
  const [title, setTitle] = useState("");
  const [selectedGame, setGame] = useState("run");
  const [showSecondaryComponents, toggleSecondaryComponents] = useState(false);
  const history = useHistory();

  function handleSubmit(e: React.FormEvent<HTMLFormElement | HTMLInputElement>): void {
    e.preventDefault();
    history.push(`/game/${selectedGame as Game}`);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setGame(e.currentTarget.value);
  }

  typewriteByLetter(titleText, [title, setTitle]);
  setTimeout(() => { toggleSecondaryComponents(true) }, 2000);

  return (
    <Main>
      {showSecondaryComponents && <Navigation />}

      <Title>{title}</Title>

      <Container onSubmit={handleSubmit}>
        <Submit onClick={handleSubmit} />

        <div>
          <Radio
            value="run"
            checked={selectedGame === "run"}
            onChange={handleChange}
            autoFocus />
          <CustomLink
            to="/game/run"
            description={selectedGame === "run" ? "Type the given words to help your character clear obstacles" : ""}>
            Run
          </CustomLink>
        </div>

        <div>
          <Radio
            value="pop"
            checked={selectedGame === "pop"}
            onChange={handleChange} />
          <CustomLink
            to="/game/pop"
            description={selectedGame === "pop" ? "Type the floating words to avoid the bubbles from hitting the ground" : ""}>
            Pop
          </CustomLink>
        </div>

        <div>
          <Radio
            value="jump"
            checked={selectedGame === "jump"}
            onChange={handleChange} />
          <CustomLink
            to="/game/jump"
            description={selectedGame === "jump" ? "Type the words on the closest platform to escape the burning fire" : ""}>
            Jump
          </CustomLink>
        </div>

      </Container>

      {showSecondaryComponents && <Disclosure />}

    </Main>
  );
}

export default LandingThree;