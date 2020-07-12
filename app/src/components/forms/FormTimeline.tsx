import React from "react";

import {ITimeline} from 'variojs';
import FormHeading from '@components/form-elements/FormHeading';
import FormLabel from '@components/form-elements/FormLabel';
import {useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import FormFieldset from '@components/form-elements/FormFieldset';
import FormInputText from '@components/form-elements/FormInputText';
import {useSiteState} from "@context/sites/SiteContext";
import {ISite} from "@interfaces/site";

interface IProps {
    timeline: ITimeline
    pixelBased: boolean
}


const FormTimeline = ({timeline, pixelBased = false}: IProps) => {
    const animationDataDispatch = useAnimationDataDispatch();
    const {sites} = useSiteState();
    const activeSite = sites.find((site: ISite) => (site.active));
    const url = (activeSite)?activeSite.url:undefined;
    
    if(!timeline) {
        return null
    }
    return (
        <div>
            <FormHeading subHeading={timeline.id} className="large">Timeline</FormHeading>
            <FormFieldset>
                    <FormInputText defaultValue={timeline.duration} label="Duration" onChange={(event: any) => {
                        animationDataDispatch({
                            type: AnimationDataActions.editTimeline,
                            timeline: {
                                ...timeline,
                                duration: event.target.value,
                                pixelBased
                            }
                        });
                        animationDataDispatch({
                            type: AnimationDataActions.syncAnimationData,
                            url
                        })
                    }}></FormInputText>
                </FormFieldset>
                <FormFieldset>
                    <FormLabel className="small">Loop timeline</FormLabel><br />
                    <input checked={timeline.loop} type="checkbox" onChange={
                        (event) => {
                            animationDataDispatch({
                                type: AnimationDataActions.editTimeline,
                                timeline: {
                                    ...timeline,
                                    loop: event.target.checked,
                                    pixelBased
                                }
                            });
                            animationDataDispatch({
                                type: AnimationDataActions.syncAnimationData,
                                url
                            })
                        }
                    } />
                </FormFieldset>
            
            
        </div>
    )
}



export default FormTimeline;