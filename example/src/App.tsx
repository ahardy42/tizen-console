import React, { Component } from 'react';
import styled from 'styled-components';

import { TizenConsole } from './reactComponentLib';

const Wrapper = styled.div`
  background-color: white;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <TizenConsole size='lg' corner='tl'/>
      </Wrapper>
    );
  }
}

export default App;
