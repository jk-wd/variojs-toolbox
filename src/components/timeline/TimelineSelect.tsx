import React, {useState} from "react";
import {ITimelineBase} from "variojs";
import styled from "styled-components";
import {useAnimationDataState, useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import { Colors } from '@interfaces/colors';

const TimelineSelectEl = styled.div`
  width: 100%;
  height: 30vh;
  position: fixed;
  background-color: ${Colors.lightGrey};
  bottom: 0;
  left: 0;
  overflow: scroll;
`;

const TimelineSelect = () => {
    const [useParallaxTimelines, setUseParallaxTimelines] = useState<boolean>(false);
    const {animationData} = useAnimationDataState();
    const animationDispatch = useAnimationDataDispatch();
    const timelines = (useParallaxTimelines)? animationData.parallaxTimelines: animationData.timelines;
    return (
        <TimelineSelectEl>
             <select onChange={(event: any) => {
                       setUseParallaxTimelines((event.target.value==='parallax'));
                    }} id="selectTimelineType">
                <option value='parallax'>Parallax</option>
                <option value='time'>Time based</option>
            </select>
            <select onChange={(event: any) => {
                        animationDispatch({
                            type: AnimationDataActions.setActiveTimeline,
                            timeline: {
                                parallax: useParallaxTimelines,
                                timelineId: event.target.value,
                            },
                        });
                    }} id="selectTimeline">
                {
                    (timelines)?
                    timelines.map((timeline: ITimelineBase) => {
                        return (
                            <option  key={timeline.id} value={timeline.id}>{timeline.id}</option>
                        )
                    }):null
                }
            </select>
        </TimelineSelectEl>
    )
}

export default TimelineSelect;