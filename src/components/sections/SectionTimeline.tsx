import React from "react";
import FormTimeline from "@components/forms/FormTimeline";
import {useAnimationDataState} from "@context/animation-data/AnimaitonDataContext";
import {getParallaxTimelineById, getTimelineById} from "variojs";




const SectionTimeline = () => {
    const {animationData, activeTimeline} = useAnimationDataState();
    let timeline:any;
    if(activeTimeline) {
        timeline = (activeTimeline.parallax)? getParallaxTimelineById(animationData, activeTimeline.timelineId): getTimelineById(animationData, activeTimeline.timelineId);
    }
    return (
    <div>
        <FormTimeline timeline={timeline} parallax={activeTimeline.parallax} />
    </div>
    )
}
export default SectionTimeline