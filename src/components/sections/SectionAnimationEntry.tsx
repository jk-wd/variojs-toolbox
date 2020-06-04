import React from "react";
import FormAnimationEntry from "@components/forms/FormAnimationEntry";
import {getAnimationEntryById} from "variojs";
import { useAnimationDataState } from '@context/animation-data/AnimaitonDataContext';
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
        <FormAnimationEntry animationEntry={animationEntry}/>
        {
            (animationEntry.animationConnection)?
            <FormAnimationDefinition propsOfEntry={true} animationDefinitionId={animationEntry.animationConnection.animationDefinitionId} />
            :null
        }
        
    </div>
    )
}
export default SectionAnimationEntry