import React from "react";
import {ITimeline} from "variojs";
import styled from "styled-components";
import DeleteLabel from "@components/typography/DeleteLabel";
import FormHeading from "@components/form-elements/FormHeading";
import Button from "@components/Button";
import CtaMain from "@components/cta/CtaMain";
import {Sections} from "@enums/navigation";
import BlockLine from "@components/block-elements/BlockLine";
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import { useAnimationDataState, useAnimationDataDispatch, AnimationDataActions } from '@context/animation-data/AnimaitonDataContext';

interface Props {
    pixelBased: boolean
}


const RemoveButtonHolder = styled.div`
    float: right;
`;


const SectionTimelines = ({pixelBased}: Props) => {
    const animationDataDispatch = useAnimationDataDispatch();
    const navigationDispatch = useNavigationDispatch();
    const {animationData} = useAnimationDataState();
    const timelines: any = (pixelBased)?
    animationData.timelines.filter((timeline:ITimeline) => (timeline.pixelBased === true)): 
    animationData.timelines.filter((timeline:ITimeline) => (!timeline.pixelBased));

    return (
    <div>
        <FormHeading className="large">{(pixelBased)?"Pixel based timelines":"Timelines"}</FormHeading>
        <div style={{
            paddingTop: '4px',
            marginBottom: '26px'
        }}>
        {
            (timelines)?
            timelines.map((timeline:ITimeline) => {
                if(!timeline) {
                    return;
                }
                return (
                    <BlockLine key={timeline.id}>
                            <Button onClick={() => {
                                if(!timeline) {
                                    return;
                                } 
                                animationDataDispatch({
                                    type: AnimationDataActions.setActiveTimeline,
                                    timeline: {
                                        timelineId: timeline.id,
                                        pixelBased,
                                    }
                                });
                                navigationDispatch({
                                    type: NavigationActions.setActiveSection,
                                    section: (pixelBased)?Sections.TIMELINE:Sections.PIXELBASED_TIMELINE,
                                });
                            }}>
                                {timeline.id}
                            </Button>
                            <RemoveButtonHolder>
                                <Button onClick={() => {
                                    if(!timeline) {
                                        return;
                                    }
                                    animationDataDispatch({
                                        type: AnimationDataActions.deleteTimeline,
                                        timelineId: timeline.id,
                                    });
                                }}><DeleteLabel>Delete</DeleteLabel></Button>
                            </RemoveButtonHolder>
                        </BlockLine>
                )
            })
            :null
        }
        </div>
        <Button
            onClick={() => {
                navigationDispatch({
                    type: NavigationActions.setActiveSection,
                    section: (pixelBased)?Sections.ADD_PIXELBASED_TIMELINE:Sections.ADD_TIMELINE,
                });
            }}

        ><CtaMain>Add timeline</CtaMain></Button>
    </div>
    )
}
export default SectionTimelines