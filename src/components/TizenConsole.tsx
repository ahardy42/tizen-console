import React from 'react';
import { Hook, Console, Decode } from 'console-feed';
import { OuterWrapper, Wrapper, TitleWrapper, Title, LogWrapper, InputWrapper, Input } from './styles/App';
import { TizenConsoleProps } from '../types';
import { isTizen } from '../common/utils';
import {
  KEY_DOWN,
  KEY_ENTER,
  KEY_LEFT,
  KEY_RED_BUTTON,
  KEY_RIGHT,
  KEY_UP,
  registerRemoteKeys,
  unregisterRemoteKeys
} from '../common/remoteKeys';

export const TizenConsole: React.FC<TizenConsoleProps> = props => {
  const [logs, setLogs] = React.useState<any[]>([]);
  const [value, setValue] = React.useState<string>('');
  const [version, setVersion] = React.useState<string>('loading...');
  const [isActive, setActive] = React.useState<boolean>(false);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void = event => {
    setValue(event.target.value);
  }

  const handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void = event => {
    switch (event.keyCode) {
      case KEY_DOWN:
        return handleArrowDown(event);
      case KEY_UP:
        return handleArrowUp(event);
      case KEY_LEFT:
        return handleArrowLeft(event);
      case KEY_RIGHT:
        return handleArrowRight(event);
      case KEY_ENTER:
        return handleSubmit(event);
      default:
        return;
    }
  }

  const handleRedButtonDown: ({ keyCode }: KeyboardEvent) => void = ({ keyCode }) => {
    if (keyCode === KEY_RED_BUTTON) return setActive(bool => !bool);
  }

  const handleArrowDown: (event: React.KeyboardEvent<HTMLDivElement>) => void = event => {
    if (!isActive) return;
    event.stopPropagation();

    if (fullyScrolled('down')) {
      scrollRef.current?.blur();
      inputRef.current?.focus();
    }
  }

  const handleArrowUp: (event: React.KeyboardEvent<HTMLDivElement>) => void = event => {
    if (!isActive) return;
    event.stopPropagation();

    if (document.activeElement === inputRef.current) {
      inputRef.current?.blur();
      scrollRef.current?.focus();
    }
  }

  const handleArrowLeft: (event: React.KeyboardEvent<HTMLDivElement>) => void = event => {
    if (!isActive) return;
    event.stopPropagation();
  }

  const handleArrowRight: (event: React.KeyboardEvent<HTMLDivElement>) => void = event => {
    if (!isActive) return;
    event.stopPropagation();
  } 
  
  const handleSubmit: (event: React.KeyboardEvent<HTMLDivElement>) => void = event => {
    if (!isActive) return;
    event.stopPropagation();

    if (inputRef.current === document.activeElement) {
      try {
        let fn = Function(value);
        console.log(fn.call(window))
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
    registerRemoteKeys();

    window.addEventListener('keydown', handleRedButtonDown);

    return () => {
      unregisterRemoteKeys();
      window.removeEventListener('keydown', handleRedButtonDown);
    }
  }, [])

  React.useEffect(() => {

    if (isActive) {
      inputRef.current?.focus();
    } else {
      const focused = document.activeElement;
      if (focused === inputRef.current) inputRef.current?.blur();
      if (focused === scrollRef.current) scrollRef.current?.blur();
    }

  }, [isActive])

  return (
    <OuterWrapper>
      <Wrapper onKeyDown={handleKeyDown} {...props}>
        <TitleWrapper>
          <Title>TV Version: {version}</Title>
        </TitleWrapper>
        <LogWrapper tabIndex={-1} ref={scrollRef}>
          <Console filter={props.filter} logs={logs}/>
        </LogWrapper>
        <InputWrapper>
          <Input ref={inputRef} onChange={handleChange} value={value} placeholder='>Console'/>
        </InputWrapper>
      </Wrapper>
    </OuterWrapper>
  )
};
