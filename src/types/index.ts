type Methods = "log" | "warn" | "error" | "info" | "debug" | "table" | "time" | "clear" | "timeEnd" | "count" | "assert"

export interface TizenConsoleProps {
  size: 'sm' | 'md' | 'lg',
  corner: 'tr' | 'tl' | 'br' | 'bl',
  filter?: Methods[]
}