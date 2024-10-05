import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const updateTheme = () => {
        const currentHour = new Date().getHours();
        if (currentHour >= 18 || currentHour < 6) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    useEffect(() => {
        updateTheme();
        const interval = setInterval(updateTheme, 1000 * 60 * 60); // Check every hour
        return () => clearInterval(interval);
    }, []);

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
