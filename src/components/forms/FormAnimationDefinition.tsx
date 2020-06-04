import React, {useState} from "react";
import {PropTypes} from "variojs";
import styled from "styled-components";
import FormFieldset from "@components/form-elements/FormFieldset";
import FormFrameNumberArray from "@components/forms/FormFrameArray";
import {getAnimationDefinitionById} from "variojs";
import FormInputString from "@components/form-elements/FormInputString";
import {FrameType} from "@interfaces/frames";
import {useAnimationDataState, useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import FormLabel from "@components/form-elements/FormLabel";
import FormHeading from "@components/form-elements/FormHeading";
import Button from '@components/Button';
import CtaMain from '@components/cta/CtaMain';
import { Colors } from '@interfaces/colors';

interface Props {
    animationDefinitionId?: string;
    propsOfEntry?: boolean;
}

const Frames = styled.div`
    border-bottom: 2px solid ${Colors.darkGrey};
    padding-bottom: 10px;
`

const BottomSection = styled.fieldset`
    display:block;
    margin-bottom:30px;
    padding: 0;
    margin: 0;
    border: none;
`;

const FormAnimationDefinition = ({animationDefinitionId, propsOfEntry = false} : Props) => {
    const [activeProps, setActiveProps] = useState<string[]>([]);
    const selectPropRef = React.createRef<HTMLSelectElement>();
    const {activeAnimationDefinition, animationData} = useAnimationDataState();
    const targetAnimationDefinitionId = (animationDefinitionId)? animationDefinitionId: activeAnimationDefinition;
    const animationDefinition = getAnimationDefinitionById(animationData, targetAnimationDefinitionId)
    const [name, setName] = useState((animationDefinition)?animationDefinition.name:undefined);
    const animationDataDispatch = useAnimationDataDispatch();
    if(!animationDefinition) {
        return null;
    }
    return (
        <div>
            {
                (!propsOfEntry)?
                <FormHeading subHeading={name} className="large">Animation definition</FormHeading>:null
            }
            
            
            {Object.keys(PropTypes).map((key:string) => {
                
                const props = animationDefinition.props;
                if(!props[key] && !(activeProps.indexOf(key) > -1)) {
                    return
                }
                if(
                    key === 'translateX' || 
                    key === 'translateY' || 
                    key === 'scaleX' || 
                    key === 'scaleY' || 
                    key === 'opacity' || 
                    key === 'rotate' || 
                    key === 'width' || 
                    key === 'height' || 
                    key === 'posY' || 
                    key === 'display' || 
                    key === 'visibility' || 
                    key === 'posX'
                ){
                    console.log("key", key);
                    return (
                    <Frames key={animationDefinitionId +''+ key}>
                        <FormLabel className="line">{key}</FormLabel>
                        <FormFrameNumberArray frameType={(key === "display" || key === "visibility" )?FrameType.StringFrame: FrameType.NumberFrame} frames={props[key]} onChange={(frames) => {
                            const newProps = {
                                ...animationDefinition.props,
                                [key]: frames
                            }
                            if((!newProps[key] || newProps[key].length <= 0)) {
                                delete newProps[key];
                            }
                            animationDataDispatch(
                                {
                                    type: AnimationDataActions.addEditAnimationDefinition,
                                    animationDefinition: {
                                        ...animationDefinition,
                                        props: newProps
                                    }
                                }
                            );
                        }}
                        />
                    </Frames>)
                }
                return;
            })}
            <div style={{marginTop: '10px', marginBottom: '40px'}}>
                <FormFieldset>
                    <FormLabel className="small" htmlFor="animationProperty">Add property</FormLabel><br />
                    <select ref={selectPropRef} onChange={(event:any) => {
                        const value = event.target.value;
                        setActiveProps([...activeProps, value]);
                        if(selectPropRef.current) {
                            selectPropRef.current.value = "";
                        }
                    }} name="animationProperty" id="animationProperty">
                        <option value="">select a property</option>
                        {Object.keys(PropTypes).map((key:string) => {
                            if(animationDefinition && animationDefinition.props[key]) {
                                return undefined
                            }
                            return (
                                <option key={key} value={key}>{key}</option>
                            )
                        })}
                    </select>
                </FormFieldset>
            </div>
           
            <BottomSection>
                <FormLabel>{(propsOfEntry)?'Create global definition': 'Definition name'}</FormLabel>
                <FormInputString defaultValue={name} onChange={(event: any) => {
                    setName(event.target.value);
                }} />
                <div style={{paddingTop: '8px'}}>
                    <Button onClick={() => {
                        animationDataDispatch(
                            {
                                type: AnimationDataActions.addEditAnimationDefinition,
                                animationDefinition: {
                                    ...animationDefinition,
                                    name
                                }
                            }
                        );
                        setName(undefined);
                    }}><CtaMain className="small orange">{(propsOfEntry)?'Create global definition': 'Set name'}</CtaMain></Button>
                </div>
               
            </BottomSection>
        </div>
    )
}
export default FormAnimationDefinition