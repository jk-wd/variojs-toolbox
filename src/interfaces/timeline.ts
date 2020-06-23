import { ITimeline } from 'variojs';

export interface IActiveTimeline {
    timelineId: string,
    pixelBased: boolean,
    timeline: ITimeline,
    end: number,
}
