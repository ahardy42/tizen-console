import React from 'react';
import { Hook, Console, Decode } from 'console-feed';
import { OuterWrapper, Wrapper, TitleWrapper, Title, LogWrapper, InputWrapper, Input, Button, CodeText, CodeWrapper } from './styles/App';
import { TizenConsoleProps } from '../types';
import { isTizen } from '../common/utils';
import {
  KEY_DOWN,
  KEY_UP,
} from '../common/remoteKeys';
import { useSecretCode } from '../common/useSecretCode';

export const TizenConsole: React.FC<TizenConsoleProps> = props => {
  const [logs, setLogs] = React.useState<any[]>([]);
  const [value, setValue] = React.useState<string>('');
  const [version, setVersion] = React.useState<string>('loading...');
  const [isActive, code] = useSecretCode();

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void = event => {
    setValue(event.target.value);
  }

  const handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void = event => {

    if (!isActive) return;
    switch (event.keyCode) {
      case KEY_DOWN:
        return handleArrowDown(event);
      case KEY_UP:
        return handleArrowUp(event);
      default:
        return;
    }
  }

  const handleArrowDown: (event: React.KeyboardEvent<HTMLDivElement>) => void = event => {

    event.preventDefault();
    event.stopPropagation();
    let focused = document.activeElement;

    if (focused === scrollRef.current) {
      if (fullyScrolled('down')) {
        scrollRef.current?.blur();
        inputRef.current?.focus();
      }
    } else if (focused === inputRef.current) {
      inputRef.current?.blur();
      buttonRef.current?.focus();
    }
  }

  const handleArrowUp: (event: React.KeyboardEvent<HTMLDivElement>) => void = event => {

    event.preventDefault();
    event.stopPropagation();
    let focused = document.activeElement;

    if (focused === buttonRef.current) {
      buttonRef.current?.blur();
      inputRef.current?.focus();
    } else if (focused === inputRef.current) {
      inputRef.current?.blur();
      scrollRef.current?.focus();
    }
  }
  
  const handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void = event => {
    if (!isActive) return;
    event.stopPropagation();

    if (buttonRef.current === document.activeElement) {
      try {
        let fn = Function(`console.log(${value})`);
        fn();
      } catch (error) {
        console.log('console error:', error)
      }
      setValue('')
    }
  }

  const fullyScrolled: (direction: 'up'|'down') => boolean = direction => {
    if (direction === 'up') {
      return scrollRef.current?.scrollTop === 0;
    }

    if (!scrollRef.current?.scrollHeight) return true;

    if (scrollRef.current?.scrollHeight) {
      return scrollRef.current?.scrollHeight - scrollRef.current?.scrollTop === scrollRef.current?.clientHeight;
    } 
    return false;
  }

  React.useEffect(() => {
    Hook(window.console, log => {
      setLogs(logs => [...logs, Decode(log)]);
    });
    console.log('TizenConsole Loaded');
  }, []);

  React.useEffect(() => {
    if (!isTizen()) return setVersion('N/A');
    try {
      let version = (window as any).webapis.productinfo.getVersion();
      setVersion(version);
    } catch (error) {
      console.log(error);
      setVersion('Unable To Get Version');
    }
  }, []);

  React.useEffect(() => {

    if (isActive) {
      inputRef.current?.focus();
    } else {
      const focused = document.activeElement;
      if (focused === inputRef.current) inputRef.current?.blur();
      if (focused === scrollRef.current) scrollRef.current?.blur();
      if (focused === buttonRef.current) buttonRef.current?.blur();
    }

  }, [isActive])

  React.useEffect(() => {
    let focused = document.activeElement;
    if (focused !== scrollRef.current && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs, scrollRef])

  const wrapperStyle: React.CSSProperties = !isActive ? {display: 'none'} : {display: 'block'}
  const codeWrapperStyle: React.CSSProperties = !!code ? {display: 'block'} : {display: 'none'}

  return (
    <>
      <CodeWrapper style={codeWrapperStyle}>
        <CodeText>Code: {code}</CodeText>
      </CodeWrapper>
      <OuterWrapper style={wrapperStyle}>
        <Wrapper onKeyDown={handleKeyDown} {...props}>
          <TitleWrapper>
            <Title>TV Version: {version}</Title>
          </TitleWrapper>
          <LogWrapper tabIndex={-1} ref={scrollRef}>
            <Console filter={props.filter} logs={logs} />
          </LogWrapper>
          <InputWrapper>
            <Input ref={inputRef} onChange={handleChange} value={value} placeholder='>Console' />
            <Button ref={buttonRef} onClick={handleSubmit}>Submit</Button>
          </InputWrapper>
        </Wrapper>
      </OuterWrapper>
    </>
  )
};
