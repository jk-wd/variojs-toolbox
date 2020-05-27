import React from "react";
import {uuidv4} from "@helpers/guid"
import {useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import {usePlaceholders} from "@context/placeholders/PlaceholdersContext";
import { useAnimationDataState } from '@context/animation-data/AnimaitonDataContext';
import {Sections} from "@interfaces/navigation";
import CtaMain from '@components/cta/CtaMain';
import { IAnimationEntry } from 'variojs';

const SectionAddAnimationEntry = () => {
    const animationDataDispatch = useAnimationDataDispatch();
    const navigationDispatch = useNavigationDispatch();
    const {animationData} = useAnimationDataState();
    const placeholders = usePlaceholders();
    const selectRef = React.createRef<HTMLSelectElement>();

    return (
        <div>
            <form onSubmit={(event:any) => {
                event.preventDefault();
                if(selectRef.current && selectRef.current.value) {
                    animationDataDispatch( {
                        type: AnimationDataActions.addEditAnimationEntry,
                        animationEntry: {
                            id: uuidv4(),
                            domReference: selectRef.current.value
                        },
                    });
                    navigationDispatch({
                        type: NavigationActions.setActiveSection,
                        section: Sections.ANIMATION_ENTRIES,
                    });
                }
                
            }}>
                <h1 style={{marginTop: "20px", marginBottom: "10px"}}>Add animation entry</h1>
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