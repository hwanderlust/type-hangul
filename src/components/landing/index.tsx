import React, { useState } from 'react';
import styled from "styled-components";

import { Fonts } from "../../helpers";
import LandingOne from "./LandingOne";
import LandingTwo from "./LandingTwo";
import LandingThree from "./LandingThree";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: ${Fonts.roboto};
`;

interface LandingProps {
  completed: React.MutableRefObject<boolean>;
}

function Landing(props: LandingProps) {
  const { completed } = props;
  const [finishedLandingOne, triggerLandingTwo] = useState(false);
  const [finishedLandingTwo, triggerLandingThree] = useState(false);

  return (
    <Body>
      {!completed.current && !finishedLandingOne && <LandingOne onFinish={() => triggerLandingTwo(true)} />}

      {!completed.current && finishedLandingOne && !finishedLandingTwo && <LandingTwo onFinish={() => {
        triggerLandingThree(true);
        completed.current = true;
      }} />}

      {(completed.current || finishedLandingTwo) && <LandingThree />}
    </Body>
  );
}

export default Landing;