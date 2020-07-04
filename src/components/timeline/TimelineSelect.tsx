import React, {useState, useEffect, createRef} from "react";
import styled from "styled-components";
import {useAnimationDataState, useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import { ITimeline } from 'variojs';

const TimelineSelectEl = styled.div``;

const TimelineSelect = () => {
    const {animationData, activeTimeline} = useAnimationDataState();
    const [usePixelBasedTimelines, setUsePixelBasedTimelines] = useState<boolean>(false);
    const selectRef = createRef<HTMLSelectElement>();
    const selectTimelineTypeRef = createRef<HTMLSelectElement>();
    const animationDispatch = useAnimationDataDispatch();

    const timelines: ITimeline[] = (animationData && animationData.timelines)?animationData.timelines:[];
    
    useEffect(() => {
        if(timelines && timelines[0]) {
            animationDispatch({
                type: AnimationDataActions.setActiveTimeline,
                timeline: {
                    pixelBased: (timelines[0].pixelBased)?true:false,
                    timelineId: timelines[0].id,
                },
            });
        }
    }, []);
    
    return (
        <TimelineSelectEl>
             <select ref={selectTimelineTypeRef} defaultValue={(usePixelBasedTimelines)?"pixelBased":"time"} style={{marginRight:'10px'}} onChange={(event: any) => {
                       setUsePixelBasedTimelines((event.target.value==='pixelBased'));
                    }} id="selectTimelineType">
                <option value='pixelBased'>Pixel based</option>
                <option value='time'>Time based</option>
            </select>
            <select ref={selectRef} value={(activeTimeline)?activeTimeline.timelineId:"none"} onChange={(event: any) => {
                        animationDispatch({
                            type: AnimationDataActions.setActiveTimeline,
                            timeline: {
                                pixelBased: usePixelBasedTimelines,
                                timelineId: event.target.value,
                            },
                        });
                    }} id="selectTimeline">
                <option value="none">select a timeline</option>
                {
                    (timelines)?
                    timelines.map((timeline: ITimeline) => {
                        if((timeline.pixelBased && !usePixelBasedTimelines) || (!timeline.pixelBased && usePixelBasedTimelines)) {
                            return;
                        }
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