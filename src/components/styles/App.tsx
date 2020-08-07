import React from 'react';
import styled from 'styled-components';
import { TizenConsoleProps } from '../../types';

const _returnTopOrLeft = (corner: TizenConsoleProps['corner']) => {
  switch (corner) {
    case 'tl':
      return (
        `
        top: 0;
        left: 0;
        `
      )
    case 'bl':
      return (
        `
        bottom: 0;
        left: 0;
        `
      )
    case 'tr':
      return (
        `
        top: 0;
        right: 0;
        `
      )
    case 'br':
      return (
        `
        bottom: 0;
        right: 0;
        `
      )
    default:
      return (
        `
        top: 0;
        left: 0;
        `
      )
  }
}

export const OuterWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: transparent;
`;

export const Wrapper = styled.div`
  padding: 10px;
  margin: 10px;
  background-color: black;
  position: absolute;
  width: ${(props: TizenConsoleProps) => props.size === 'lg' ? '500px' : props.size === 'md' ? '400px' : '300px'};
  height: ${(props: TizenConsoleProps) => props.size === 'lg' ? '500px' : props.size === 'md' ? '400px' : '300px'};
  ${(props: TizenConsoleProps) => _returnTopOrLeft(props.corner)}
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 5000;
`;

export const TitleWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h5`
  font-size: 24;
  color: white;
  text-align: center;
`;

export const LogWrapper = styled.div`
  flex: 6;
  width: 100%;
  overflow: scroll;
  border: 2px solid white;
  margin-bottom: 10px;
  &:focus {
    border: 2px solid red;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  width: 90%;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.input`
 width: 100%;
 &:focus {
  border: 2px solid red;
 }
`;

export const Button = styled.button`
  margin: 10px;
  width: 100px;
  height: 30px;
  background-color: white;
  color: black;
  border: 2px solid white;
  &:focus {
    background-color: red;
    color: white;
  }
`;

export const CodeWrapper = styled.div`
  position: absolute;
  top: 25px;
  left: 50%;
  width: 500px;
  margin-left: -250px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 2px solid black;
  z-index: 5000;
`;

type ParaProps = {
  children: any,
  className?: any
}

const Para = ({children, className}: ParaProps) => {
  return (
    <p className={className}>{children}</p>
  )
}

export const CodeText = styled(Para)`
  font-weight: bold;
  color: black;
  text-align: center;
  font-size: 24px;
`;