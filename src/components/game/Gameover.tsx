import React from "react";
import styled from "styled-components";

import { Score } from "./Score";

interface GameoverProps {
  score: Score;
}

const Container = styled.div``;

function Gameover(props: GameoverProps) {
  const { score } = props;

  return (
    <Container>
      {score.render()}
    </Container>
  );
}

export default Gameover;