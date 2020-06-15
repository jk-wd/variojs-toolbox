import React from "react";
import styled from "styled-components";
import { IFrame, IAnimationConnection } from 'variojs';
import TimelineAnimationFrames from "@components/timeline/TimelineAnimationFrames";
import { Colors } from '@enums/colors';


interface IProps {
    frames: IFrame[]
    first: boolean
    animationConnection: IAnimationConnection
    propKey: string
}

const offsetLeft = 22;

const TimelineAnimationPropEl = styled.div`
    width: 100%;
    height: 30px;
    position: relative;
    & .frames {
        position: absolute;
        top: 0;
        left: 300px;
    }
`;
const Title = styled.span`
    position: absolute;
    top: 50%;
    left: 0;

    padding-left: ${offsetLeft}px;
    font-size: 13px;
    transform: translateY(-50%);
`;
const TitleWrapper = styled.div`
    position: absolute;
    height: 30px;
    top: 0;
    width: ${300}px;
    border-bottom: 1px solid ${Colors.darkGrey};
    background-color: ${Colors.softGrey};
    &.first {
        border-top: 1px solid ${Colors.darkGrey};
    }
`;

const TimelineAnimationProp = ({animationConnection, first = false, frames, propKey}: IProps) => {

    return (
        <TimelineAnimationPropEl>
            <TitleWrapper className={`${(first)? 'first':''}`}>
                <Title>{propKey}</Title>
            </TitleWrapper>
            <TimelineAnimationFrames className={`${(first)? 'first':''} frames`} animationConnection={animationConnection} frames={frames} />
        </TimelineAnimationPropEl>
    )
}
export default TimelineAnimationProp;