import React from "react";
import styled from "styled-components";
import { IAnimationConnection, getAnimationDefinitionById } from 'variojs';
import {useAnimationDataState} from "@context/animation-data/AnimaitonDataContext";
import TimelineAnimationProp from "@components/timeline/TimelineAnimationProp";


interface IProps {
    animationConnection: IAnimationConnection
}

const offsetLeft = 14;
const TimelineAnimationDefinitionEl = styled.div`
    width: 100%;
`;
const Title = styled.span`
    padding-left: ${offsetLeft}px;
    display:block;
    padding-top: 6px;
    font-weight: bold;
    height: 30px;
    font-size: 13px;
`;

const TimelineAnimationDefinition = ({animationConnection}: IProps) => {
    const {animationData} = useAnimationDataState();
    const animationDefinition = getAnimationDefinitionById(animationData, animationConnection.animationDefinitionId);
    if(!animationDefinition) {
        return null;
    }

    return (
        <TimelineAnimationDefinitionEl >
            {(animationDefinition.name)? <Title>{animationDefinition.name}</Title>: null}
            {
                Object.keys(animationDefinition.props).map((propKey: string, index: number) => {
                    return <TimelineAnimationProp key={propKey} first={(index === 0)? true: false} animationConnection={animationConnection} frames={animationDefinition.props[propKey]} propKey={propKey} />
                })
            }
        </TimelineAnimationDefinitionEl>
    )
}
export default TimelineAnimationDefinition;