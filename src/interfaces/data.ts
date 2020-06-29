
import {IAnimationData, ITimelineState, IPixelTimelineState, INumberObject} from "variojs";

export interface ISocketSiteData {
    animationData: IAnimationData,
    siteUrl: string
    placeholders: string[]
    timelineStates: ITimelineState[]
    numbers:INumberObject
    pixelTimelineStates: IPixelTimelineState[]
}