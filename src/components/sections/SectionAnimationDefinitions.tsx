import React, {useState} from "react";
import styled from "styled-components";
import FormHeading from "@components/form-elements/FormHeading";
import FormLabel from "@components/form-elements/FormLabel";
import DeleteLabel from "@components/typography/DeleteLabel";
import BlockLine from "@components/block-elements/BlockLine";
import { IAnimationDefinition, getTimelineById, getAnimationEntryById } from 'variojs';
import Button from '@components/Button';
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import CtaMain from "@components/cta/CtaMain";
import {useAnimationDataDispatch, AnimationDataActions, useAnimationDataState} from "@context/animation-data/AnimaitonDataContext";
import {Sections} from "@enums/navigation";

const RemoveButtonHolder = styled.div`
    float: right;
`;

const SectionAnimationDefinitions = () => {
    const animationDataDispatch = useAnimationDataDispatch();
    const [onlyShowForActiveTime, setOnlyShowForActiveTime] = useState(false);
    const {animationData, activeTimeline} = useAnimationDataState();
    const navigationDispatch = useNavigationDispatch();

    let timeline:any;
    if(activeTimeline) {
        timeline = getTimelineById(animationData, activeTimeline.timelineId);
    }

    return (
        <div>
            <FormHeading className="large">Animation definitions</FormHeading>
            <input type="checkbox" onChange={(event: any) => {
            setOnlyShowForActiveTime(event.target.checked);
        }} /><span style={{'position':'relative', 'top':'-2px','marginLeft':'6px'}}><FormLabel className="small">Show for active timeline</FormLabel></span>
            <div style={{
                paddingTop: '4px',
                marginBottom: '26px'
            }}>
                {
                    (animationData && animationData.animationDefinitions)?
                        animationData.animationDefinitions.map((animationDefinition: IAnimationDefinition) => {
                            if(onlyShowForActiveTime && timeline && timeline.animationEntries) {
                                let found = false;
                                for(let entryId of timeline.animationEntries) {
                                    const animationEntry = getAnimationEntryById(animationData, entryId);
                                    if(animationEntry && animationEntry.animationConnections) {
                                        for(let connection of animationEntry.animationConnections) {
                                            if(connection.animationDefinitionId === animationDefinition.id) {
                                                found = true;
                                            }
                                        }
                                    }
                                }
                                if(!found) {
                                    return null;
                                }
                            }
                            if(!animationDefinition.name) {
                                return null
                            }
                            return(
                                <BlockLine key={animationDefinition.id}>
                                    <Button onClick={() => {
                                        if(!animationDefinition) {
                                            return;
                                        }
                                        animationDataDispatch({
                                            type: AnimationDataActions.setActiveAnimationEntry,
                                            activeAnimationEntry: {},
                                        });
                                        animationDataDispatch({
                                            type: AnimationDataActions.setActiveAnimationDefinition,
                                            animationDefinitionId: animationDefinition.id
                                        });
                                        animationDataDispatch({
                                            type: AnimationDataActions.setFilterByFrameId,
                                            frameId: undefined
                                        })
                                        navigationDispatch({
                                            type: NavigationActions.setActiveSection,
                                            section: Sections.ANIMATION_DEFINITION,
                                        });
                                    }}>
                                        {(animationDefinition && animationDefinition.name)? animationDefinition.name: animationDefinition.id}
                                    </Button>
                                    <RemoveButtonHolder>
                                        <Button onClick={() => {
                                            if(!animationDefinition) {
                                                return;
                                            }
                                            animationDataDispatch({
                                                type: AnimationDataActions.deleteAnimationDefinition,
                                                animationDefinitionId: animationDefinition.id,
                                            });
                                        }}><DeleteLabel>Delete</DeleteLabel></Button>
                                    </RemoveButtonHolder>
                                </BlockLine>
                            )
                        }): null
                }
            </div>
            <Button
            onClick={() => {
                    navigationDispatch({
                        type: NavigationActions.setActiveSection,
                        section: Sections.ADD_ANIMATION_DEFINITION,
                    });
                }}

            ><CtaMain>Add Animation definition</CtaMain></Button>
        </div>
    )
}
export default SectionAnimationDefinitions;