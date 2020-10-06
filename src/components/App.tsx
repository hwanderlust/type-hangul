import React from 'react';
import styled from 'styled-components';

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
function onSelectGame(): void {
  return;
}

function App() {
  return (
    <Body>
      <Landing onSelectGame={onSelectGame} />
    </Body>
  );
}

export default App;
