import React from "react";
import styled from "styled-components";
import {getAnimationEntryById, getTimelineById} from "variojs";
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import {Sections} from "@enums/navigation";
import { Colors } from '@enums/colors';
import {useAnimationDataState} from "@context/animation-data/AnimaitonDataContext";
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
    justify-content: space-between;
    align-items: center;
    background-color: ${Colors.lightGrey};
    button {
        margin-left: 10px;
        margin-right: 62px;
        position: relative;
    }
`

const Timeline = () => {
    const {animationData, activeTimeline} = useAnimationDataState();
    const dispatchNavigation = useNavigationDispatch();
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
            <TimeLineTop>
                <TimelineSelect />
                <Button onClick={() => {
                        dispatchNavigation({
                            type: NavigationActions.setActiveSection,
                            section: Sections.ADD_ANIMATION_ENTRY
                        });
                    }}><CtaMain className='small'>Add animation entry</CtaMain></Button>
            </TimeLineTop>
           
        </TimelineEl>
    )
}

export default Timeline;