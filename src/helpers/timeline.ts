import { ISite } from "@interfaces/site";
import { IActiveTimeline } from '@interfaces/timeline';

export const getEndOfActiveTimeline  = (activeTimeline: IActiveTimeline, activeSite?: ISite) => {
    let timelineEnd = 0;
    if(activeSite && activeTimeline.pixelBased){
        const timelineState = activeSite.pixelTimelineStates[activeTimeline.timelineId];
        
        if(timelineState){
            timelineEnd = timelineState.duration || 0;
        }
    } else if(activeSite) {
        const timelineState = activeSite.timelineStates[activeTimeline.timelineId];
        if(timelineState){
            timelineEnd = timelineState.duration || 0;
        }
    }
    return timelineEnd;
  }
  