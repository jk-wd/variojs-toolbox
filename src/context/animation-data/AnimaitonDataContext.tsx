
import React from 'react';
import devSocket from "@socketserver/client/dev-socket";
import { IAnimationData, IAnimationDefinition, IAnimationEntry, ITimeline, getEndOfTimeline, IAnimationConnection, IBreakpoint } from 'variojs';
import { 
  deleteAnimationEntryConnection,
  addAnimationEntryConnection,
  editAnimationEntryConnection,
  editAnimationEntry,
  addAnimationEntry,
  deleteAnimationEntry,
  addAnimationDefinition,
  editAnimationDefinition,
  deleteAnimationDefinition,
  addTimeline,
  editTimeline,
  deleteTimeline,
  connectTimelineAnimationEntry,
  disconnectTimelineAnimationEntry,
  deleteNumberVariable,
  addEditNumberVariable,
  addBreakpoint,
  editBreakpoint,
  deleteBreakpoint,
  NoBreakpointIdentifier
} from 'variojs';

import { cloneObject } from '@helpers/object';
import {IActiveTimeline} from '@interfaces/timeline';



interface Props {
    children: React.ReactNode
    animationData: IAnimationData
}

enum AnimationDataActions {
    setActiveAnimationEntry = 'setActiveAnimationEntry',
    setFilterByFrameId = 'setFilterByFrameId',
    setActiveTimeline = 'setActiveTimeline',
    setAnimationData = 'setAnimationData',
    setSelectedBreakpoint = 'setSelectedBreakpoint',
    setActiveAnimationDefinition = 'setActiveAnimationDefinition',

    deleteAnimationEntryConnection = 'deleteAnimationEntryConnection',
    addAnimationEntryConnection = 'addAnimationEntryConnection',
    editAnimationEntryConnection = 'editAnimationEntryConnection',

    addAnimationEntry = 'addAnimationEntry',
    editAnimationEntry = 'editAnimationEntry',
    deleteAnimationEntry = 'deleteAnimationEntry',

    addAnimationDefinition = 'addAnimationDefinition',
    editAnimationDefinition = 'editAnimationDefinition',
    deleteAnimationDefinition = 'deleteAnimationDefinition',

    editTimeline = 'editTimeline',
    addTimeline = 'addTimeline',
    deleteTimeline = 'deleteTimeline',

    connectTimelineAnimationEntry = 'connectTimelineAnimationEntry',
    disconnectTimelineAnimationEntry = 'disconnectTimelineAnimationEntry',

    addEditNumberVariable = 'addEditNumberVariable',
    deleteNumberVariable = 'deleteNumberVariable',
    
    addBreakpoint = 'addBreakpoint',
    editBreakpoint = 'editBreakpoint',
    deleteBreakpoint = 'deleteBreakpoint',
}
type ActionSetActiveAnimationEntry = {
    type: AnimationDataActions.setActiveAnimationEntry
    activeAnimationEntry: {
      id?:string,
    }
}

type ActionSetFilterByFrameId = {
  type: AnimationDataActions.setFilterByFrameId
  frameId:string | undefined
}

type ActionSetActiveTimeline = {
    type: AnimationDataActions.setActiveTimeline
    timeline: {
      timelineId?:string,
      pixelBased:boolean,
    }
}

type ActionsetAnimationData = {
  type: AnimationDataActions.setAnimationData
  animationData: IAnimationData
}

type ActionSetSelectedBreakpoint = {
    type: AnimationDataActions.setSelectedBreakpoint
    breakpointId: string,
}

type ActionSetActiveAnimationDefinition = {
  type: AnimationDataActions.setActiveAnimationDefinition
  animationDefinitionId: string | undefined
}

//ANIMATION ENTRY

type ActionDeleteAnimationEntryConnection = {
  type: AnimationDataActions.deleteAnimationEntryConnection
  animationEntryId: string,
  animationDefinitionId: string,
  local:boolean
}

type ActionAddAnimationEntryConnection = {
  type: AnimationDataActions.addAnimationEntryConnection
  animationEntryId: string,
  animationConnection: IAnimationConnection,
  local: boolean
}

type ActionEditAnimationEntryConnection = {
  type: AnimationDataActions.editAnimationEntryConnection
  animationEntryId: string,
  animationConnection: IAnimationConnection,
  local: boolean
}

type ActionAddAnimationEntry = {
  type: AnimationDataActions.addAnimationEntry
  animationEntry: Partial<IAnimationEntry>,
}

type ActionEditAnimationEntry = {
  type: AnimationDataActions.editAnimationEntry
  animationEntry: IAnimationEntry,
}

type ActionDeleteAnimationEntry = {
  type: AnimationDataActions.deleteAnimationEntry
  animationEntryId: string,
}

//ANIMATION DEFINITION

type ActionAddAnimationDefinition = {
  type: AnimationDataActions.addAnimationDefinition
  animationDefinition: Partial<IAnimationDefinition>,
}

type ActionEditAnimationDefinition = {
  type: AnimationDataActions.editAnimationDefinition
  animationDefinition: IAnimationDefinition,
}

type ActionDeleteAnimationDefinition = {
  type: AnimationDataActions.deleteAnimationDefinition
  animationDefinitionId: string,
}

// TIMELINE

type ActionEditTimeline = {
  type: AnimationDataActions.editTimeline
  timeline: ITimeline,
}

type ActionAddTimeline = {
  type: AnimationDataActions.addTimeline,
  timeline: Partial<ITimeline>,
}

type ActionDeleteTimeline = {
  type: AnimationDataActions.deleteTimeline,
  timelineId: string,
}

type ActionConnectTimelineAnimationEntry = {
  type: AnimationDataActions.connectTimelineAnimationEntry,
  timelineId:string,
  animationEntryId:string
}

type ActionDisconnectTimelineAnimationEntry = {
  type: AnimationDataActions.disconnectTimelineAnimationEntry,
  timelineId:string,
  animationEntryId:string
}

//NUMBER VARIABLES
type ActionAddEditNumberVariable = {
  type: AnimationDataActions.addEditNumberVariable,
  name: string,
  value: number
}

type ActionDeleteNumberVariable = {
  type: AnimationDataActions.deleteNumberVariable,
  name: string,
}

//BREAKPOINTS
type ActionAddBreakpoint = {
  type: AnimationDataActions.addBreakpoint,
  breakpoint: Partial<IBreakpoint>,
}

type ActionDeleteBreakpoint = {
  type: AnimationDataActions.deleteBreakpoint,
  breakpointId: string,
}

type ActionEditBreakpoint = {
  type: AnimationDataActions.editBreakpoint,
  breakpoint: IBreakpoint,
}


type Dispatch = (action: 
  ActionSetActiveAnimationEntry |
  ActionSetFilterByFrameId |
  ActionSetActiveTimeline |
  ActionsetAnimationData |
  ActionSetSelectedBreakpoint |
  ActionSetActiveAnimationDefinition |
  ActionDeleteAnimationEntryConnection |
  ActionAddAnimationEntryConnection |
  ActionEditAnimationEntryConnection |
  ActionAddAnimationEntry |
  ActionEditAnimationEntry |
  ActionDeleteAnimationEntry |
  ActionAddAnimationDefinition |
  ActionEditAnimationDefinition |
  ActionDeleteAnimationDefinition |
  ActionEditTimeline |
  ActionAddTimeline |
  ActionDeleteTimeline |
  ActionConnectTimelineAnimationEntry |
  ActionDisconnectTimelineAnimationEntry |
  ActionDeleteNumberVariable |
  ActionAddEditNumberVariable |
  ActionAddBreakpoint |
  ActionDeleteBreakpoint |
  ActionEditBreakpoint
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
  selectedBreakpoint: NoBreakpointIdentifier,
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
      case AnimationDataActions.setFilterByFrameId: {
        return {
            ...state,
            filterByFrameId: action.frameId
        }
      }
      case AnimationDataActions.setActiveTimeline: {
        return {
            ...state,
            activeTimeline: {
              ...action.timeline,
              end: getEndOfTimeline(state.animationData, action.timeline.timelineId),
            }
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
      case AnimationDataActions.setSelectedBreakpoint: {
        return {
            ...state,
            selectedBreakpoint: action.breakpointId,
        }
      }
      case AnimationDataActions.setActiveAnimationDefinition: {
        return {
            ...state,
            activeAnimationDefinition: action.animationDefinitionId
        }
      }

      //ANIMATION ENTRY
      case AnimationDataActions.deleteAnimationEntryConnection: {
        const animationData = cloneObject(deleteAnimationEntryConnection(state.animationData, action.animationEntryId, action.animationDefinitionId, action.local));
        devSocket.updateAnimationData(animationData);
        return {
            ...state,
            animationData,
        }
      }

      case AnimationDataActions.addAnimationEntryConnection: {
        const animationData = cloneObject(addAnimationEntryConnection(state.animationData, action.animationEntryId, action.animationConnection, action.local));
        devSocket.updateAnimationData(animationData);
        return {
            ...state,
            animationData,
        }
      }

      case AnimationDataActions.editAnimationEntryConnection: {
        const animationData = cloneObject(editAnimationEntryConnection(state.animationData, action.animationEntryId, action.animationConnection, action.local));
        devSocket.updateAnimationData(animationData);
        return {
            ...state,
            animationData,
        }
      }

      case AnimationDataActions.addAnimationEntry: {
        const animationData = cloneObject(addAnimationEntry(state.animationData, action.animationEntry));
        devSocket.updateAnimationData(animationData);
        return {
            ...state,
            animationData,
        }
      }

      case AnimationDataActions.editAnimationEntry: {
        const animationData = cloneObject(editAnimationEntry(state.animationData, action.animationEntry));
        devSocket.updateAnimationData(animationData);
        return {
            ...state,
            animationData,
        }
      }

      case AnimationDataActions.deleteAnimationEntry: {
        const animationData = cloneObject(deleteAnimationEntry(state.animationData, action.animationEntryId));
        devSocket.updateAnimationData(animationData);
        return {
            ...state,
            animationData,
        }
      }

      // ANIMATION DEFINITION
      case AnimationDataActions.addAnimationDefinition: {
        const animationData = cloneObject(addAnimationDefinition(state.animationData, action.animationDefinition));
        devSocket.updateAnimationData(animationData);
        return {
            ...state,
            animationData,
        }
      }

      case AnimationDataActions.editAnimationDefinition: {
        const animationData = cloneObject(editAnimationDefinition(state.animationData, action.animationDefinition));
        devSocket.updateAnimationData(animationData);
        return {
            ...state,
            animationData,
        }
      }

      case AnimationDataActions.deleteAnimationDefinition: {
        const animationData = cloneObject(deleteAnimationDefinition(state.animationData, action.animationDefinitionId));
        devSocket.updateAnimationData(animationData);
        return {
            ...state,
            animationData,
        }
      }

      // TIMELINE
      case AnimationDataActions.editTimeline: {
        const animationData = cloneObject(editTimeline(state.animationData, action.timeline));
        devSocket.updateAnimationData(animationData);
        return {
            ...state,
            animationData,
        }
      }

      case AnimationDataActions.addTimeline: {
        const animationData = cloneObject(addTimeline(state.animationData, action.timeline));
        devSocket.updateAnimationData(animationData);
        return {
            ...state,
            animationData,
        }
      }

      case AnimationDataActions.deleteTimeline: {
        const animationData = cloneObject(deleteTimeline(state.animationData, action.timelineId));
        devSocket.updateAnimationData(animationData);
        return {
            ...state,
            animationData,
        }
      }

      case AnimationDataActions.connectTimelineAnimationEntry: {
        const animationData = cloneObject(connectTimelineAnimationEntry(state.animationData, action.timelineId, action.animationEntryId));
        devSocket.updateAnimationData(animationData);
        return {
            ...state,
            animationData,
        }
      }

      case AnimationDataActions.disconnectTimelineAnimationEntry: {
        const animationData = cloneObject(disconnectTimelineAnimationEntry(state.animationData, action.timelineId, action.animationEntryId));
        devSocket.updateAnimationData(animationData);
        return {
            ...state,
            animationData,
        }
      }

      // NUMBER VARIABLES
      case AnimationDataActions.addEditNumberVariable: {
        const animationData = cloneObject(addEditNumberVariable(state.animationData, action.name, action.value));
        devSocket.updateAnimationData(animationData);
        return {
            ...state,
            animationData,
        }
      }

      case AnimationDataActions.deleteNumberVariable: {
        const animationData = cloneObject(deleteNumberVariable(state.animationData, action.name));
        devSocket.updateAnimationData(animationData);
        return {
            ...state,
            animationData,
        }
      }

      // BREAKPOINTS
      case AnimationDataActions.addBreakpoint: {
        const animationData = cloneObject(addBreakpoint(state.animationData, action.breakpoint));
        devSocket.updateAnimationData(animationData);
        return {
            ...state,
            animationData,
        }
      }

      case AnimationDataActions.editBreakpoint: {
        const animationData = cloneObject(editBreakpoint(state.animationData, action.breakpoint));
        devSocket.updateAnimationData(animationData);
        return {
            ...state,
            animationData,
        }
      }

      case AnimationDataActions.deleteBreakpoint: {
        const animationData = cloneObject(deleteBreakpoint(state.animationData, action.breakpointId));
        devSocket.updateAnimationData(animationData);
        return {
            ...state,
            animationData,
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