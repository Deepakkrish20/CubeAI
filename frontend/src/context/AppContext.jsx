import { createContext, useContext, useState, useMemo, useEffect } from 'react';

const AppContext = createContext(null);

/**
 * Global application context for shared UI state.
 * Extend as needed for theme, notifications, etc.
 */
export function AppProvider({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Force light mode exclusively and clear any legacy theme settings
  const isDarkMode = false;
  const toggleDarkMode = () => {};

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  const value = useMemo(
    () => ({
      isMobileMenuOpen,
      setIsMobileMenuOpen,
      toggleMobileMenu: () => setIsMobileMenuOpen((prev) => !prev),
      closeMobileMenu: () => setIsMobileMenuOpen(false),
      isDarkMode,
      toggleDarkMode,
    }),
    [isMobileMenuOpen, isDarkMode],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

