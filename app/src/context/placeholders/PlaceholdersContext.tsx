
import React from 'react';

interface Props {
    children: React.ReactNode
    placeholders: string[]
}

const PlaceholdersContext = React.createContext<string[]>([]);

function PlaceholdersProvider({children, placeholders}: Props) {
  return (
    <PlaceholdersContext.Provider value={placeholders}>
          {children}
    </PlaceholdersContext.Provider>
  )
}

function usePlaceholders() {
  const context = React.useContext(PlaceholdersContext)
  if (context === undefined) {
    throw new Error('usePlaceholders must be used within a PlaceholdersProvider')
  }
  return context
}

  export {
    PlaceholdersProvider,
    usePlaceholders
  }