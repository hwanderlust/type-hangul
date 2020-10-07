import React, { useState } from 'react';

import LandingOne from "./LandingOne";
import LandingTwo from "./LandingTwo";
import LandingThree from "./LandingThree";

function Landing() {
  const [finishedLandingOne, triggerLandingTwo] = useState(false);
  const [finishedLandingTwo, triggerLandingThree] = useState(false);

  return (
    <>
      {!finishedLandingOne && <LandingOne onFinish={triggerLandingTwo} />}

      {finishedLandingOne && !finishedLandingTwo && <LandingTwo onFinish={triggerLandingThree} />}

      {finishedLandingTwo && <LandingThree />}
    </>
  );
}

export default Landing;