import React, { useState } from 'react';
import styled from "styled-components";

import LandingOne from "./LandingOne";
import LandingTwo from "./LandingTwo";
import LandingThree from "./LandingThree";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: 'Roboto', sans-serif;
`;

function Landing() {
  const [finishedLandingOne, triggerLandingTwo] = useState(false);
  const [finishedLandingTwo, triggerLandingThree] = useState(false);

  return (
    <Body>
      {!finishedLandingOne && <LandingOne onFinish={triggerLandingTwo} />}

      {finishedLandingOne && !finishedLandingTwo && <LandingTwo onFinish={triggerLandingThree} />}

      {finishedLandingTwo && <LandingThree />}
    </Body>
  );
}

export default Landing;