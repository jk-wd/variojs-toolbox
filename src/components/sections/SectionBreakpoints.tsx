import React, {useState} from "react";
import {IBreakpoint, sortBreakpoints} from "variojs";
import FormInputString from "@components/form-elements/FormInputString";
import FormInputNumber from "@components/form-elements/FormInputNumber";
import FormFrameBlock from "@components/form-elements/FormFrameBlock";
import FormLine from "@components/form-elements/FormLine";
import FormLineSection from "@components/form-elements/FormLineSection";
import FormLabel from "@components/form-elements/FormLabel";
import FormFieldset from "@components/form-elements/FormFieldset";
import FormHeading from "@components/form-elements/FormHeading";
import DeleteLabel from "@components/typography/DeleteLabel";
import Button from "@components/Button";
import { useAnimationDataState, useAnimationDataDispatch, AnimationDataActions } from '@context/animation-data/AnimaitonDataContext';
import CtaMain from '@components/cta/CtaMain';



const SectionBreakpoints = () => {
    const dispatchAnimationData = useAnimationDataDispatch();
    const [breakPoint, setBreakpoint] = useState<any>({});
    const {animationData} = useAnimationDataState();

    return (
    <div>
        <br/><br/>
        <form onSubmit={(event:any) => {
            event.preventDefault();
            if(breakPoint.id && breakPoint.definition) {
                dispatchAnimationData({
                    type: AnimationDataActions.addBreakpoint,
                    id: breakPoint.id,
                    definition: breakPoint.definition,
                    order: breakPoint.order,
                });
            }
        }}>
            <FormHeading>
                Add breakpoint
            </FormHeading>
            <FormFieldset>
                <FormInputString onChange={(event:any) => {
                    setBreakpoint(
                        {
                            ...breakPoint,
                            id: event.target.value,
                        }
                    );
                }} label="Identifier"/>
                <FormInputString onChange={(event:any) => {
                    setBreakpoint(
                        {
                            ...breakPoint,
                            definition: event.target.value,
                        }
                    );
                }} label="Definition"/>
                <FormInputNumber onChange={(event:any) => {
                    setBreakpoint(
                        {
                            ...breakPoint,
                            order: parseInt(event.target.value),
                        }
                    );
                }} label="Order index"/>
            </FormFieldset>
            <FormFieldset>
                <button type="submit"><CtaMain>Add breakpoint</CtaMain></button>
            </FormFieldset>
        </form>
        <br/>
        {
            (animationData.breakpoints)?
            animationData.breakpoints.sort(sortBreakpoints).map((breakpoint:IBreakpoint) => {
                return(
                    <FormFrameBlock key={breakpoint.id}>
                        <FormLine>
                            <FormLineSection>
                                <FormLabel className="small">{breakpoint.id}</FormLabel>
                            </FormLineSection>
                            <FormLineSection>
                                <Button onClick={
                                    () => {
                                        dispatchAnimationData({
                                            type: AnimationDataActions.removeBreakpoint,
                                            id: breakpoint.id,
                                        });
                                    }
                                }><DeleteLabel>Delete</DeleteLabel></Button>
                            </FormLineSection>
                        </FormLine>
                        <FormLine>
                            <FormLineSection>
                                <FormInputNumber onChange={(event: any) => {
                                     dispatchAnimationData({
                                        type: AnimationDataActions.editBreakpoint,
                                        id: breakpoint.id,
                                        definition: breakpoint.definition,
                                        order: parseInt(event.target.value, 10),
                                    });
                                }} label="Order" defaultValue={breakpoint.order}/>
                            </FormLineSection>
                            <FormLineSection>
                                <FormInputString onChange={(event: any) => {
                                     dispatchAnimationData({
                                        type: AnimationDataActions.editBreakpoint,
                                        id: breakpoint.id,
                                        definition: event.target.value,
                                        order: breakpoint.order,
                                    });
                                }} label="Definition" defaultValue={breakpoint.definition}/>
                            </FormLineSection>
                        </FormLine>
                    </FormFrameBlock>
                )
            })
            :null
        }

    </div>
    )
}
export default SectionBreakpoints