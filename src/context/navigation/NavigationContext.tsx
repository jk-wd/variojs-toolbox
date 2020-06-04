
import React from 'react';
import {Sections} from '@interfaces/navigation';

interface Props {
    children: React.ReactNode
}

enum NavigationActions {
    setActiveSection = 'setActiveSection'
}
type Action = {
    type: NavigationActions.setActiveSection
    section: string
}

type Dispatch = (action: Action) => void

type State = {
  sections: string[]
}


function navigationReducer(state: State, action: Action) {
    switch (action.type) {
      case NavigationActions.setActiveSection: {
        const lastActiveSection = state.sections[state.sections.length - 1];
        if(lastActiveSection && lastActiveSection === action.section){
          return  state;
        }
        return {
            ...state,
            sections: [...state.sections, action.section]
        }
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
  }
  
const NavigationDispatchContext = React.createContext<Dispatch | undefined>(undefined)
const NavigationStateContext = React.createContext<State | undefined>(undefined);

function NavigationProvider({children}: Props) {
    const [state, dispatch] = React.useReducer(navigationReducer, {
      sections: [Sections.MENU]
    });

    return (
      <NavigationStateContext.Provider value={state}>
            <NavigationDispatchContext.Provider value={dispatch}>
                {children}
            </NavigationDispatchContext.Provider>
      </NavigationStateContext.Provider>
    )
  }

  function useNavigationState() {
    const context = React.useContext(NavigationStateContext)
    if (context === undefined) {
      throw new Error('useNavigationState must be used within a NavigationProvider')
    }
    return context
  }


  function useNavigationDispatch() {
    const context = React.useContext(NavigationDispatchContext)
    if (context === undefined) {
      throw new Error('useNavigationDispatch must be used within a NavigationProvider')
    }
    return context
  }
  
  export {NavigationProvider, useNavigationState, useNavigationDispatch, NavigationActions}