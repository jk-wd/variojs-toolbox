
import React from 'react';
import { ISocketSiteData } from '@interfaces/data';
import { ISite } from '@interfaces/site';

interface Props {
    children: React.ReactNode
}

enum SiteActions {
    setActiveSite = 'setActiveSite',
    removeSite = 'removeSite',
    updateSite = 'updateSite',
}

type ActionUpdateSite = {
    type: SiteActions.updateSite
    siteData: ISocketSiteData
}

type ActionSetActiveSite = {
    type: SiteActions.setActiveSite
    url: string
}

type ActionRemoveSite = {
    type: SiteActions.removeSite
    url?: string
}

type Dispatch = (action: 
  ActionSetActiveSite | 
  ActionUpdateSite |
  ActionRemoveSite
) => void

type SiteState = {
  sites: ISite[]
}


function siteReducer(state: SiteState, 
  action: any
) {
    switch (action.type) {
      case SiteActions.setActiveSite: {
        return {
            ...state,
            sites: state.sites.map((site:ISite) => {
              return {
                  ...site,
                  active:(site.url === action.url)
              }
            }),
        }
      }
      case SiteActions.removeSite: {
        let sites: ISite[] = state.sites.reduce((result:ISite[], siteTarget:ISite) => {
          if(siteTarget.url !== action.url) {
            result.push(siteTarget);
          } 
          return result;
        }, []);
        return {
          ...state,
          sites,
      }
      }
      case SiteActions.updateSite: {
        const site: ISite = {
          animationData:action.siteData.animationData,
          animationDataIndex:0,
          timelineStates:action.siteData.timelineStates,
          pixelTimelineStates:action.siteData.pixelTimelineStates,
          numbers:action.siteData.numbers,
          placeholders:action.siteData.placeholders,
          url:action.siteData.siteUrl,
          active: false
      }
        let updated = false;
        let sites: ISite[] = state.sites.map((siteTarget:ISite) => {
          if(siteTarget.url === site.url) {
            updated = true;
            return {
              ...siteTarget,
              ...site,
              animationDataIndex: siteTarget.animationDataIndex,
              active: siteTarget.active
            }
          } else {
            return siteTarget;
          }
        });

        if(!updated) {
          sites = [...state.sites, site];
        }

        return {
            ...state,
            sites,
        }
      }
      default: {
        throw new Error(`Unhandled action type: ${(action as any).type}`)
      }
    }
  }
  
const SiteDispatchContext = React.createContext<Dispatch | undefined>(undefined,)
const SiteStateContext = React.createContext<SiteState | undefined>(undefined);

function SiteProvider({children}: Props) {
    const [state, dispatch] = React.useReducer(siteReducer, {
      sites: [],
    });

    return (
      <SiteStateContext.Provider value={state}>
            <SiteDispatchContext.Provider value={dispatch}>
                {children}
            </SiteDispatchContext.Provider>
      </SiteStateContext.Provider>
    )
  }

  function useSiteState() {
    const context = React.useContext(SiteStateContext)
    if (context === undefined) {
      throw new Error('useSiteState must be used within a SiteProvider')
    }
    return context
  }


  function useSiteDispatch() {
    const context = React.useContext(SiteDispatchContext)
    if (context === undefined) {
      throw new Error('useSiteDispatch must be used within a SiteProvider')
    }
    return context
  }
  
  export {
    SiteProvider,
    useSiteDispatch,
    useSiteState,
    SiteActions,
    SiteState
  }