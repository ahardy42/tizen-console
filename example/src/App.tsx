import React, { Component } from 'react';
import styled from 'styled-components';

import { TizenConsole } from './reactComponentLib';

const KEY_LEFT        = 37; 
const KEY_RIGHT       = 39; 
const KEY_ENTER       = 13; 
const KEY_UP          = 38; 
const KEY_DOWN        = 40;

const Wrapper = styled.div`
  background-color: white;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoxContainer = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  border: 2px solid blue;
  justify-content: center;
`;

const Box = styled.button`
  width: 30%;
  height: 30%;
  border: 2px solid black;
  background-color: white;
  margin: 50px;
  &:focus {
    background-color: red;
  }
`;

function App() {

  const box1ref = React.useRef<HTMLButtonElement>(null);
  const box2ref = React.useRef<HTMLButtonElement>(null);
  const box3ref = React.useRef<HTMLButtonElement>(null);
  const box4ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    box1ref.current?.focus();

    const handleKeyDown = ({ keyCode }: KeyboardEvent) => {

      const focusedElement = document.activeElement;

      switch (keyCode) {
        case KEY_RIGHT:
          if (focusedElement === box1ref.current) {
            box1ref.current?.blur();
            box2ref.current?.focus();
          } else if (focusedElement === box3ref.current) {
            box3ref.current?.blur();
            box4ref.current?.focus();
          }
          break;
        case KEY_LEFT:
          if (focusedElement === box2ref.current) {
            box2ref.current?.blur();
            box1ref.current?.focus();
          } else if (focusedElement === box4ref.current) {
            box4ref.current?.blur();
            box3ref.current?.focus();
          }
          break;
        case KEY_DOWN:
          if (focusedElement === box1ref.current) {
            box1ref.current?.blur();
            box3ref.current?.focus();
          } else if (focusedElement === box2ref.current) {
            box2ref.current?.blur();
            box4ref.current?.focus();
          }
          break;
        case KEY_UP:
          if (focusedElement === box3ref.current) {
            box3ref.current?.blur();
            box1ref.current?.focus();
          } else if (focusedElement === box4ref.current) {
            box4ref.current?.blur();
            box2ref.current?.focus();
          }
          break;
        default:
          return;
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

    return (
      <Wrapper>
        <TizenConsole size='lg' corner='tr'/>
        <BoxContainer>
          <Box ref={box1ref}/>
          <Box ref={box2ref}/>
          <Box ref={box3ref}/>
          <Box ref={box4ref}/>
        </BoxContainer>
      </Wrapper>
    );
}

export default App;
