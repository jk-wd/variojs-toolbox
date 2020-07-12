import React, {useState} from "react";
import FormInputText from "@components/form-elements/FormInputText";
import FormFieldset from "@components/form-elements/FormFieldset";
import FormHeading from "@components/form-elements/FormHeading";
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import {useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import {Sections} from "@enums/navigation";
import CtaMain from '@components/cta/CtaMain';
import {useSiteState} from "@context/sites/SiteContext";
import {ISite} from "@interfaces/site";

interface Props {
    pixelBased: boolean
}

const SectionAddTimeline = ({pixelBased}: Props) => {
    const animationDataDispatch = useAnimationDataDispatch();
    const navigationDispatch = useNavigationDispatch();
    const [timeline, setTimeline] = useState<any>({});
    const {sites} = useSiteState();
    const activeSite = sites.find((site: ISite) => (site.active));
    const url = (activeSite)?activeSite.url:undefined;

    return (
    <div>
        <FormHeading>Add timeline</FormHeading>
        <form onSubmit={(event:any) => {
            event.preventDefault();
            if(timeline.id) {
                animationDataDispatch({
                    type: AnimationDataActions.addTimeline,
                    timeline: {
                        id: timeline.id,
                        pixelBased
                    }
                });
                animationDataDispatch({
                    type: AnimationDataActions.syncAnimationData,
                    url
                })
                animationDataDispatch({
                    type: AnimationDataActions.setActiveTimeline,
                    timeline: {
                        timelineId: timeline.id,
                        pixelBased
                    }
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