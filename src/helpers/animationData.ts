import {uuidv4} from "@helpers/guid";
import { AnimationDataState } from "context/animation-data/AnimaitonDataContext";
import { IAnimationEntry, IBreakpoint, ITimeline, IAnimationDefinition, ITimelineBase } from "variojs";


export const addAnimationEntry = ({animationData}: AnimationDataState, id:string) => {
    animationData.animationEntries = (animationData.animationEntries)?animationData.animationEntries:[];

    return {
        ...animationData,
        animationEntries: [
            ...animationData.animationEntries,
            {
                id
            }
        ]
    }
}

export const addEditAnimationEntry = ({animationData}: AnimationDataState, animationEntry:IAnimationEntry) => {
    const entries = (animationData.animationEntries)?animationData.animationEntries:[];
    let added = false;
    let animationDataResult = {
        ...animationData,
        animationEntries: entries.reduce((result: IAnimationEntry[], entry: IAnimationEntry) => {
            if(entry.id === animationEntry.id) {
                added = true;
                result.push(animationEntry);
                
            } else {
                result.push(entry)
            }
            return result;
        }, [])
    }
    if(!added) {
        animationDataResult = {
            ...animationData,
            animationEntries: [
                ...animationData.animationEntries || [],
                animationEntry
            ]
        }
    }
    return animationDataResult;
}

export const addTimeline = ({animationData}: AnimationDataState, id:string, parallax:boolean = false) => {
    animationData.timelines = (animationData.timelines)?animationData.timelines:[];

    const timelinesIndex = (parallax)? 'parallaxTimelines': 'timelines';
    return {
        ...animationData,
        [timelinesIndex]: [
            ...animationData[timelinesIndex],
            {
                id
            }
        ]
    }
}

export const setActiveParallaxTimeline = ({animationData}: AnimationDataState, timelineId:string) => {
    return {
        ...animationData,
        activeParallaxTimeline: timelineId
    }
}

export const editTimeline = ({animationData}: AnimationDataState, timeline:ITimelineBase) => {
    animationData = JSON.parse(JSON.stringify(animationData));
    const timelines = (animationData.timelines)?animationData.timelines:[];
    let animationDataResult = {
        ...animationData,
        timelines: timelines.reduce((result: ITimelineBase[], timelineEntry: ITimelineBase) => {
            if(timelineEntry.id === timeline.id) {
                result.push(timeline);   
            } else {
                result.push(timelineEntry);   
            }
            return result;
        }, [])
    } || [];
    return animationDataResult
}

export const removeTimeline = ({animationData}: AnimationDataState, id:string, parallax:boolean = false) => {
    animationData = JSON.parse(JSON.stringify(animationData));
    const timelinesIndex = (parallax)? 'parallaxTimelines': 'timelines';

    const timelines = (animationData[timelinesIndex])?animationData[timelinesIndex]:[];
    let animationDataResult = {
        ...animationData,
        [timelinesIndex]: timelines.reduce((result: ITimelineBase[], timeline: ITimelineBase) => {
            if(timeline.id !== id) {
                result.push(timeline);   
            }
            return result;
        }, [])
    } || [];
    return animationDataResult
}

export const addEditNumberVariable = ({animationData}: AnimationDataState, name:string, value:number) => {
    animationData = JSON.parse(JSON.stringify(animationData));
    return {
        ...animationData,
        numbers: {
            ...animationData.numbers,
            [name]: value
        }
    }
}

export const addEditBreakpoint = ({animationData}: AnimationDataState, id:string, definition:string, order:number) => {
    animationData = JSON.parse(JSON.stringify(animationData));
    const breakpoints = (animationData.breakpoints)?animationData.breakpoints: [];
    let added = false;
    let animationDataResult = {
        ...animationData,
        breakpoints: breakpoints.reduce((result: IBreakpoint[], breakpoint: IBreakpoint) => {
            if(breakpoint.id === id) {
                added = true;
                result.push({
                    id,
                    definition,
                    order
                });
                
            } else {
                result.push(breakpoint)
            }
            return result;
        }, [])
    } || [];
    if(!added) {
        animationDataResult = {
            ...animationData,
            breakpoints: [
                ...breakpoints,
                {
                    id,
                    definition,
                    order
                }
            ]
        }
    }

    return animationDataResult;
}

export const removeNumberVariable = ({animationData}: AnimationDataState, name:string) => {
    animationData = JSON.parse(JSON.stringify(animationData));
    if(animationData.numbers) {
        delete animationData.numbers[name];
    }
    return animationData
}

export const removeBreakpoint = ({animationData}: AnimationDataState, id:string) => {
    animationData = JSON.parse(JSON.stringify(animationData));
    const breakpoints = (animationData.breakpoints)?animationData.breakpoints: [];
    let animationDataResult = {
        ...animationData,
        breakpoints: breakpoints.reduce((result: IBreakpoint[], breakpoint: IBreakpoint) => {
            if(breakpoint.id !== id) {
                result.push(breakpoint);   
            }
            return result;
        }, [])
    } || [];
    return animationDataResult
}

export const deleteAnimationDefinition = ({animationData}: AnimationDataState, definitionId:string) => {
    animationData = JSON.parse(JSON.stringify(animationData));
    const animationDefinitions = (animationData.animationDefinitions)?animationData.animationDefinitions: [];
    return {
        ...animationData,
        animations: animationDefinitions.reduce((result: IAnimationDefinition[], animation:IAnimationDefinition) => {
            if(animation.id != definitionId){
                result.push(animation);
            }
            return result;
        }, [])
    }
}

export const connectAnimationDefinition = ({animationData, breakpoint}: AnimationDataState, entryId:string, definitionId:string) => {
    animationData = JSON.parse(JSON.stringify(animationData));
    return {
        ...animationData,
        animationEntries: (animationData.animationEntries)?animationData.animationEntries.map((animationEntry:IAnimationEntry) => {
            if(animationEntry.id === entryId) {
                const animations = (animationEntry.animationDefinitions && animationEntry.animationDefinitions[breakpoint])? animationEntry.animationDefinitions[breakpoint]: [];
                return {
                    ...animationEntry,
                    animationDefinitions: {
                        ...animationEntry.animationDefinitions,
                        [breakpoint]: ((animations.indexOf(definitionId) <= -1))?[...animations, definitionId] : animations
                    }
                };
            }
            return animationEntry;
        }):[]
    }
}
export const connectAnimationEntryToTimeline = ({animationData}: AnimationDataState, timelineId:string, entryId:string, parallax:boolean = false) => {
    animationData = JSON.parse(JSON.stringify(animationData));
    const timelinesIndex = (parallax)? 'parallaxTimelines': 'timelines';
    const timelines = animationData[timelinesIndex] as ITimeline[];
    return {
        ...animationData,
        [timelinesIndex]: (timelines)?timelines.map((timeline:ITimeline) => {
            if(timeline.id === timelineId) {
                const entries = (timeline && timeline.animationEntries)? timeline.animationEntries: [];
                return {
                    ...timeline,
                    animationEntries: ((entries.indexOf(entryId) <= -1))?[...entries, entryId] : entries
                };
            }
            return timeline;
        }):[]
    }
}

export const disconnectAnimationEntryFromTimeline = ({animationData}: AnimationDataState, timelineId:string, entryId:string, parallax:boolean = false) => {
    animationData = JSON.parse(JSON.stringify(animationData));
    const timelinesIndex = (parallax)? 'parallaxTimelines': 'timelines';
    const timelines = animationData[timelinesIndex] as ITimeline[];
    return {
        ...animationData,
        [timelinesIndex]: (timelines)?timelines.map((timeline:ITimeline) => {
            if(timeline.id === timelineId) {
                const entries = (timeline && timeline.animationEntries)? timeline.animationEntries: [];
                return {
                    ...timeline,
                    animationEntries: entries.reduce((result: string[], entry:string) => {
                        if(entryId != entry){
                            result.push(entry);
                        }
                        return result;
                    }, [])
                };
            }
            return timeline;
        }):[]
    }
}

export const disconnectAnimationDefinition = ({animationData, breakpoint}: AnimationDataState, entryId:string, definitionId:string) => {
    animationData = JSON.parse(JSON.stringify(animationData));

    return {
        ...animationData,
        animationEntries: (animationData.animationEntries)?animationData.animationEntries.map((animationEntry:IAnimationEntry) => {
            if(animationEntry.id === entryId) {
                const animations = (animationEntry.animationDefinitions && animationEntry.animationDefinitions[breakpoint])? animationEntry.animationDefinitions[breakpoint]: [];
    
                return {
                    ...animationEntry,
                    animationDefinitions: {
                        ...animationEntry.animationDefinitions,
                        [breakpoint]: animations.reduce((result: string[], animationId:string) => {
                            if(animationId != definitionId){
                                result.push(animationId);
                            }
                            return result;
                        }, [])
                    }
                };
            }
            return animationEntry;
        }):[]
    }
}

export const saveAnimationDefinition = ({animationData, activeAnimationEntry, breakpoint}: AnimationDataState, animationDefinition:IAnimationDefinition) => {
    if(!animationData || !animationDefinition) {
        return;
    }
    animationData = JSON.parse(JSON.stringify(animationData));
    const definitions = (animationData.animationDefinitions)?animationData.animationDefinitions: [];
    
    let id = (animationDefinition.id)? animationDefinition.id : uuidv4();
    const animationDefinitionResult = {
        ...JSON.parse(JSON.stringify(animationDefinition)),
        id
    }

    let  added = false;
    const animationDefinitions = definitions.map((definition: IAnimationDefinition) => {
        if(definition.id === animationDefinitionResult.id){
            added = true;
            return animationDefinitionResult;
        }
        return definition;
    });
    if(!added) {
        animationDefinitions.push(animationDefinitionResult);
    }
    if(!activeAnimationEntry || !activeAnimationEntry.id) {
        return {
            ...animationData,
            animationDefinitions,
        }
    }

    return {
        ...animationData,
        animationDefinitions,
        animationEntries: (animationData.animationEntries)?animationData.animationEntries.map((animationEntry:IAnimationEntry) => {
            if(animationEntry.id === activeAnimationEntry.id) {
                const animations = (animationEntry.animationDefinitions && animationEntry.animationDefinitions[breakpoint])? animationEntry.animationDefinitions[breakpoint]: [];
                return {
                    ...animationEntry,
                    animationDefinitions: {
                        ...animationEntry.animationDefinitions,
                        [breakpoint]: ((animations.indexOf(id) <= -1))?[...animations, id] : animations
                    }
                };
            }
            return animationEntry;
        }):[]
    }
}
