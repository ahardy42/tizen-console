export const isTizen: () => boolean = () => {
  return !!(window as any).tizen
}