
import React from 'react';
import devSocket from "@socketserver/client/dev-socket";
import { IAnimationData, IAnimationDefinition, IAnimationEntry, ITimeline, getEndOfTimeline, IAnimationConnection } from 'variojs';
import { 
  disconnectAnimationDefinitionFromEntry,
  connectAnimationDefinitionToEntry,
  addEditAnimationDefinition,
  removeNumberVariable,
  addEditAnimationEntry,
  addEditNumberVariable,
  removeBreakpoint,
  addEditBreakpoint,
  addTimeline,
  deleteTimeline,
  connectAnimationEntryToTimeline,
  disconnectAnimationEntryFromTimeline,
  editTimeline,
  setActiveParallaxTimeline,
  addEditAnimationEntryConnection,
  deleteAnimationDefinition,
  deleteAnimationEntry,
} from '@helpers/animationData';
import { cloneObject } from '@helpers/object';
import {IActiveTimeline} from '@interfaces/timeline';



interface Props {
    children: React.ReactNode
    animationData: IAnimationData
}

enum AnimationDataActions {
    setActiveAnimationEntry = 'setActiveAnimationEntry',
    setFilterByFrameId = 'setFilterByFrameId',
    addEditAnimationEntryConnection = 'addEditAnimationEntryConnection',
    setActiveTimeline = 'setActiveTimeline',
    setActiveParallaxTimeline = 'setActiveParallaxTimeline',
    setAnimationData = 'setAnimationData',
    addEditAnimationEntry = 'addEditAnimationEntry',
    addEditAnimationDefinition = 'addEditAnimationDefinition',
    connectAnimationDefinitionToEntry = 'connectAnimationDefinitionToEntry',
    disconnectAnimationDefinitionFromEntry = 'connectAnimationDefinitionFromEntry',
    connectAnimationEntryToTimeline = 'connectAnimationEntryToTimeline',
    setSelectedBreakpoint = 'setSelectedBreakpoint',
    editTimeline = 'editTimeline',
    disconnectAnimationEntryFromTimeline = 'disconnectAnimationEntryFromTimeline',
    setActiveAnimationDefinition = 'setActiveAnimationDefinition',
    addNumberVariable = 'addNumberVariable',
    addTimeline = 'addTimeline',
    deleteTimeline = 'deleteTimeline',
    removeNumberVariable = 'removeNumberVariable',
    editNumberVariable = 'editNumberVariable',
    deleteAnimationDefinition = 'deleteAnimationDefinition',
    deleteAnimationEntry = 'deleteAnimationEntry',
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

type ActionSetActiveTimeline = {
    type: AnimationDataActions.setActiveTimeline
    timeline: {
      timelineId?:string,
      parallax:boolean,
    }
}
type ActionSetFilterByFrameId = {
    type: AnimationDataActions.setFilterByFrameId
    frameId:string | undefined
}
type ActionSetSelectedBreakpoint = {
    type: AnimationDataActions.setSelectedBreakpoint
    breakpointId: string,
}

type ActionSetActiveAnimationDefinition = {
  type: AnimationDataActions.setActiveAnimationDefinition
  animationDefinitionId: string | undefined
}

type ActionEditTimeline = {
  type: AnimationDataActions.editTimeline
  timeline: ITimeline,
  parallax: boolean,
}

type ActionsetAnimationData = {
  type: AnimationDataActions.setAnimationData
  animationData: IAnimationData
}
type ActionAddEditAnimationEntryConnection = {
  type: AnimationDataActions.addEditAnimationEntryConnection
  animationEntryId: string
  conneciton: IAnimationConnection,
  privateConnection: boolean,
}

type ActionAddEditAnimationDefinition = {
  type: AnimationDataActions.addEditAnimationDefinition
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

type ActionDeleteTimeline = {
  type: AnimationDataActions.deleteTimeline,
  id: string,
  parallax: boolean,
}


type ActionConnectAnimationDefinitionToEntry = {
  type: AnimationDataActions.connectAnimationDefinitionToEntry,
  definitionId: string
  animationEntryId: string,
}

type ActionConnectAnimationEntryToTimeline = {
  type: AnimationDataActions.connectAnimationEntryToTimeline,
  timelineId: string,
  breakpoint: string,
  animationEntryId: string,
  parallax: boolean,
}

type ActionDisconnectAnimationEntryFromTimeline = {
  type: AnimationDataActions.disconnectAnimationEntryFromTimeline,
  timelineId: string
  animationEntryId: string,
  parallax: boolean,
}

type ActionDisconnectAnimationDefinitionToEntry = {
  type: AnimationDataActions.disconnectAnimationDefinitionFromEntry,
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

type ActionDeleteAnimationEntry = {
  type: AnimationDataActions.deleteAnimationEntry,
  animationEntryId: string
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
  ActionDeleteTimeline | 
  ActionSetActiveParallaxTimeline | 
  ActionsetAnimationData |
  ActionAddEditAnimationDefinition |
  ActionSetActiveAnimationDefinition |
  ActionConnectAnimationDefinitionToEntry |
  ActionEditTimeline |
  ActionDeleteAnimationDefinition |
  ActionDeleteAnimationEntry |
  ActionRemoveBreakpoint |
  ActionEditBreakpoint |
  ActionAddBreakpoint |
  ActionDisconnectAnimationDefinitionToEntry |
  ActionAddEditAnimationEntryConnection |
  ActionConnectAnimationEntryToTimeline |
  ActionDisconnectAnimationEntryFromTimeline |
  ActionAddNumberVariable |
  ActionSetActiveTimeline |
  ActionSetSelectedBreakpoint |
  ActionRemoveNumberVariable |
  ActionSetFilterByFrameId |
  ActionEditNumberVariable |
  ActionAddEditAnimationEntry
) => void

type AnimationDataState = {
  activeAnimationEntry: IAnimationEntry | undefined
  activeAnimationDefinition: string | undefined
  animationData: IAnimationData
  activeTimeline: IActiveTimeline | undefined
  filterByFrameId: string | undefined
  selectedBreakpoint: string
}

const defaultState = {
  activeAnimationEntry: undefined,
  activeAnimationDefinition: undefined,
  selectedBreakpoint: 'default',
  filterByFrameId: undefined,
  activeTimeline: undefined,
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
      case AnimationDataActions.setSelectedBreakpoint: {
        return {
            ...state,
            selectedBreakpoint: action.breakpointId,
        }
      }
      case AnimationDataActions.setActiveTimeline: {
        return {
            ...state,
            activeTimeline: {
              ...action.timeline,
              end: getEndOfTimeline(state.animationData, action.timeline.timelineId, action.timeline.parallax),
            }
        }
      }
      case AnimationDataActions.addEditAnimationEntry: {
        const animationData = cloneObject(addEditAnimationEntry(state.animationData, action.animationEntry));
        devSocket.setAnimationData(animationData);
        return {
            ...state,
            animationData,
        }
      }
      case AnimationDataActions.addEditAnimationEntryConnection: {
        const animationData = cloneObject(addEditAnimationEntryConnection(state.animationData, action.animationEntryId, action.conneciton, action.privateConnection));
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
      case AnimationDataActions.deleteTimeline: {
        const animationData = cloneObject(deleteTimeline(state, action.id, action.parallax));
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
      case AnimationDataActions.setFilterByFrameId: {
        return {
            ...state,
            filterByFrameId: action.frameId
        }
      }
      case AnimationDataActions.setAnimationData: {
        if(!action.animationData) {
          return state;
        }
        return {
            ...defaultState,
            animationData: action.animationData
        }
      }
      case AnimationDataActions.disconnectAnimationDefinitionFromEntry: {
        const animationData = cloneObject(disconnectAnimationDefinitionFromEntry(state, action.animationEntryId, action.definitionId));
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
        const animationData = cloneObject(connectAnimationEntryToTimeline(state, action.timelineId, action.animationEntryId, action.breakpoint, action.parallax));
        devSocket.setAnimationData(animationData);
        return {
            ...state,
            animationData
        }
      }
      case AnimationDataActions.deleteAnimationDefinition: {
        const animationData = cloneObject(deleteAnimationDefinition(state.animationData, action.definitionId));
        devSocket.setAnimationData(animationData);
        return {
            ...state,
            animationData
        }
      }
      case AnimationDataActions.deleteAnimationEntry: {
        const animationData = cloneObject(deleteAnimationEntry(state.animationData, action.animationEntryId));
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
      case AnimationDataActions.connectAnimationDefinitionToEntry: {
        const animationData = cloneObject(connectAnimationDefinitionToEntry(state, action.animationEntryId, action.definitionId));
        devSocket.setAnimationData(animationData);
        return {
            ...state,
            animationData
        }
      }
      case AnimationDataActions.addEditAnimationDefinition: {
        const animationData = cloneObject(addEditAnimationDefinition(state.animationData, action.animationDefinition));
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
      ...defaultState,
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