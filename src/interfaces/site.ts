
import {IAnimationData, INumberObject, ITimelineState, IPixelTimelineState} from "variojs";

export interface ISite {
    animationData: IAnimationData,
    animationDataIndex: number,
    numbers: INumberObject,
    timelineStates: {
        [key: string]: ITimelineState
    },
    pixelTimelineStates: {
        [key: string]: IPixelTimelineState
    },
    placeholders: string[],
    url: string,
    active: boolean,
}