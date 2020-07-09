import styled from 'styled-components';
import { TizenConsoleProps } from '../../types';

export const Wrapper = styled.div`
  padding: 10px;
  margin: 10px;
  background-color: black;
  position: absolute;
  width: ${(props: TizenConsoleProps) => props.size === 'lg' ? '500px' : props.size === 'md' ? '400px' : '300px'};
  height: ${(props: TizenConsoleProps) => props.size === 'lg' ? '500px' : props.size === 'md' ? '400px' : '300px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TitleWrapper = styled.div`
  height: 10%;
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
  height: 80%;
  overflow: scroll;
`;

export const InputWrapper = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.input`
 width: 100%;
`;