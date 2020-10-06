import React, { useState } from 'react';
import styled from 'styled-components';

import LandingOne from "./LandingOne";
import LandingTwo from "./LandingTwo";

const Main = styled.main``;

interface LandingProps {
  onSelectGame: () => void;
}

function Landing(props: LandingProps) {
  const [finishedLandingOne, triggerLandingTwo] = useState(false);
  const [finishedLandingTwo, triggerLandingThree] = useState(false);

  return (
    <Main>
      {!finishedLandingOne && <LandingOne onFinish={triggerLandingTwo} />}
      {finishedLandingOne && <LandingTwo onFinish={triggerLandingThree} />}
      {/* {finishedLandingTwo && <LandingThree onSelectGame={props.onSelectGame} />} */}
    </Main>
  );
}

export default Landing;