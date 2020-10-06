import React from 'react';
import styled from 'styled-components';

import Landing from './Landing';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #FF7D7D;
`;


function App() {
  return (
    <Body>
      <Landing />
    </Body>
  );
}

export default App;
