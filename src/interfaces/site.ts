
import {IAnimationData} from "variojs";

export interface ISite {
    animationData: IAnimationData,
    animationDataIndex: number,
    placeholders: string[],
    url: string,
    active: boolean,
}