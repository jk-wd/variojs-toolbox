
import {IAnimationData} from "variojs";

export interface ISite {
    animationData: IAnimationData,
    div: HTMLDivElement
    url: string,
    active: boolean,
}