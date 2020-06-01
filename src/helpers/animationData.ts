import {uuidv4} from "@helpers/guid";
import { AnimationDataState } from "context/animation-data/AnimaitonDataContext";
import { IAnimationEntry, IBreakpoint, ITimeline, IAnimationDefinition, ITimelineBase, IAnimationData, IAnimationConnection } from "variojs";


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

export const addEditAnimationEntry = (animationData: IAnimationData, animationEntry:IAnimationEntry) => {
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

export const connectAnimationEntryToTimeline = ({animationData}: AnimationDataState, timelineId:string, entryId:string, breakpoint:string, parallax:boolean = false) => {
    animationData = JSON.parse(JSON.stringify(animationData));
    const timelinesIndex = (parallax)? 'parallaxTimelines': 'timelines';
    const timelines = animationData[timelinesIndex] as ITimeline[];
    return {
        ...animationData,
        [timelinesIndex]: (timelines)?timelines.map((timeline:ITimeline) => {
            if(timeline.id === timelineId) {
                const entries = (timeline && timeline.animationEntries && timeline.animationEntries[breakpoint])? timeline.animationEntries[breakpoint]: [];
                return {
                    ...timeline,
                    animationEntries: {
                        ...timeline.animationEntries,
                        [breakpoint]: ((entries.indexOf(entryId) <= -1))?[...entries, entryId] : entries
                    }
                };
            }
            return timeline;
        }):[]
    }
}

export const disconnectAnimationEntryFromTimeline = ({animationData}: AnimationDataState, timelineId:string, entryId:string, breakpoint:string, parallax:boolean = false) => {
    animationData = JSON.parse(JSON.stringify(animationData));
    const timelinesIndex = (parallax)? 'parallaxTimelines': 'timelines';
    const timelines = animationData[timelinesIndex] as ITimeline[];
    return {
        ...animationData,
        [timelinesIndex]: (timelines)?timelines.map((timeline:ITimeline) => {
            if(timeline.id === timelineId) {
                const entries = (timeline && timeline.animationEntries && timeline.animationEntries[breakpoint])? timeline.animationEntries[breakpoint]: [];
                return {
                    ...timeline,
                    animationEntries: {
                        ...timeline.animationEntries,
                        [breakpoint]: entries.reduce((result: string[], entry:string) => {
                            if(entryId != entry){
                                result.push(entry);
                            }
                            return result;
                        }, [])
                    }
                };
            }
            return timeline;
        }):[]
    }
}

export const addEditAnimationDefinition = (animationData: IAnimationData, animationDefinition:IAnimationDefinition) => {
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

    return {
        ...animationData,
        animationDefinitions,
    }
}

export const disconnectAnimationDefinitionFromEntry = ({animationData}: AnimationDataState, animationEntryId:string, animationDefinitionId:string) => {
    return {
        ...animationData,
        animationEntries: (animationData.animationEntries)?animationData.animationEntries.map((animationEntry:IAnimationEntry) => {
            const connections = (animationEntry.animationConnections)? animationEntry.animationConnections: [];
            if(animationEntry.id === animationEntryId) {
                return {
                    ...animationEntry,
                    animationConnections: connections.reduce((result: IAnimationConnection[], connection:IAnimationConnection) => {
                        if(connection.animationDefinitionId != animationDefinitionId){
                            result.push(connection);
                        }
                        return result;
                    }, [])
                }
            }
            return animationEntry;
        }):[]
    }
}

export const connectAnimationDefinitionToEntry = ({animationData}: AnimationDataState, animationEntryId:string, animationDefinitionId:string) => {
    return {
        ...animationData,
        animationEntries: (animationData.animationEntries)?animationData.animationEntries.map((animationEntry:IAnimationEntry) => {
            if(animationEntry.id === animationEntryId) {
                const connections = (animationEntry.animationConnections)? [...animationEntry.animationConnections]: [];
                if(!connections.find((connection:IAnimationConnection) => (connection.animationDefinitionId === animationDefinitionId))) {
                    connections.push({
                        animationDefinitionId
                    });
                }
                return {
                    ...animationEntry,
                    animationConnections: connections
                }
            }
            return animationEntry;
        }):[]
    }
}

export const addEditAnimationEntryConnection = (animationData: IAnimationData, animationEntryId:string, connection:IAnimationConnection, privateConnection: boolean = false) => {

    return {
        ...animationData,
        animationEntries: (animationData.animationEntries)?animationData.animationEntries.map((animationEntry:IAnimationEntry) => {
            const connections = (animationEntry.animationConnections)? animationEntry.animationConnections: [];
            if(animationEntry.id === animationEntryId) {
                if(privateConnection) {
                    return {
                        ...animationEntry,
                        animationConnection: connection
                    }
                }

                return {
                    ...animationEntry,
                    animationConnections: connections.reduce((result: IAnimationConnection[], connectionTarget:IAnimationConnection) => {
                        if(connectionTarget.animationDefinitionId === connection.animationDefinitionId){
                            result.push(connection);
                        } else {
                            result.push(connectionTarget);
                        }
                        return result;
                    }, [])
                }
            }
            return animationEntry;
        }):[]
    }
}

export const addAnimationDefinitionToEntry = ({animationData}: AnimationDataState, animationEntryId:string, animationDefinitionId:string) => {
    return {
        ...animationData,
        animationEntries: (animationData.animationEntries)?animationData.animationEntries.map((animationEntry:IAnimationEntry) => {
            if(animationEntry.id === animationEntryId) {
                return {
                    ...animationEntry,
                    animationConnection: {
                        animationDefinitionId: animationDefinitionId
                    }
                };
            }
            return animationEntry;
        }):[]
    }
}
