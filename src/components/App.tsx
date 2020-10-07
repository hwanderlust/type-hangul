import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from 'styled-components';

import { Game } from '../helpers';
import Landing from './landing';

const About = lazy(() => import("./static/About"));
const Contact = lazy(() => import("./static/Contact"));

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #FF7D7D;
  font-family: 'Roboto', sans-serif;
`;

// TODO
function onSelectGame(game: Game): void {
  console.log(`game`, game);
  return;
}

function App() {
  return (
    <BrowserRouter>
      <Body>
        <Switch>

          <Route exact path="/">
            <Landing onSelectGame={onSelectGame} />
          </Route>

          {/* TODO add proper fallback */}
          <Suspense fallback={() => { }}>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/contact">
              <Contact />
            </Route>
          </Suspense>

          <Route exact path="/game/run">

          </Route>
          <Route exact path="/game/pop">

          </Route>
          <Route exact path="/game/jump">

          </Route>
          <Route exact path="/game/gameover">

          </Route>
        </Switch>
      </Body>
    </BrowserRouter>
  );
}

export default App;
