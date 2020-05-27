import React, {useState} from "react";
import {ITimeline} from "variojs";
import FormInputString from "@components/form-elements/FormInputString";
import BlockTimeline from "@components/blocks/BlockTimeline";
import FormFieldset from "@components/form-elements/FormFieldset";
import FormHeading from "@components/form-elements/FormHeading";
import { useAnimationDataState, useAnimationDataDispatch, AnimationDataActions } from '@context/animation-data/AnimaitonDataContext';
import CtaMain from '@components/cta/CtaMain';



const SectionTimelines = () => {
    const dispatchAnimationData = useAnimationDataDispatch();
    const [timeline, setTimeline] = useState<any>({});
    const {animationData} = useAnimationDataState();

    return (
    <div>
        <br/><br/>
        <form onSubmit={(event:any) => {
            event.preventDefault();
            if(timeline.id) {
                dispatchAnimationData({
                    type: AnimationDataActions.addTimeline,
                    id: timeline.id,
                    parallax: false
                });
            }
        }}>
            <FormHeading>
                Add timeline
            </FormHeading>
            <FormFieldset>
                <FormInputString onChange={(event:any) => {
                    setTimeline(
                        {
                            ...timeline,
                            id: event.target.value,
                        }
                    );
                }} label="Identifier"/>
            </FormFieldset>
            <FormFieldset>
                <button type="submit"><CtaMain>Add timeline</CtaMain></button>
            </FormFieldset>
        </form>
        <br/>
        {
            (animationData.timelines)?
            animationData.timelines.map((timeline:ITimeline) => {
                if(!timeline) {
                    return;
                }
                return <BlockTimeline key={timeline.id} timeline={timeline}/>
            })
            :null
        }

    </div>
    )
}
export default SectionTimelines