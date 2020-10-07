import React, { useState } from 'react';

import LandingOne from "./LandingOne";
import LandingTwo from "./LandingTwo";
import LandingThree from "./LandingThree";
import { Game } from '../../helpers';

interface LandingProps {
  onSelectGame: (game: Game) => void;
}

function Landing(props: LandingProps) {
  const [finishedLandingOne, triggerLandingTwo] = useState(false);
  const [finishedLandingTwo, triggerLandingThree] = useState(false);

  return (
    <>
      {!finishedLandingOne && <LandingOne onFinish={triggerLandingTwo} />}

      {finishedLandingOne && !finishedLandingTwo && <LandingTwo onFinish={triggerLandingThree} />}

      {finishedLandingTwo && <LandingThree onSelectGame={props.onSelectGame} />}
    </>
  );
}

export default Landing;