
import React from 'react';
import devSocket from "@socketserver/client/dev-socket";
import { IAnimationData, IAnimationDefinition, IAnimationEntry, ITimeline } from 'variojs';
import { 
  saveAnimationDefinition,
  disconnectAnimationDefinition,
  connectAnimationDefinition,
  removeNumberVariable,
  addEditAnimationEntry,
  addEditNumberVariable,
  removeBreakpoint,
  addEditBreakpoint,
  addTimeline,
  removeTimeline,
  connectAnimationEntryToTimeline,
  disconnectAnimationEntryFromTimeline,
  editTimeline,
  setActiveParallaxTimeline,
  deleteAnimationDefinition,
} from '@helpers/animationData';
import { cloneObject } from '@helpers/general';

interface Props {
    children: React.ReactNode
    animationData: IAnimationData
}

enum AnimationDataActions {
    setActiveAnimationEntry = 'setActiveAnimationEntry',
    setAnimationData = 'setAnimationData',
    addEditAnimationEntry = 'addEditAnimationEntry',
    saveAnimationDefinition = 'saveAnimationDefinition',
    setBreakpoint = 'setBreakpoint',
    connectAnimationDefinition = 'connectAnimationDefinition',
    setActiveParallaxTimeline = 'setActiveParallaxTimeline',
    disconnectAnimationDefinition = 'disconnectAnimationDefinition',
    connectAnimationEntryToTimeline = 'connectAnimationEntryToTimeline',
    editTimeline = 'editTimeline',
    disconnectAnimationEntryFromTimeline = 'disconnectAnimationEntryFromTimeline',
    setActiveAnimationDefinition = 'setActiveAnimationDefinition',
    addNumberVariable = 'addNumberVariable',
    addTimeline = 'addTimeline',
    removeTimeline = 'removeTimeline',
    removeNumberVariable = 'removeNumberVariable',
    editNumberVariable = 'editNumberVariable',
    deleteAnimationDefinition = 'deleteAnimationDefinition',
    addBreakpoint = 'addBreakpoint',
    editBreakpoint = 'editBreakpoint',
    removeBreakpoint = 'removeBreakpoint',
}
type ActionSetActiveAnimationEntry = {
    type: AnimationDataActions.setActiveAnimationEntry
    activeAnimationEntry: {
      id?:string,
    }
}

type ActionSetActiveAnimationDefinition = {
  type: AnimationDataActions.setActiveAnimationDefinition
  animationDefinitionId: string | undefined
}

type ActionEditTimeline = {
  type: AnimationDataActions.editTimeline
  timeline: ITimeline
}

type ActionsetAnimationData = {
  type: AnimationDataActions.setAnimationData
  animationData: IAnimationData
}

type ActionSaveAnimationDefinition = {
  type: AnimationDataActions.saveAnimationDefinition
  animationDefinition: IAnimationDefinition
}

type ActionAddEditAnimationEntry = {
  type: AnimationDataActions.addEditAnimationEntry,
  animationEntry: IAnimationEntry
}

type ActionAddTimeline = {
  type: AnimationDataActions.addTimeline,
  id: string
  parallax: boolean,
}

type ActionRemoveTimeline = {
  type: AnimationDataActions.removeTimeline,
  id: string
  parallax: boolean,
}

type ActionSetBreakpoint = {
  type: AnimationDataActions.setBreakpoint,
  breakpoint: string
}

type ActionConnectAnimationDefinition = {
  type: AnimationDataActions.connectAnimationDefinition,
  definitionId: string
  animationEntryId: string,
}

type ActionConnectAnimationEntryToTimeline = {
  type: AnimationDataActions.connectAnimationEntryToTimeline,
  timelineId: string
  animationEntryId: string,
  parallax: boolean,
}

type ActionDisconnectAnimationEntryFromTimeline = {
  type: AnimationDataActions.disconnectAnimationEntryFromTimeline,
  timelineId: string
  animationEntryId: string,
  parallax: boolean,
}

type ActionDisconnectAnimationDefinition = {
  type: AnimationDataActions.disconnectAnimationDefinition,
  definitionId: string
  animationEntryId: string,
}

type ActionAddNumberVariable = {
  type: AnimationDataActions.addNumberVariable,
  name: string
  value: number
}

type ActionSetActiveParallaxTimeline = {
  type: AnimationDataActions.setActiveParallaxTimeline,
  timelineId: string
}

type ActionEditNumberVariable = {
  type: AnimationDataActions.editNumberVariable,
  name: string
  value: number
}

type ActionRemoveNumberVariable = {
  type: AnimationDataActions.removeNumberVariable,
  name: string
  value: number
}

type ActionDeleteAnimationDefinition = {
  type: AnimationDataActions.deleteAnimationDefinition,
  definitionId: string
}

type ActionRemoveBreakpoint = {
  type: AnimationDataActions.removeBreakpoint,
  id: string
}

type ActionEditBreakpoint = {
  type: AnimationDataActions.editBreakpoint,
  id: string
  definition: string
  order: number
}

type ActionAddBreakpoint = {
  type: AnimationDataActions.addBreakpoint,
  id: string
  definition: string
  order: number
}


type Dispatch = (action: 
  ActionSetActiveAnimationEntry | 
  ActionSetActiveAnimationDefinition | 
  ActionAddTimeline | 
  ActionRemoveTimeline | 
  ActionSetActiveParallaxTimeline | 
  ActionsetAnimationData |
  ActionSaveAnimationDefinition |
  ActionSetActiveAnimationDefinition |
  ActionSaveAnimationDefinition |
  ActionEditTimeline |
  ActionSetBreakpoint |
  ActionDeleteAnimationDefinition |
  ActionRemoveBreakpoint |
  ActionEditBreakpoint |
  ActionAddBreakpoint |
  ActionConnectAnimationDefinition |
  ActionDisconnectAnimationDefinition |
  ActionConnectAnimationEntryToTimeline |
  ActionDisconnectAnimationEntryFromTimeline |
  ActionAddNumberVariable |
  ActionRemoveNumberVariable |
  ActionEditNumberVariable |
  ActionAddEditAnimationEntry
) => void

type AnimationDataState = {
  activeAnimationEntry: IAnimationEntry | undefined
  activeAnimationDefinition: string | undefined
  animationData: IAnimationData
  breakpoint: string
}


function animationDataReducer(state: AnimationDataState, 
  action: any
) {
    switch (action.type) {
      case AnimationDataActions.setActiveAnimationEntry: {
        return {
            ...state,
            activeAnimationEntry: action.activeAnimationEntry,
        }
      }
      case AnimationDataActions.addEditAnimationEntry: {
        const animationData = cloneObject(addEditAnimationEntry(state, action.animationEntry));
        devSocket.setAnimationData(animationData);
        return {
            ...state,
            animationData
        }
      }
      case AnimationDataActions.addTimeline: {
        const animationData = cloneObject(addTimeline(state, action.id, action.parallax));
        devSocket.setAnimationData(animationData);
        return {
            ...state,
            animationData
        }
      }
      case AnimationDataActions.setActiveParallaxTimeline: {
        const animationData = cloneObject(setActiveParallaxTimeline(state, action.timelineId));
        devSocket.setAnimationData(animationData);
        return {
            ...state,
            animationData
        }
      }
      case AnimationDataActions.removeTimeline: {
        const animationData = cloneObject(removeTimeline(state, action.id, action.parallax));
        devSocket.setAnimationData(animationData);
        return {
            ...state,
            animationData
        }
      }
      case AnimationDataActions.setActiveAnimationDefinition: {
        return {
            ...state,
            activeAnimationDefinition: action.animationDefinitionId
        }
      }
      case AnimationDataActions.setAnimationData: {
        return {
            ...state,
            animationData: action.animationData
        }
      }
      case AnimationDataActions.disconnectAnimationDefinition: {
        const animationData = cloneObject(disconnectAnimationDefinition(state, action.animationEntryId, action.definitionId));
        devSocket.setAnimationData(animationData);
        return {
            ...state,
            animationData
        }
      }
      case AnimationDataActions.disconnectAnimationEntryFromTimeline: {
        const animationData = cloneObject(disconnectAnimationEntryFromTimeline(state, action.timelineId, action.animationEntryId, action.parallax));
        devSocket.setAnimationData(animationData);
        return {
            ...state,
            animationData
        }
      }
      case AnimationDataActions.connectAnimationEntryToTimeline: {
        const animationData = cloneObject(connectAnimationEntryToTimeline(state, action.timelineId, action.animationEntryId, action.parallax));
        devSocket.setAnimationData(animationData);
        return {
            ...state,
            animationData
        }
      }
      case AnimationDataActions.deleteAnimationDefinition: {
        const animationData = cloneObject(deleteAnimationDefinition(state, action.definitionId));
        devSocket.setAnimationData(animationData);
        return {
            ...state,
            animationData
        }
      }
      case AnimationDataActions.addBreakpoint: {
        const animationData = cloneObject(addEditBreakpoint(state, action.id, action.definition, action.order));
        devSocket.setAnimationData(animationData);
        return {
            ...state,
            animationData
        }
      }
      case AnimationDataActions.removeBreakpoint: {
        const animationData = cloneObject(removeBreakpoint(state, action.id));
        devSocket.setAnimationData(animationData);
        return {
            ...state,
            animationData
        }
      }
      case AnimationDataActions.editBreakpoint: {
        const animationData = cloneObject(addEditBreakpoint(state, action.id, action.definition, action.order));
        devSocket.setAnimationData(animationData);
        return {
            ...state,
            animationData
        }
      }
      case AnimationDataActions.editNumberVariable: {
        const animationData = cloneObject(addEditNumberVariable(state, action.name, action.value));
        devSocket.setAnimationData(animationData);
        return {
            ...state,
            animationData
        }
      }
      case AnimationDataActions.addNumberVariable: {
        const animationData = cloneObject(addEditNumberVariable(state, action.name, action.value));
        devSocket.setAnimationData(animationData);
        return {
            ...state,
            animationData
        }
      }
      case AnimationDataActions.removeNumberVariable: {
        const animationData = cloneObject(removeNumberVariable(state, action.name));
        devSocket.setAnimationData(animationData);
        return {
            ...state,
            animationData
        }
      }
      case AnimationDataActions.editTimeline: {
        const animationData = cloneObject(editTimeline(state, action.timeline));
        devSocket.setAnimationData(animationData);
        return {
            ...state,
            animationData
        }
      }
      case AnimationDataActions.connectAnimationDefinition: {
        const animationData = cloneObject(connectAnimationDefinition(state, action.animationEntryId, action.definitionId));
        devSocket.setAnimationData(animationData);
        return {
            ...state,
            animationData
        }
      }
      case AnimationDataActions.setBreakpoint: {
        return {
            ...state,
            breakpoint: action.breakpoint
        }
      }
      case AnimationDataActions.saveAnimationDefinition: {
        const animationData = cloneObject(saveAnimationDefinition(state, action.animationDefinition));
        devSocket.setAnimationData(animationData);
        return {
            ...state,
            animationData
        }
      }
      default: {
        throw new Error(`Unhandled action type: ${(action as any).type}`)
      }
    }
  }
  
const AnimationDataDispatchContext = React.createContext<Dispatch | undefined>(undefined,)
const AnimationDataStateContext = React.createContext<AnimationDataState | undefined>(undefined);

function AnimationDataProvider({children, animationData}: Props) {
    const [state, dispatch] = React.useReducer(animationDataReducer, {
      activeAnimationEntry: undefined,
      activeAnimationDefinition: undefined,
      breakpoint: 'default',
      animationData
    });

    return (
      <AnimationDataStateContext.Provider value={state}>
            <AnimationDataDispatchContext.Provider value={dispatch}>
                {children}
            </AnimationDataDispatchContext.Provider>
      </AnimationDataStateContext.Provider>
    )
  }

  function useAnimationDataState() {
    const context = React.useContext(AnimationDataStateContext)
    if (context === undefined) {
      throw new Error('useAnimationDataState must be used within a AnimationDataProvider')
    }
    return context
  }


  function useAnimationDataDispatch() {
    const context = React.useContext(AnimationDataDispatchContext)
    if (context === undefined) {
      throw new Error('useAnimationDataDispatch must be used within a AnimationDataProvider')
    }
    return context
  }
  
  export {
    AnimationDataProvider,
    useAnimationDataDispatch,
    useAnimationDataState,
    AnimationDataActions,
    AnimationDataState
  }