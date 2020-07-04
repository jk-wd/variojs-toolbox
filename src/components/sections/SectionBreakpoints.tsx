import React, {useState} from "react";
import {IBreakpoint, sortBreakpoints} from "variojs";
import FormInputText from "@components/form-elements/FormInputText";
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
    const animationDataDispatch = useAnimationDataDispatch();
    const [breakPoint, setBreakpoint] = useState<any>({});
    const {animationData} = useAnimationDataState();

    return (
    <div>
        <FormHeading className="large">Breakpoints</FormHeading>
        <div style={{
                paddingTop: '4px',
                marginBottom: '26px'
            }}>
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
                                        animationDataDispatch({
                                            type: AnimationDataActions.deleteBreakpoint,
                                            breakpointId: breakpoint.id,
                                        });
                                        animationDataDispatch({
                                            type: AnimationDataActions.syncAnimationData,
                                        });
                                    }
                                }><DeleteLabel>Delete</DeleteLabel></Button>
                            </FormLineSection>
                        </FormLine>
                        <FormLine>
                            <FormLineSection>
                                <FormInputText onChange={(event: any) => {
                                     animationDataDispatch({
                                        type: AnimationDataActions.editBreakpoint,
                                        breakpoint: {
                                            id: breakpoint.id,
                                            definition: breakpoint.definition,
                                            order: parseInt(event.target.value, 10),
                                        }
                                    });
                                    animationDataDispatch({
                                        type: AnimationDataActions.syncAnimationData,
                                    });
                                }} label="Importance" defaultValue={breakpoint.order}/>
                            </FormLineSection>
                            <FormLineSection>
                                <FormInputText onChange={(event: any) => {
                                     animationDataDispatch({
                                        type: AnimationDataActions.editBreakpoint,
                                        breakpoint: {
                                            id: breakpoint.id,
                                            definition: event.target.value,
                                            order: breakpoint.order,
                                        }
                                    });
                                    animationDataDispatch({
                                        type: AnimationDataActions.syncAnimationData,
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
        <form onSubmit={(event:any) => {
                event.preventDefault();
                if(breakPoint.id && breakPoint.definition) {
                    animationDataDispatch({
                        type: AnimationDataActions.addBreakpoint,
                        breakpoint: {
                            id: breakPoint.id,
                            definition: breakPoint.definition,
                            order: breakPoint.order,
                        }
                    });
                    animationDataDispatch({
                        type: AnimationDataActions.syncAnimationData,
                    });
                }
            }}>
                <FormHeading>
                    Add breakpoint
                </FormHeading>
                <FormFieldset>
                    <FormInputText onChange={(event:any) => {
                        setBreakpoint(
                            {
                                ...breakPoint,
                                id: event.target.value,
                            }
                        );
                    }} label="Identifier"/>
                    <FormInputText onChange={(event:any) => {
                        setBreakpoint(
                            {
                                ...breakPoint,
                                definition: event.target.value,
                            }
                        );
                    }} label="Definition"/>
                    <FormInputText onChange={(event:any) => {
                        setBreakpoint(
                            {
                                ...breakPoint,
                                order: parseInt(event.target.value),
                            }
                        );
                    }} label="Order index"/>
                </FormFieldset>
                <FormFieldset>
                    <button type="submit" style={{marginTop: '10px'}}><CtaMain>Add breakpoint</CtaMain></button>
                </FormFieldset>
            </form>
    </div>
    )
}
export default SectionBreakpoints