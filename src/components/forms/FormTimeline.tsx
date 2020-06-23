import React from "react";

import {ITimeline} from 'variojs';
import FormHeading from '@components/form-elements/FormHeading';
import FormLabel from '@components/form-elements/FormLabel';
import {useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import FormFieldset from '@components/form-elements/FormFieldset';

interface IProps {
    timeline: ITimeline
    pixelBased: boolean
}


const FormTimeline = ({timeline, pixelBased = false}: IProps) => {
    const animationDataDispatch = useAnimationDataDispatch();

    
    if(!timeline) {
        return null
    }
    return (
        <div>
            <FormHeading subHeading={timeline.id} className="large">Timeline</FormHeading>
            {
                (!pixelBased)?
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
                        }
                    } />
                </FormFieldset>:null
            }
            
            
        </div>
    )
}



export default FormTimeline;