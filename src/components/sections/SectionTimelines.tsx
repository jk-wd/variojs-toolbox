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
    parallax: boolean
}


const RemoveButtonHolder = styled.div`
    float: right;
`;


const SectionTimelines = ({parallax}: Props) => {
    const animationDataDispatch = useAnimationDataDispatch();
    const navigationDispatch = useNavigationDispatch();
    const {animationData} = useAnimationDataState();
    const timelines: any = (parallax)?
    animationData.timelines.filter((timeline:ITimeline) => (timeline.parallax === true)): 
    animationData.timelines.filter((timeline:ITimeline) => (timeline.parallax === false));

    return (
    <div>
        <FormHeading className="large">{(parallax)?"Parallax timelines":"Timelines"}</FormHeading>
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
                                        parallax,
                                    }
                                });
                                navigationDispatch({
                                    type: NavigationActions.setActiveSection,
                                    section: (parallax)?Sections.TIMELINE:Sections.PARALLAX_TIMELINE,
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
                    section: (parallax)?Sections.ADD_PARALLAX_TIMELINE:Sections.ADD_TIMELINE,
                });
            }}

        ><CtaMain>Add timeline</CtaMain></Button>
    </div>
    )
}
export default SectionTimelines