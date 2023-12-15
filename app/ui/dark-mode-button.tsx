'use client';

import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export default function DarkModeButton() {
  // set dark mode state on localStorage
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // get dark mode state from localStorage
    const darkModeState = localStorage.getItem('darkMode');
    // if dark mode state exists in localStorage, set dark mode state
    if (darkModeState) setDarkMode(JSON.parse(darkModeState));
    // else, set dark mode state to false
    else setDarkMode(false);
  }, []);

  useEffect(() => {
    // add dark mode class to html element if dark mode state is true
    if (darkMode) document.documentElement.classList.add('dark');
    console.log('dark mode state:', darkMode);
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    // toggle dark mode state
    setDarkMode((prev) => {
      // save dark mode state to localStorage
      localStorage.setItem('darkMode', String(!prev));
      return !prev;
    });
    // toggle dark mode class on html element
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      className={`fixed bottom-4 right-4 rounded-full p-2 ${
        darkMode ? 'bg-gray-800 text-white' : 'border bg-white text-gray-800'
      }`}
      onClick={handleToggleDarkMode}
    >
      {
        // render dark mode icon based on dark mode state
        darkMode ? (
          <SunIcon className="h-6 w-6" />
        ) : (
          <MoonIcon className="h-6 w-6" />
        )
      }
    </button>
  );
}
