import { ITimeline } from 'variojs';

export interface IActiveTimeline {
    timelineId: string,
    parallax: boolean,
    timeline: ITimeline,
    end: number,
}
