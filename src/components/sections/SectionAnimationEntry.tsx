import React from "react";
import BlockAnimationEntry from "@components/blocks/BlockAnimationEntry";
import {getAnimationEntryById} from "variojs";
import { useAnimationDataState } from '@context/animation-data/AnimaitonDataContext';
import FormLabel from '@components/form-elements/FormLabel';
import FormAnimationDefinition from '@components/forms/FormAnimationDefinition';

const SectionAnimationEntry = () => {
    const {animationData, activeAnimationEntry} = useAnimationDataState();
    let animationEntry;
    if(activeAnimationEntry) {
        animationEntry = getAnimationEntryById(animationData, activeAnimationEntry.id);    
    }
    if(!animationEntry) {
        return null;
    }
    
    return (
    <div>
        <FormLabel>Animation entry {(animationEntry.name)?`(${animationEntry.name})`: ''}</FormLabel>
        <BlockAnimationEntry animationEntry={animationEntry}/>
        {
            (animationEntry.animationConnection)?
            <FormAnimationDefinition animationDefinitionId={animationEntry.animationConnection.animationDefinitionId} />
            :null
        }
        
    </div>
    )
}
export default SectionAnimationEntry