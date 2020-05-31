import React from "react";
import styled from "styled-components";
import {getAnimationEntryById} from "variojs";
import { Colors } from '@interfaces/colors';
import {useAnimationDataState} from "@context/animation-data/AnimaitonDataContext";
import TimelineSelect from '@components/timeline/TimelineSelect';
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
    padding-top: 40px;
    width: 100%;
    height: 100%;
    overflow: scroll;
`

const TimeLineTop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    border-bottom: 1px solid ${Colors.darkGrey};
    height: 40px;
    padding-left: 14px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: ${Colors.lightGrey};
`

const TimelineBreakpointTitle = styled.span`
    width: 100%;
    display: block;
    font-size: 14px;
    font-weight: bold;
    text-decoration: underline;
    height: 40px;
    padding: 10px 0 6px 14px;
    background-color: ${Colors.darkGrey};
    color: ${Colors.white};
`;

const Timeline = () => {
    const {animationData, activeTimeline} = useAnimationDataState();
    

    return (
        <TimelineEl>
             <TimelineEntries>
                {
                    (activeTimeline && activeTimeline.timeline && activeTimeline.timeline.animationEntries)?
                    Object.keys(activeTimeline.timeline.animationEntries).map((breakpoint: string) => {
                        return (
                            <div>
                                <TimelineBreakpointTitle>Breakpoint: {breakpoint}</TimelineBreakpointTitle>
                                {
                                    (activeTimeline.timeline && activeTimeline.timeline.animationEntries)?
                                    activeTimeline.timeline.animationEntries[breakpoint].map((entryId: string) => {
                                        const entry = getAnimationEntryById(animationData, entryId);
                                        if(!entry) {
                                            return;
                                        }
                                        return (
                                            <TimelineAnimationEntry key={entryId} animationEntry={entry} />
                                        )
                                    }): null
                                }
                            </div>
                        )
                    }): null
                }
            </TimelineEntries>
            <TimeLineTop>
                <TimelineSelect />
            </TimeLineTop>
           
        </TimelineEl>
    )
}

export default Timeline;