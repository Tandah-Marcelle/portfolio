import { createContext, useContext } from 'react';
import HomePage from './views/HomePage';
import { useDarkMode } from './utils/useDarkMode';

export const DarkModeContext = createContext({ isDark: false, toggle: () => {} });
export const useDarkModeContext = () => useContext(DarkModeContext);

function App() {
  const darkMode = useDarkMode();
  return (
    <DarkModeContext.Provider value={darkMode}>
      <HomePage />
    </DarkModeContext.Provider>
  );
}

export default App;
