import React from "react";
import styled from "styled-components";
import DeleteLabel from "@components/typography/DeleteLabel";
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import {useAnimationDataDispatch, AnimationDataActions, useAnimationDataState} from "@context/animation-data/AnimaitonDataContext";
import BlockLine from "@components/block-elements/BlockLine";
import {Sections} from "@interfaces/navigation";
import {IAnimationEntry, getParallaxTimelineById, getTimelineById} from "variojs";
import Button from "@components/Button";
import CtaMain from "@components/cta/CtaMain";

const RemoveButtonHolder = styled.div`
    float: right;
`;

const SectionAnimationEntries = () => {
    const navigationDispatch = useNavigationDispatch();
    const animationDataDispatch = useAnimationDataDispatch();

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
                    
                    return(
                        <BlockLine key={animationEntry.id}>
                            <Button onClick={() => {
                                if(!animationEntry) {
                                    return;
                                } 
                                animationDataDispatch({
                                    type: AnimationDataActions.setActiveAnimationEntry,
                                    activeAnimationEntry: {
                                        id: animationEntry.id
                                    },
                                });
                                navigationDispatch({
                                    type: NavigationActions.setActiveSection,
                                    section: Sections.ANIMATION_DEFINITION,
                                });
                            }}>
                                {(animationEntry && animationEntry.name)? animationEntry.name: animationEntry.id}
                            </Button>
                            <RemoveButtonHolder>
                                <Button onClick={() => {
                                    if(!animationEntry) {
                                        return;
                                    }
                                    animationDataDispatch({
                                        type: AnimationDataActions.deleteAnimationEntry,
                                        animationEntryId: animationEntry.id,
                                    });
                                }}><DeleteLabel>Delete</DeleteLabel></Button>
                            </RemoveButtonHolder>
                        </BlockLine>
                    )
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