import React from "react";
import BlockAnimationEntry from "@components/blocks/BlockAnimationEntry";
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import {Sections} from "@interfaces/navigation";
import {IAnimationEntry, getParallaxTimelineById, getTimelineById} from "variojs";
import Button from "@components/Button";
import CtaMain from "@components/cta/CtaMain";
import { useAnimationDataState } from '@context/animation-data/AnimaitonDataContext';

const SectionAnimationEntries = () => {
    const navigationDispatch = useNavigationDispatch();
    const {animationData, activeTimeline} = useAnimationDataState();
    let timeline:any;
    if(activeTimeline) {
        timeline = (activeTimeline.parallax)? getParallaxTimelineById(animationData, activeTimeline.timelineId): getTimelineById(animationData, activeTimeline.timelineId);
    }
    
    return (
    <div>
        <div style={{
            marginBottom: '30px'
        }}>
            {
            (animationData && animationData.animationEntries)?
                animationData.animationEntries.map((animationEntry: IAnimationEntry) => {
                    if(timeline && timeline.animationEntries) {
                        let found = false;
                        for(let breakpoint of Object.keys(timeline.animationEntries)) {
                            if(timeline.animationEntries[breakpoint] && timeline.animationEntries[breakpoint].indexOf(animationEntry.id) > -1) {
                                found = true;
                            }
        
                        }
                        if(!found) {
                            return null;
                        }
                    }
                    
                    return <BlockAnimationEntry key={animationEntry.id} animationEntry={animationEntry}/>
                }):null
            }
        </div>
        <Button
            onClick={() => {
                navigationDispatch({
                    type: NavigationActions.setActiveSection,
                    section: Sections.ADD_ANIMATION_ENTRY,
                });
            }}

        ><CtaMain>Add Animation entry</CtaMain></Button>
    </div>
    )
}
export default SectionAnimationEntries