import React, {useState, useEffect, createRef} from "react";
import styled from "styled-components";
import {useAnimationDataState, useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import { ITimeline } from 'variojs';

const TimelineSelectEl = styled.div``;

const TimelineSelect = () => {
    const [useParallaxTimelines, setUseParallaxTimelines] = useState<boolean>(false);
    const {animationData, activeTimeline} = useAnimationDataState();
    const selectRef = createRef<HTMLSelectElement>();
    const animationDispatch = useAnimationDataDispatch();
    const timelines: any = (useParallaxTimelines)?
        animationData.timelines.filter((timeline:ITimeline) => (timeline.parallax === true)): 
        animationData.timelines.filter((timeline:ITimeline) => (timeline.parallax === false));
    useEffect(() => {
        if(timelines && timelines[0]) {
            animationDispatch({
                type: AnimationDataActions.setActiveTimeline,
                timeline: {
                    parallax: useParallaxTimelines,
                    timelineId: timelines[0].id,
                },
            });
        }
    }, []);
    useEffect(() => {
        if(selectRef && selectRef.current) {
            if(activeTimeline && activeTimeline.timelineId) {
                selectRef.current.value = activeTimeline.timelineId;
            } else {
                selectRef.current.value = 'none';
            }
        }
    }, [activeTimeline]);
    
    return (
        <TimelineSelectEl>
             <select defaultValue='time' style={{marginRight:'10px'}} onChange={(event: any) => {
                       setUseParallaxTimelines((event.target.value==='parallax'));
                       animationDispatch({
                        type: AnimationDataActions.setActiveTimeline,
                        timeline: {
                            parallax: useParallaxTimelines,
                            timelineId: undefined,
                        },
                        });
                    }} id="selectTimelineType">
                <option value='parallax'>Parallax</option>
                <option value='time'>Time based</option>
            </select>
            <select ref={selectRef} value={(activeTimeline)?activeTimeline.timelineId:"none"} onChange={(event: any) => {
                        animationDispatch({
                            type: AnimationDataActions.setActiveTimeline,
                            timeline: {
                                parallax: useParallaxTimelines,
                                timelineId: event.target.value,
                            },
                        });
                    }} id="selectTimeline">
                <option value="none">select a timeline</option>
                {
                    (timelines)?
                    timelines.map((timeline: ITimeline) => {
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