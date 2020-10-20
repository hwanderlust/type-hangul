import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, } from "react-router-dom";
import styled from "styled-components";

import { Page404 } from "./common";
import Game from "./game";
import Landing from './landing';

// https://medium.com/hackernoon/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d
const preloadAbout = import("./static/About");
const preloadContact = import("./static/Contact");
const About = lazy(() => preloadAbout);
const Contact = lazy(() => preloadContact);

const Background = styled.div`
  background-color: #FF7D7D;
  position: relative;
`;

function App() {
  return (
    <Background>
      <BrowserRouter>
        <Switch>

          <Route path="/game/:type">
            <Game />
          </Route>

          <Route exact path="/">
            <Landing />
          </Route>

          {/* TODO add proper fallback */}
          <Suspense fallback={() => <>Loading...</>} >
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/contact">
              <Contact />
            </Route>

            <Route exact path="/game/gameover">

            </Route>

            <Route component={Page404} />
          </Suspense>

        </Switch>
      </BrowserRouter>
    </Background>
  );
}

export default App;
