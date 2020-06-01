import React, {useCallback} from "react";
import styled from "styled-components";
import { IFrame, IAnimationConnection, calculateStartValue } from 'variojs';
import {useAnimationDataState} from "@context/animation-data/AnimaitonDataContext";
import { Colors } from '@interfaces/colors';

interface IProps {
    frames: IFrame[]
    className: string
    animationConnection: IAnimationConnection
}

const frameLineWidth = 3000;
const frameLineHeight = 30;
const frameIndicatorRadius = 5;
const timelinePadding = 5;
const innerWidth = (frameLineWidth-(frameIndicatorRadius * 2)) - (timelinePadding * 2);

const TimelineAnimationFramesInner = styled.div`
    width: ${innerWidth}px;
    height: ${frameLineHeight}px;
    position: absolute;
    top: 0;
    left: ${timelinePadding}px;
`

const TimelineAnimationFramesEl = styled.div`
    position: relative;
    width: ${frameLineWidth}px;
    height: ${frameLineHeight}px;
    border-bottom: 1px solid ${Colors.darkGrey};
    &.first {
        border-top: 1px solid ${Colors.darkGrey};
    }
`;

const KeyFrame = styled.div`
    width: ${frameIndicatorRadius * 2}px;
    height: ${frameIndicatorRadius * 2}px;
    border-radius: 100%;
    position: absolute;
    top: 50%;
    background-color: ${Colors.sunnyOrange};
    transform: translateY(-50%);
    left: ${(props:any) => props.left};
`;

const TimelineAnimationFrames = ({animationConnection, className, frames = []}: IProps) => {
    const {animationData, activeTimeline} = useAnimationDataState();

    const calculatePosition = useCallback((frame: IFrame) => {
        const startValue = calculateStartValue(animationData, animationConnection.startMs || '');
        let ms = frame.ms || 0;
        ms = ms + startValue;
        return (ms / activeTimeline.end) * innerWidth
    }, []);

    return (
        <TimelineAnimationFramesEl className={className}>
            <TimelineAnimationFramesInner>
                {frames.map((frame: IFrame, index:number) => {
                    //@ts-ignore
                    return <KeyFrame key={frame.id +''+ index} left={`${calculatePosition(frame)}px`}></KeyFrame>
                })}
            </TimelineAnimationFramesInner>
        </TimelineAnimationFramesEl>
    )
}
export default TimelineAnimationFrames;