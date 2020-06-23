import React, {useState, useEffect, createRef} from "react";
import styled from "styled-components";
import {useAnimationDataState, useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import { ITimeline } from 'variojs';

const TimelineSelectEl = styled.div``;

const TimelineSelect = () => {
    const [usePixelBasedTimelines, setUsePixelBasedTimelines] = useState<boolean>(false);
    const {animationData, activeTimeline} = useAnimationDataState();
    const selectRef = createRef<HTMLSelectElement>();
    const selectTimelineTypeRef = createRef<HTMLSelectElement>();
    const animationDispatch = useAnimationDataDispatch();
    const timelines: any = (usePixelBasedTimelines)?
        animationData.timelines.filter((timeline:ITimeline) => (timeline.pixelBased === true)): 
        animationData.timelines.filter((timeline:ITimeline) => (!timeline.pixelBased));
    useEffect(() => {
        if(timelines && timelines[0]) {
            animationDispatch({
                type: AnimationDataActions.setActiveTimeline,
                timeline: {
                    pixelBased: usePixelBasedTimelines,
                    timelineId: timelines[0].id,
                },
            });
        }
    }, []);
    useEffect(() => {
        if(activeTimeline && activeTimeline.pixelBased) {
            setUsePixelBasedTimelines(true);
        } else {
            setUsePixelBasedTimelines(false);
        }
        if(selectRef && selectRef.current) {
            if(activeTimeline && activeTimeline.timelineId) {
                selectRef.current.value = activeTimeline.timelineId;
            } else {
                selectRef.current.value = 'none';
            }
        }
        if(selectTimelineTypeRef && selectTimelineTypeRef.current) {
            if(activeTimeline && activeTimeline.timelineId) {
                selectTimelineTypeRef.current.value = (activeTimeline && activeTimeline.pixelBased)?"pixelBased":"time";
            } else {
                selectTimelineTypeRef.current.value = 'time';
            }
        }
    }, [activeTimeline]);
    
    return (
        <TimelineSelectEl>
             <select ref={selectTimelineTypeRef} defaultValue={(activeTimeline && activeTimeline.pixelBased)?"pixelBased":"time"} style={{marginRight:'10px'}} onChange={(event: any) => {
                       setUsePixelBasedTimelines((event.target.value==='pixelBased'));
                       animationDispatch({
                        type: AnimationDataActions.setActiveTimeline,
                        timeline: {
                            pixelBased: usePixelBasedTimelines,
                            timelineId: undefined,
                        },
                        });
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