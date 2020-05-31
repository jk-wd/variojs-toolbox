import { ITimeline, IParallaxTimeline } from 'variojs';

export interface IActiveTimeline {
    timelineId: string,
    parallax: boolean,
    timeline: IParallaxTimeline | ITimeline,
    end: number,
}