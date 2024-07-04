import React, { createContext } from 'react';

interface ThemeContextType {
  palette: string;
  setPalette: (palette: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default ThemeContext;