import React, {useState} from "react";
import styled from "styled-components";
import FormHeading from "@components/form-elements/FormHeading";
import FormLabel from "@components/form-elements/FormLabel";
import DeleteLabel from "@components/typography/DeleteLabel";
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import {useAnimationDataDispatch, AnimationDataActions, useAnimationDataState} from "@context/animation-data/AnimaitonDataContext";
import BlockLine from "@components/block-elements/BlockLine";
import {Sections} from "@enums/navigation";
import {IAnimationEntry, getTimelineById} from "variojs";
import Button from "@components/Button";
import CtaMain from "@components/cta/CtaMain";
import {useSiteState} from "@context/sites/SiteContext";
import {ISite} from "@interfaces/site";

const RemoveButtonHolder = styled.div`
    float: right;
`;

const SectionAnimationEntries = () => {
    const [onlyShowForActiveTime, setOnlyShowForActiveTime] = useState(false);
    const navigationDispatch = useNavigationDispatch();
    const animationDataDispatch = useAnimationDataDispatch();

    const {animationData, activeTimeline} = useAnimationDataState();
    const {sites} = useSiteState();
    const activeSite = sites.find((site: ISite) => (site.active));
    const url = (activeSite)?activeSite.url:undefined;
    let timeline:any;
    if(activeTimeline) {
        timeline = getTimelineById(animationData, activeTimeline.timelineId);
    }
    
    return (
    <div>
        <FormHeading className="large">Animation entries</FormHeading>
        <input type="checkbox" onChange={(event: any) => {
            setOnlyShowForActiveTime(event.target.checked);
        }} /><span style={{'position':'relative', 'top':'-2px','marginLeft':'6px'}}><FormLabel className="small">Show for active timeline</FormLabel></span>
        <div style={{
            paddingTop: '4px',
            marginBottom: '26px'
        }}>
            {
            (animationData && animationData.animationEntries)?
                animationData.animationEntries.map((animationEntry: IAnimationEntry) => {
                    if(onlyShowForActiveTime && timeline && timeline.animationEntries) {
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
                                    type: AnimationDataActions.setFilterByFrameId,
                                    frameId: undefined
                                })
                                animationDataDispatch({
                                    type: AnimationDataActions.setActiveAnimationEntry,
                                    activeAnimationEntry: {
                                        id: animationEntry.id
                                    },
                                });
                                navigationDispatch({
                                    type: NavigationActions.setActiveSection,
                                    section: Sections.ANIMATION_ENTRY,
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
                                    animationDataDispatch({
                                        type: AnimationDataActions.syncAnimationData,
                                        url
                                    })
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