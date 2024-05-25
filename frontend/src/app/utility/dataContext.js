"use client"
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export function useDataContext() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [patterns, setPatterns] = useState([]);

  return (
    <DataContext.Provider value={{ patterns, setPatterns }}>
      {children}
    </DataContext.Provider>
  );
}
