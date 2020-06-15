import React, {useCallback} from "react";
import styled from "styled-components";
import { IFrame, IAnimationConnection, calculateStartValue, getEndOfTimeline } from 'variojs';
import {useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import {useAnimationDataState} from "@context/animation-data/AnimaitonDataContext";
import {Sections} from "@enums/navigation";
import { Colors } from '@enums/colors';

interface IProps {
    frames: IFrame[]
    className: string
    animationConnection: IAnimationConnection
}

const frameLineWidth = (window as any).innerWidth - 360;
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

const KeyFrame = styled.button`
    border:none;
    outline: none;
    padding: 0;
    > span {
        position: absolute;
        top: 0;
        left: 0;
        width: ${frameIndicatorRadius * 2}px;
        height: ${frameIndicatorRadius * 2}px;
        background-color: ${Colors.freshGreen};
        border-radius: 100%;
    }
    &:hover {
        color: ${Colors.happyPink};
        > span {
            background-color: ${Colors.happyPink};
        }
    }
    position: absolute;
    top: 50%;
    color: ${Colors.freshGreen};
    transform: translateY(-50%);
    left: ${(props:any) => props.left};
    font-size: 12px;
    padding-left: ${(frameIndicatorRadius * 2)+4}px;
    line-height: 1;
`;

const TimelineAnimationFrames = ({animationConnection, className, frames = []}: IProps) => {
    const {animationData, activeTimeline} = useAnimationDataState();
    const animationDataDispatch = useAnimationDataDispatch();
    const navigationDispatch = useNavigationDispatch();

    const calculatePosition = useCallback((frame: IFrame) => {
        if(!activeTimeline) {
            return;
        }
        const indexAnimationConnection = (activeTimeline.parallax)? 'startOffsetPixels': 'startMs';
        const timelineEnd = getEndOfTimeline(animationData, activeTimeline.timelineId, activeTimeline.parallax);
        const indexFrame = (activeTimeline.parallax)? 'offsetPixels': 'ms';
        const startValue = calculateStartValue(animationData, animationConnection[indexAnimationConnection] || '');
        let value = frame[indexFrame] || 0;
        value = value + startValue;
        return (value / timelineEnd) * innerWidth
    }, [activeTimeline, animationConnection, animationData]);

    const placeTime = useCallback((frame:IFrame) => {
        if(!activeTimeline) {
            return;
        }
        const index = (activeTimeline.parallax)? 'offsetPixels': 'ms';
        return frame[index];
    }, [activeTimeline]);

    return (
        <TimelineAnimationFramesEl className={className}>
            <TimelineAnimationFramesInner>
                {frames.map((frame: IFrame, index:number) => {
                    //@ts-ignore
                return <KeyFrame key={frame.id +''+ index} left={`${calculatePosition(frame)}px`} 
                onClick={() => {
                    animationDataDispatch({
                        type: AnimationDataActions.setActiveAnimationDefinition,
                        animationDefinitionId: animationConnection.animationDefinitionId
                    })
                    animationDataDispatch({
                        type: AnimationDataActions.setFilterByFrameId,
                        frameId: frame.id
                    })
                    navigationDispatch({
                        type: NavigationActions.setActiveSection,
                        section: Sections.ANIMATION_DEFINITION,
                    });
                }} 
                ><span></span>{placeTime(frame)}</KeyFrame>
                })}
            </TimelineAnimationFramesInner>
        </TimelineAnimationFramesEl>
    )
}
export default TimelineAnimationFrames;