import React, {useEffect} from "react";
import {uuidv4} from "variojs"
import FormAnimationEntry from "@components/forms/FormAnimationEntry";
import {getAnimationEntryById} from "variojs";
import FormAnimationDefinition from '@components/forms/FormAnimationDefinition';
import {IAnimationEntry} from "variojs";
import {useAnimationDataDispatch, AnimationDataActions, useAnimationDataState} from "@context/animation-data/AnimaitonDataContext";
import {useSiteState} from "@context/sites/SiteContext";
import {ISite} from "@interfaces/site";

const SectionAnimationEntry = () => {
    const {animationData, activeAnimationEntry} = useAnimationDataState();
    const {sites} = useSiteState();
    const activeSite = sites.find((site: ISite) => (site.active));
    const url = (activeSite)?activeSite.url:undefined;
    const animationDataDispatch = useAnimationDataDispatch();
    let animationEntry:IAnimationEntry | undefined;
    if(activeAnimationEntry) {
        animationEntry = getAnimationEntryById(animationData, activeAnimationEntry.id);    
    }
    if(!animationEntry) {
        return null;
    }
    
    useEffect(() => {
        if(animationEntry && !animationEntry.animationConnection) {
            const animationDefinitionId = uuidv4();
            animationDataDispatch({
                type: AnimationDataActions.addAnimationDefinition,
                animationDefinition: {
                    id:animationDefinitionId,
                    props: {}
                }
            });
            animationDataDispatch(
                {
                    type: AnimationDataActions.addAnimationEntryConnection,
                    local: true,
                    animationConnection:{
                        animationDefinitionId
                    },
                    animationEntryId: animationEntry.id
                }
            );
            animationDataDispatch({
                type: AnimationDataActions.syncAnimationData,
                url
            })
        }
    }, [animationEntry])

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