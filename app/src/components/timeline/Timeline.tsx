import React from "react";
import styled from "styled-components";
import {getAnimationEntryById, getTimelineById} from "variojs";
import { Colors } from '@enums/colors';
import {useAnimationDataState} from "@context/animation-data/AnimaitonDataContext";
import TimelineAnimationEntry from '@components/timeline/TimelineAnimationEntry';

const TimelineEl = styled.div`
  width: 100%;
  height: 30vh;
  position: fixed;
  background-color: ${Colors.softWhite};
  bottom: 0;
  left: 0;
`;

const TimelineEntries = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: scroll;
`

const Timeline = () => {
    const {animationData, activeTimeline} = useAnimationDataState();
    
    let timeline:any;
    if(activeTimeline) {
        timeline = getTimelineById(animationData, activeTimeline.timelineId);
        
    }

    return (
        <TimelineEl>
             <TimelineEntries>
                {
                    (timeline && timeline.animationEntries)?
                    timeline.animationEntries.map((entryId: string) => {
                                        
                        const entry = getAnimationEntryById(animationData, entryId);
                        if(!entry) {
                            return;
                        }
                        return (
                            <TimelineAnimationEntry key={entryId} animationEntry={entry} />
                        )
                    }): null
                }
            </TimelineEntries>
           
        </TimelineEl>
    )
}

export default Timeline;