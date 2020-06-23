import React, { useState, useEffect } from "react";
import {uuidv4} from "variojs"
import {useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import FormHeading from "@components/form-elements/FormHeading";
import FormFieldset from "@components/form-elements/FormFieldset";
import FormLabel from "@components/form-elements/FormLabel";
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import {usePlaceholders} from "@context/placeholders/PlaceholdersContext";
import { useAnimationDataState } from '@context/animation-data/AnimaitonDataContext';
import {Sections} from "@enums/navigation";
import FormInputString from "@components/form-elements/FormInputText";
import CtaMain from '@components/cta/CtaMain';
import { IAnimationEntry, ITimeline, NoBreakpointIdentifier } from 'variojs';

const SectionAddAnimationEntry = () => {
    const animationDataDispatch = useAnimationDataDispatch();
    const navigationDispatch = useNavigationDispatch();
    const [name, setName] = useState<string | undefined>();
    const {animationData, activeTimeline} = useAnimationDataState();
    const timelineSelectRef = React.createRef<HTMLSelectElement>();
    const [timelineId, setTimelineId] = useState<string | undefined>((activeTimeline)?activeTimeline.timelineId:undefined);
    let breakpoints = (animationData.breakpoints)?animationData.breakpoints : [];
    breakpoints = [...breakpoints, {
        id: NoBreakpointIdentifier,
        order: 0,
        definition: ''
    }]
    const placeholders = usePlaceholders();
    const selectRef = React.createRef<HTMLSelectElement>();

    useEffect(() => {
        if(activeTimeline && timelineSelectRef.current){
            setTimelineId(activeTimeline.timelineId);
            timelineSelectRef.current.value = activeTimeline.timelineId;
        }
    }, [activeTimeline]);

    return (
        <div>
            <div>
                <FormHeading className="large">Add animation entry</FormHeading>
                <FormFieldset>
                    <FormLabel className="small">Name</FormLabel><br />
                    <FormInputString onChange={(event:any) => {
                        setName(event.target.value);
                    }} />
                </FormFieldset>
                <FormFieldset>
                    <FormLabel className="small">Timeline</FormLabel><br />
                    <select ref={timelineSelectRef} defaultValue={timelineId} onChange={(event) => {
                        setTimelineId(event.target.value);
                    }}>
                        {
                            animationData.timelines.map((timeline: ITimeline) => {
                                return (
                                    <option key={timeline.id} value={timeline.id}>{timeline.id}</option>
                                )
                            })
                        }
                    </select>
                </FormFieldset>
                <FormFieldset>
                    <FormLabel className="small">Dom reference</FormLabel><br />
                    <select ref={selectRef}>
                        {
                            placeholders.reduce((result: React.ReactNode[], id:string, index: number) => {
                                if(animationData && animationData.animationEntries && animationData.animationEntries.find((animationEntry: IAnimationEntry) => (animationEntry.id ===  id))) {
                                    return result
                                } else {
                                    result.push(<option key={`${id}${index}`} value={id || ''}>{id}</option>);
                                }
                                return result;
                            }, [])
                        }
                    </select>
                </FormFieldset><br/>
                <FormFieldset>
                    <button onClick={
                        
                        () => {
                            if(!timelineId) {
                                return
                            }
                            if(selectRef.current && selectRef.current.value && activeTimeline) {
                                const animationDefinitionId = uuidv4();
                                animationDataDispatch({
                                    type: AnimationDataActions.addAnimationDefinition,
                                    animationDefinition: {
                                        id:animationDefinitionId,
                                        props: {}
                                    }
                                });
                                const animationEntryId = uuidv4();
                                animationDataDispatch( {
                                    type: AnimationDataActions.addAnimationEntry,
                                    animationEntry: {
                                        id: animationEntryId,
                                        domReference: selectRef.current.value,
                                        name,
                                        animationConnection: {
                                            animationDefinitionId
                                        } 
                                    },
                                });
            
                                animationDataDispatch({
                                    type: AnimationDataActions.connectTimelineAnimationEntry,
                                    timelineId: timelineId,
                                    animationEntryId,
                                });
                                animationDataDispatch({
                                    type: AnimationDataActions.setFilterByFrameId,
                                    frameId: undefined
                                })
                                animationDataDispatch({
                                    type: AnimationDataActions.setActiveAnimationEntry,
                                    activeAnimationEntry: {
                                        id: animationEntryId
                                    }
                                });
                                navigationDispatch({
                                    type: NavigationActions.setActiveSection,
                                    section: Sections.ANIMATION_ENTRY,
                                });
                            }
                        }
                    }><CtaMain>Add Animation entry</CtaMain></button>
                </FormFieldset>
            </div>
        </div>
    )
}
export default SectionAddAnimationEntry