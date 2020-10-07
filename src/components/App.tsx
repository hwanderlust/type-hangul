import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from 'styled-components';

import { Game } from '../helpers';
import About from "./static/About";
import Contact from "./static/Contact";
import Landing from './landing';

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

          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>

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
