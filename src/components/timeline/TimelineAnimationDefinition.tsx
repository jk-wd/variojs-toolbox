import React from "react";
import styled from "styled-components";
import { IAnimationConnection, getAnimationDefinitionById } from 'variojs';
import {useAnimationDataState, useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import {Sections} from "@interfaces/navigation";
import TimelineAnimationProp from "@components/timeline/TimelineAnimationProp";
import Button from "@components/Button";


interface IProps {
    animationConnection: IAnimationConnection
}

const offsetLeft = 22;
const TimelineAnimationDefinitionEl = styled.div`
    width: 100%;
`;
const Title = styled.span`
    padding-left: ${offsetLeft}px;
    display:block;
    padding-top: 6px;
    font-family: "ProximaNova-Bold";
    text-decoration: underline;
    height: 30px;
    font-size: 13px;
`;

const TimelineAnimationDefinition = ({animationConnection}: IProps) => {
    const {animationData} = useAnimationDataState();
    const dispatchNavigation = useNavigationDispatch();
    const dispatchAnimationData = useAnimationDataDispatch();
    const animationDefinition = getAnimationDefinitionById(animationData, animationConnection.animationDefinitionId);
    if(!animationDefinition) {
        return null;
    }

    return (
        <TimelineAnimationDefinitionEl >
            {(animationDefinition.name)? 
            <Button className='text-align-left' onClick={() => {
                if(!animationDefinition.id) {
                    return
                }
                dispatchAnimationData({
                    type: AnimationDataActions.setActiveAnimationDefinition,
                    animationDefinitionId: animationDefinition.id
                });
                dispatchNavigation({
                    type: NavigationActions.setActiveSection,
                    section: Sections.ANIMATION_DEFINITION,
                });
            }}>
                <Title>{animationDefinition.name}</Title>
            </Button>:
            null
            }
            {
                Object.keys(animationDefinition.props).map((propKey: string, index: number) => {
                    return <TimelineAnimationProp key={propKey} first={(index === 0)? true: false} animationConnection={animationConnection} frames={animationDefinition.props[propKey]} propKey={propKey} />
                })
            }
        </TimelineAnimationDefinitionEl>
    )
}
export default TimelineAnimationDefinition;