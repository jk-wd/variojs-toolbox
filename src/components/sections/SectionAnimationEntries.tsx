import React from "react";
import BlockAnimationEntry from "@components/blocks/BlockAnimationEntry";
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import {Sections} from "@interfaces/navigation";
import {IAnimationEntry} from "variojs";
import Button from "@components/Button";
import CtaMain from "@components/cta/CtaMain";
import { useAnimationDataState } from '@context/animation-data/AnimaitonDataContext';

const SectionAnimationEntries = () => {
    const navigationDispatch = useNavigationDispatch();
    const {animationData} = useAnimationDataState();
    return (
    <div>
        <div style={{
            marginBottom: '30px'
        }}>
            {
            (animationData && animationData.animationEntries)?
                animationData.animationEntries.map((animationEntry: IAnimationEntry) => {
                    return <BlockAnimationEntry key={animationEntry.id} animationEntry={animationEntry}/>
                }):null
            }
        </div>
        <Button
            onClick={() => {
                navigationDispatch({
                    type: NavigationActions.setActiveSection,
                    section: Sections.ADD_ANIMATION_ENTRY,
                });
            }}

        ><CtaMain>Add Animation entry</CtaMain></Button>
    </div>
    )
}
export default SectionAnimationEntries