import React from "react";
import FormTimeline from "@components/forms/FormTimeline";
import {useAnimationDataState} from "@context/animation-data/AnimaitonDataContext";
import {getTimelineById} from "variojs";




const SectionTimeline = () => {
    const {animationData, activeTimeline} = useAnimationDataState();
    let timeline:any;
    if(activeTimeline) {
        timeline = getTimelineById(animationData, activeTimeline.timelineId);
    }
    if(!timeline || !activeTimeline) {
        return null;
    }
    return (
    <div>
        <FormTimeline timeline={timeline} parallax={activeTimeline.parallax} />
    </div>
    )
}
export default SectionTimeline