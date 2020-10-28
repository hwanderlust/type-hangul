import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Score() {
  let score = 0;

  return {
    increase: function () {
      score++;
    },
    get: function () {
      return score;
    },
    reset: function () {
      score = 0;
    },
    render: function () {
      return (
        <Container>
          <h2>Score</h2>
          <span>{score}</span>
        </Container>
      );
    }
  }
}

export default Score;