import { useEffect, useState, useRef } from 'react';
import { registerRemoteKeys, unregisterRemoteKeys } from './remoteKeys';

export const useSecretCode: () => [boolean, string] = () => {

  const secretCode = '12345';

  const [code, setCode] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const timerRef = useRef<number>(null);

  const toggleActive: () => void = () => {
    setIsActive(bool => !bool);
    setCode('');
  }

  useEffect(() => {

    registerRemoteKeys();

    function handleKeyDown({key}: KeyboardEvent) {
      if (secretCode.indexOf(key) > -1) {
        setCode(code => code + key);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      unregisterRemoteKeys();
    }
  }, []);

  useEffect(() => {

    if (!!code) {
      timerRef.current && clearTimeout(timerRef.current);
      (timerRef as React.MutableRefObject<number>).current = setTimeout(() => {
        setCode('');
      }, 5000);
    }

    if (code.length > 4) {
      if (secretCode === code) return toggleActive();
      setCode('');
    }
  }, [code, setCode]);

  return [isActive, code];
}