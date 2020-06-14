import React, { useState } from "react";
import {uuidv4} from "@helpers/guid"
import {useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import FormHeading from "@components/form-elements/FormHeading";
import FormFieldset from "@components/form-elements/FormFieldset";
import FormLabel from "@components/form-elements/FormLabel";
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";

import {Sections} from "@interfaces/navigation";
import FormInputString from "@components/form-elements/FormInputString";
import CtaMain from '@components/cta/CtaMain';

const SectionAddAnimationDefinition = () => {
    const animationDataDispatch = useAnimationDataDispatch();
    const navigationDispatch = useNavigationDispatch();
    const [name, setName] = useState<string | undefined>();

    return (
        <div>
            <form onSubmit={(event:any) => {
                event.preventDefault();

                if(name && name != '') {
                    const animationDefinitionId = uuidv4();
                    animationDataDispatch({
                        type: AnimationDataActions.addEditAnimationDefinition,
                        animationDefinition: {
                            name,
                            id:animationDefinitionId,
                            props: {}
                        }
                    });


                    animationDataDispatch({
                        type: AnimationDataActions.setActiveAnimationDefinition,
                        animationDefinitionId: animationDefinitionId
                    });
                    animationDataDispatch({
                        type: AnimationDataActions.setFilterByFrameId,
                        frameId: undefined
                    })
                    navigationDispatch({
                        type: NavigationActions.setActiveSection,
                        section: Sections.ANIMATION_DEFINITION,
                    });
                }
                
            }}>
                <FormHeading className="large">Add animation definition</FormHeading>
                <FormFieldset>
                    <FormLabel className="small">Name</FormLabel><br />
                    <FormInputString onChange={(event) => {
                        setName(event.target.value);
                    }} />
                </FormFieldset>
                <br/>
                <FormFieldset>
                    <button type="submit" ><CtaMain>Add Animation definition</CtaMain></button>
                </FormFieldset>
            </form>
        </div>
    )
}
export default SectionAddAnimationDefinition