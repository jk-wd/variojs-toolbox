
import React from 'react';

interface Props {
    children: React.ReactNode
}

enum ModalActions {
    setActiveModal = 'setActiveModal'
}
type Action = {
    type: ModalActions.setActiveModal
    modal: string | undefined
}

type Dispatch = (action: Action) => void

type State = {
  modal?: string
}


function modalReducer(state: State, action: Action) {
    switch (action.type) {
      case ModalActions.setActiveModal: {
        return {
            ...state,
            modal: action.modal
        }
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
  }
  
const ModalDispatchContext = React.createContext<Dispatch | undefined>(undefined)
const ModalStateContext = React.createContext<State | undefined>(undefined);

function ModalProvider({children}: Props) {
    const [state, dispatch] = React.useReducer(modalReducer, {
      modal: undefined
    });

    return (
      <ModalStateContext.Provider value={state}>
            <ModalDispatchContext.Provider value={dispatch}>
                {children}
            </ModalDispatchContext.Provider>
      </ModalStateContext.Provider>
    )
  }

  function useModalState() {
    const context = React.useContext(ModalStateContext)
    if (context === undefined) {
      throw new Error('useModalState must be used within a ModalProvider')
    }
    return context
  }


  function useModalDispatch() {
    const context = React.useContext(ModalDispatchContext)
    if (context === undefined) {
      throw new Error('useModalDispatch must be used within a ModalProvider')
    }
    return context
  }
  
  export {
    ModalProvider,
    useModalState,
    useModalDispatch,
    ModalActions
  }