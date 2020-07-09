import { isTizen } from './utils';

export const KEY_LEFT        = 37; 
export const KEY_RIGHT       = 39; 
export const KEY_ENTER       = 13; 
export const KEY_UP          = 38; 
export const KEY_DOWN        = 40;
export const KEY_RED_BUTTON  = 403;

export const registerRemoteKeys: () => void = () => {
  if (!isTizen()) return;
  (window as any).tizen.tvinputdevice.registerKey("ColorF0Red");
}

export const unregisterRemoteKeys: () => void = () => {
  if (!isTizen()) return;
  (window as any).tizen.tvinputdevice.unregisterKey("ColorF0Red");
}