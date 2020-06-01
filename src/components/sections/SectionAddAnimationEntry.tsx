import React, { useState } from "react";
import {uuidv4} from "@helpers/guid"
import {useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import {usePlaceholders} from "@context/placeholders/PlaceholdersContext";
import { useAnimationDataState } from '@context/animation-data/AnimaitonDataContext';
import {Sections} from "@interfaces/navigation";
import FormInputString from "@components/form-elements/FormInputString";
import CtaMain from '@components/cta/CtaMain';
import { IAnimationEntry, IBreakpoint } from 'variojs';

const SectionAddAnimationEntry = () => {
    const animationDataDispatch = useAnimationDataDispatch();
    const navigationDispatch = useNavigationDispatch();
    const [name, setName] = useState<string | undefined>();
    const {animationData, selectedBreakpoint, activeTimeline} = useAnimationDataState();
    const [breakpoint, setBreakpoint] = useState<string>(selectedBreakpoint || 'default');
    let breakpoints = (animationData.breakpoints)?animationData.breakpoints : [];
    breakpoints = [...breakpoints, {
        id: 'default',
        order: 0,
        definition: ''
    }]
    const placeholders = usePlaceholders();
    const selectRef = React.createRef<HTMLSelectElement>();

    return (
        <div>
            <form onSubmit={(event:any) => {
                event.preventDefault();
                if(selectRef.current && selectRef.current.value) {
                    const animationDefinitionId = uuidv4();
                    animationDataDispatch({
                        type: AnimationDataActions.addEditAnimationDefinition,
                        animationDefinition: {
                            id:animationDefinitionId,
                            props: {}
                        }
                    });
                    const animationEntryId = uuidv4();
                    animationDataDispatch( {
                        type: AnimationDataActions.addEditAnimationEntry,
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
                        type: AnimationDataActions.connectAnimationEntryToTimeline,
                        timelineId: activeTimeline.timelineId,
                        animationEntryId,
                        breakpoint,
                        parallax: activeTimeline.parallax,
                    });
                    navigationDispatch({
                        type: NavigationActions.setActiveSection,
                        section: Sections.ANIMATION_ENTRIES,
                    });
                }
                
            }}>
                <h1 style={{marginTop: "20px", marginBottom: "10px"}}>Add animation entry</h1>
                <fieldset>
                    <label>Name</label><br />
                    <FormInputString onChange={(event) => {
                        setName(event.target.value);
                    }} />
                </fieldset>
                <fieldset>
                    <label>Breakpoint</label><br />
                    <select defaultValue={selectedBreakpoint || 'default'} onChange={(event) => {
                        setBreakpoint(event.target.value);
                    }}>
                        {
                            breakpoints.map((breakpoint: IBreakpoint) => {
                                return (
                                    <option key={breakpoint.id} value={breakpoint.id}>{breakpoint.id}</option>
                                )
                            })
                        }
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="animationEntryName">Animation entry</label><br />
                    <select ref={selectRef} name="animationEntryName" id="animationEntryName">
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
                </fieldset>
                <fieldset>
                    <button type="submit" ><CtaMain>Add Animation entry</CtaMain></button>
                </fieldset>
            </form>
        </div>
    )
}
export default SectionAddAnimationEntry