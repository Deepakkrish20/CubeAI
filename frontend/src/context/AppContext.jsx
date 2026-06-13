import { createContext, useContext, useState, useMemo, useEffect } from 'react';

const AppContext = createContext(null);

/**
 * Global application context for shared UI state.
 * Extend as needed for theme, notifications, etc.
 */
export function AppProvider({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Initialize dark mode from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return false; // Default to light mode
  });

  // Apply dark mode class to html element when state changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

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

