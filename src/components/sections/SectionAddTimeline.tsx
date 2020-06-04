import React, {useState} from "react";
import FormInputString from "@components/form-elements/FormInputString";
import FormFieldset from "@components/form-elements/FormFieldset";
import FormHeading from "@components/form-elements/FormHeading";
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import { useAnimationDataDispatch, AnimationDataActions } from '@context/animation-data/AnimaitonDataContext';
import {Sections} from "@interfaces/navigation";
import CtaMain from '@components/cta/CtaMain';

interface Props {
    parallax: boolean
}

const SectionAddTimeline = ({parallax}: Props) => {
    const dispatchAnimationData = useAnimationDataDispatch();
    const navigationDispatch = useNavigationDispatch();
    const [timeline, setTimeline] = useState<any>({});

    return (
    <div>
        <FormHeading>Add timeline</FormHeading>
        <form onSubmit={(event:any) => {
            event.preventDefault();
            if(timeline.id) {
                dispatchAnimationData({
                    type: AnimationDataActions.addTimeline,
                    id: timeline.id,
                    parallax
                });
                dispatchAnimationData({
                    type: AnimationDataActions.setActiveTimeline,
                    timeline: {
                        timelineId: timeline.id,
                        parallax,
                    }
                });
                navigationDispatch({
                    type: NavigationActions.setActiveSection,
                    section: (parallax)?Sections.TIMELINE:Sections.PARALLAX_TIMELINE,
                });
            }
        }}>

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
    </div>
    )
}
export default SectionAddTimeline