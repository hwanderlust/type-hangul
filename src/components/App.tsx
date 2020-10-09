import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

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
      </BrowserRouter>
    </Background>
  );
}

export default App;
