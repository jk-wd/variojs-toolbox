import React, {useState} from "react";
import {PropTypes, IFrame} from "variojs";
import styled from "styled-components";
import FormFieldset from "@components/form-elements/FormFieldset";
import FormFrameNumberArray from "@components/forms/FormFrameArray";
import FormFrame from "@components/forms/FormFrame";
import {getAnimationDefinitionById} from "variojs";
import FormInputString from "@components/form-elements/FormInputString";
import {FrameType} from "@interfaces/frames";
import {useAnimationDataState, useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import FormLabel from "@components/form-elements/FormLabel";
import { uuidv4 } from '@helpers/guid';

const TopSection = styled.fieldset`
    display:block;
    margin-bottom:30px;
    padding: 0;
    margin: 0;
    border: none;
`;

const FormAnimationDefinition = () => {
    const [activeProps, setActiveProps] = useState<string[]>([]);
    const {activeAnimationDefinition, animationData} = useAnimationDataState();
    
    const animationDefinition = getAnimationDefinitionById(animationData, activeAnimationDefinition)
    const animationDataDispatch = useAnimationDataDispatch();
    if(!animationDefinition) {
        return null;
    }
    return (
        <div>
             <div>
                
            </div>
            <TopSection>
                <FormLabel>Animation definition ({(animationDefinition.name)?animationDefinition.name: animationDefinition.id})</FormLabel>
                <FormInputString label="Animation definition name" defaultValue={animationDefinition.name} onChange={(event: any) => {
                    animationDataDispatch(
                        {
                            type: AnimationDataActions.addEditAnimationDefinition,
                            animationDefinition: {
                                ...animationDefinition,
                                name: event.target.value
                            }
                        }
                    );
                }} />
                <br />
            </TopSection>
            
            {Object.keys(PropTypes).map((key:string) => {
                
                const props = animationDefinition.props;
                if(!props[key] && !(activeProps.indexOf(key) > -1)) {
                    return
                }
                if(
                    key === 'scaleX' || 
                    key === 'scaleY' || 
                    key === 'opacity' || 
                    key === 'rotate' || 
                    key === 'width' || 
                    key === 'height' || 
                    key === 'posY' || 
                    key === 'display' || 
                    key === 'posX'
                ){
                    return (
                    <div key={key}>
                        <FormLabel className="small">{key}</FormLabel>
                        <FormFrameNumberArray frameType={(key === "display")?FrameType.StringFrame: FrameType.NumberFrame} frames={props[key]} onChange={(frames) => {
                            animationDataDispatch(
                                {
                                    type: AnimationDataActions.addEditAnimationDefinition,
                                    animationDefinition: {
                                        ...animationDefinition,
                                        props: {
                                            ...animationDefinition.props,
                                            [key]: frames
                                        }
                                    }
                                }
                            );
                        }}
                        />

                    <br/>
                    </div>)
                }
                if(key === 'playVideo') {
                    const frames = (props[key])?props[key]:null;
  
                    const frame = (frames && frames[0])?frames[0]:{
                        id: uuidv4(),
                        frame: 0
                    };
                    
                    return (
                        <>
                        <br/>
                        <FormLabel className="small">{key}</FormLabel>
                        <FormFrame key={frame.id} frameType={FrameType.Frame} frame={frame} 
                        onDelete={() => {
                            animationDataDispatch(
                                {
                                    type: AnimationDataActions.addEditAnimationDefinition,
                                    animationDefinition: {
                                        ...animationDefinition,
                                        props: {
                                            ...animationDefinition.props,
                                            [key]: []
                                        }
                                    }
                                }
                            );
                        }} 
                        onChange={(frameChanged: IFrame) => {

                            animationDataDispatch(
                                {
                                    type: AnimationDataActions.addEditAnimationDefinition,
                                    animationDefinition: {
                                        ...animationDefinition || {},
                                        props: {
                                            ...(animationDefinition)?animationDefinition.props:{},
                                            [key]: [frameChanged]
                                        }
                                    }
                                }
                            );
                        }} 
                    />
                    <br/>
                    </>
                    )
                }
                return;
            })}
            <div style={{marginTop: '10px'}}>
                <FormFieldset>
                    <FormLabel htmlFor="animationProperty">Add property</FormLabel><br />
                    <select onChange={(event:any) => {
                        const value = event.target.value;
                        setActiveProps([...activeProps, value]);
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
           

        </div>
    )
}
export default FormAnimationDefinition