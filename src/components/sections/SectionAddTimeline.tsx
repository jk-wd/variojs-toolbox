import React, {useState} from "react";
import FormInputText from "@components/form-elements/FormInputText";
import FormFieldset from "@components/form-elements/FormFieldset";
import FormHeading from "@components/form-elements/FormHeading";
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import { useAnimationDataDispatch, AnimationDataActions } from '@context/animation-data/AnimaitonDataContext';
import {Sections} from "@enums/navigation";
import CtaMain from '@components/cta/CtaMain';

interface Props {
    pixelBased: boolean
}

const SectionAddTimeline = ({pixelBased}: Props) => {
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
                    timeline: {
                        id: timeline.id,
                        pixelBased
                    }
                });
                dispatchAnimationData({
                    type: AnimationDataActions.setActiveTimeline,
                    timeline: timeline
                });
                navigationDispatch({
                    type: NavigationActions.setActiveSection,
                    section: (pixelBased)?Sections.TIMELINE:Sections.PIXELBASED_TIMELINE,
                });
            }
        }}>

            <FormFieldset>
                <FormInputText onChange={(event:any) => {
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