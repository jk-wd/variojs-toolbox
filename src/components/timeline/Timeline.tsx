import React from "react";
import styled from "styled-components";
import {getAnimationEntryById, IBreakpoint, getParallaxTimelineById, getTimelineById} from "variojs";
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import {Sections} from "@enums/navigation";
import { Colors } from '@enums/colors';
import {useAnimationDataState, useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import TimelineSelect from '@components/timeline/TimelineSelect';
import TimelineAnimationEntry from '@components/timeline/TimelineAnimationEntry';
import Button from '@components/Button';
import CtaMain from '@components/cta/CtaMain';

const TimelineEl = styled.div`
  width: 100%;
  height: 35vh;
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
    border-bottom: 1px solid ${Colors.midGrey};
    font-family: "ProximaNova-Bold";
    height: 40px;
    padding: 10px 0 6px 14px;
    background-color: ${Colors.darkGrey};
    color: ${Colors.white};
    button {
        margin-left: 10px;
        margin-right: 10px;
        position: relative;
        top: -2px;
        float: right;
    }
`;

const Timeline = () => {
    const {animationData, activeTimeline} = useAnimationDataState();
    const dispatchNavigation = useNavigationDispatch();
    const dispatchAnimationData = useAnimationDataDispatch();
    let timeline:any;
    if(activeTimeline) {
        timeline = (activeTimeline.parallax)? getParallaxTimelineById(animationData, activeTimeline.timelineId): getTimelineById(animationData, activeTimeline.timelineId);
    }
    let breakpoints = (animationData.breakpoints)?animationData.breakpoints : [];
    breakpoints = [...breakpoints, {
        id: 'default',
        order: 0,
        definition: ''
    }];
    return (
        <TimelineEl>
             <TimelineEntries>
                {
                    (breakpoints)?
                    breakpoints.map((breakpoint: IBreakpoint, index:number) => {
                        if(!breakpoint) {
                            return;
                        }
                        return (
                            <div key={breakpoint.id +''+ index}>
                                <TimelineBreakpointTitle>
                                    Breakpoint: {breakpoint.id}
                                    <Button onClick={() => {
                                        dispatchAnimationData({
                                            type: AnimationDataActions.setSelectedBreakpoint,
                                            breakpointId: breakpoint.id
                                        });
                                        dispatchNavigation({
                                            type: NavigationActions.setActiveSection,
                                            section: Sections.ADD_ANIMATION_ENTRY
                                        });
                                    }}><CtaMain className='light tiny'>Add animation entry</CtaMain></Button>
                                </TimelineBreakpointTitle>
                                {
                                    (timeline && timeline.animationEntries && timeline.animationEntries[breakpoint.id])?
                                    timeline.animationEntries[breakpoint.id].map((entryId: string) => {
                                        
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