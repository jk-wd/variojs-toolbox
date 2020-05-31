import React, {useState} from "react";
import {IParallaxTimeline} from "variojs";
import FormInputString from "@components/form-elements/FormInputString";
import FormFieldset from "@components/form-elements/FormFieldset";
import FormHeading from "@components/form-elements/FormHeading";
import { useAnimationDataState, useAnimationDataDispatch, AnimationDataActions } from '@context/animation-data/AnimaitonDataContext';
import CtaMain from '@components/cta/CtaMain';
import BlockTimeline from '@components/blocks/BlockTimeline';



const SectionParallaxTimelines = () => {
    const dispatchAnimationData = useAnimationDataDispatch();
    const [timeline, setTimeline] = useState<any>({});
    const {animationData} = useAnimationDataState();

    return (
    <div>
         <select onChange={
                    (event:any) => {
                        dispatchAnimationData({
                            type: AnimationDataActions.setActiveParallaxTimeline,
                            timelineId:event.target.value,
                        });
                    }
                }>
                    <option selected disabled>Set active parallax timeline</option>
                    {
                        animationData.parallaxTimelines.reduce((result: React.ReactNode[], parallaxTimeline: IParallaxTimeline) => {
                            result.push(
                                <option key={parallaxTimeline.id} value={parallaxTimeline.id}>{parallaxTimeline.id}</option>
                            );
                            return result;
                        }, [])
                        
                    }
        </select>
        <br/><br/>
        <form onSubmit={(event:any) => {
            event.preventDefault();
            if(timeline.id) {
                dispatchAnimationData({
                    type: AnimationDataActions.addTimeline,
                    id: timeline.id,
                    parallax:true
                });
            }
        }}>
            <FormHeading>
                Add parallax timeline
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
                <button type="submit"><CtaMain>Add parallax timeline</CtaMain></button>
            </FormFieldset>
        </form>
        <br/>
        {
            (animationData.parallaxTimelines)?
            animationData.parallaxTimelines.map((timeline:IParallaxTimeline) => {
                if(!timeline) {
                    return;
                }
                return <BlockTimeline key={timeline.id} parallax={true} timeline={timeline}/>
            })
            :null
        }

    </div>
    )
}
export default SectionParallaxTimelines