import React, {useCallback} from "react";
import styled from "styled-components";
import { IFrameDef, IAnimationConnection, calculateSumString } from 'variojs';
import {useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import {getEndOfActiveTimeline} from "@helpers/timeline";

import {useAnimationDataState} from "@context/animation-data/AnimaitonDataContext";
import {Sections} from "@enums/navigation";
import {useSiteState} from "@context/sites/SiteContext";
import { Colors } from '@enums/colors';
import { ISite } from '@interfaces/site';

interface IProps {
    frames: IFrameDef[]
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
    border-bottom: 1px solid ${Colors.lightGrey};
    &.first {
        border-top: 1px solid ${Colors.lightGrey};
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
    const {sites} = useSiteState();
    const activeSite = sites.find((site: ISite) => (site.active));
    const numbers = (activeSite && activeSite.numbers)?activeSite.numbers:{};
    const animationDataNumbers = (animationData && animationData.numbers)?animationData.numbers:{};
    const navigationDispatch = useNavigationDispatch();

    const calculatePosition = useCallback((frame: IFrameDef) => {
        if(!activeTimeline) {
            return;
        }
        const indexAnimationConnection = (activeTimeline.pixelBased)? 'startPx': 'startMs';

        const indexFrame = (activeTimeline.pixelBased)? 'pxDef': 'msDef';
        const timelineEnd = getEndOfActiveTimeline(activeTimeline, activeSite);

        const startValue = calculateSumString(animationConnection[indexAnimationConnection] || '', numbers, animationDataNumbers);
        let value = calculateSumString(frame[indexFrame] || '', numbers, animationDataNumbers);
        value = value + startValue;
        if(frame.percentDef && timelineEnd) {
            const percentValue = calculateSumString(frame.percentDef || '', numbers, animationDataNumbers);
            value = startValue + ((percentValue / 100) * (timelineEnd - startValue));
        }
        return (value / timelineEnd) * innerWidth
    }, [activeTimeline, animationConnection, sites, animationData]);

    const placeTime = useCallback((frameDef:IFrameDef) => {
        if(!activeTimeline) {
            return;
        }
        
        const index = (activeTimeline.pixelBased)? 'pxDef': 'msDef';
        if(frameDef.percentDef) {
            const percentValue = calculateSumString(frameDef.percentDef || '', numbers, animationDataNumbers);
            return percentValue + '%';
        }
        return calculateSumString(frameDef[index] || '', numbers, animationDataNumbers);
    }, [activeTimeline, sites]);

    return (
        <TimelineAnimationFramesEl className={className}>
            <TimelineAnimationFramesInner>
                {frames.map((frameDef: IFrameDef, index:number) => {
                if(!frameDef) {
                    return;
                }
                //@ts-ignore
                return <KeyFrame key={frameDef.id +''+ index} left={`${calculatePosition(frameDef)}px`} 
                onClick={() => {
                    animationDataDispatch({
                        type: AnimationDataActions.setActiveAnimationDefinition,
                        animationDefinitionId: animationConnection.animationDefinitionId
                    })
                    animationDataDispatch({
                        type: AnimationDataActions.setFilterByFrameId,
                        frameId: frameDef.id
                    })
                    navigationDispatch({
                        type: NavigationActions.setActiveSection,
                        section: Sections.ANIMATION_DEFINITION,
                    });
                }} 
                ><span></span>{placeTime(frameDef)}</KeyFrame>
                })}
            </TimelineAnimationFramesInner>
        </TimelineAnimationFramesEl>
    )
}
export default TimelineAnimationFrames;