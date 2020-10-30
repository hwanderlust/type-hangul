import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, } from "react-router-dom";
import styled from "styled-components";

import { Page404 } from "./common";
import Score from "./game/Score";
import Landing from './landing';

// https://medium.com/hackernoon/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d
const preloadAbout = import("./static/About");
const preloadContact = import("./static/Contact");
const preloadGame = import("./game");
const preloadGameover = import("./game/Gameover");
const About = lazy(() => preloadAbout);
const Contact = lazy(() => preloadContact);
const Game = lazy(() => preloadGame);
const Gameover = lazy(() => preloadGameover);

const Background = styled.div`
  background-color: #FF7D7D;
  position: relative;
  min-height: 100vh;
`;

function App() {
  const score = Score();

  return (
    <Background>
      <BrowserRouter>
        {/* TODO add proper fallback */}
        <Suspense fallback={() => <>Loading...</>} >
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>

            <Route path="/game/:type">
              <Game score={score} />
            </Route>
            <Route exact path="/gameover/:type">
              <Gameover score={score} />
            </Route>

            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/contact">
              <Contact />
            </Route>

            <Route component={Page404} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </Background>
  );
}

export default App;
