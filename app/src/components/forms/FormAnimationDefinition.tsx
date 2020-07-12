import React, {useState, useEffect} from "react";
import {PropTypes, FrameValueTypes} from "variojs";
import styled from "styled-components";
import FormFieldset from "@components/form-elements/FormFieldset";
import FormFrameNumberArray from "@components/forms/FormFrameArray";
import {getAnimationDefinitionById} from "variojs";
import {useSiteState} from "@context/sites/SiteContext";
import FormInputString from "@components/form-elements/FormInputText";
import {useAnimationDataState, useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import FormLabel from "@components/form-elements/FormLabel";
import FormHeading from "@components/form-elements/FormHeading";
import Button from '@components/Button';
import CtaMain from '@components/cta/CtaMain';
import { Colors } from '@enums/colors';
import { ISite } from '@interfaces/site';

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
    const {activeAnimationDefinition, filterByFrameId, animationData} = useAnimationDataState();
    const {sites} = useSiteState();
    const activeSite = sites.find((site: ISite) => (site.active));
    const url = (activeSite)?activeSite.url:undefined;
    const targetAnimationDefinitionId = (animationDefinitionId)? animationDefinitionId: activeAnimationDefinition;
    const animationDefinition = getAnimationDefinitionById(animationData, targetAnimationDefinitionId)
    const [name, setName] = useState((animationDefinition)?animationDefinition.name:undefined);
    const animationDataDispatch = useAnimationDataDispatch();



    useEffect(() => {
        if(animationDefinition) {
            setName(animationDefinition.name);
        }
        
    }, [animationDefinition])

    if(!animationDefinition) {
        return null;
    }
    return (
        <div>
            {
                (!propsOfEntry && !filterByFrameId)?
                <FormHeading subHeading={name} className="large">Animation definition</FormHeading>:null
            }
            
            
            {Object.keys(PropTypes).map((key:string) => {
                
                const props = animationDefinition.props;
                const unit = (props[key] && props[key].length > 0)?props[key][0].unit: '';
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
                    return (
                    <Frames key={animationDefinition.id +''+ key + unit}>

                        <FormFrameNumberArray propType={key as PropTypes} frameType={key} animationDefinitionId={animationDefinition.id} frameValueType={(key === "display" || key === "visibility" )?FrameValueTypes.string: FrameValueTypes.number} frames={props[key]} filterByFrameId={filterByFrameId} onChange={(frames) => {
                            const newProps = {
                                ...animationDefinition.props,
                                [key]: frames
                            }
                            if((!newProps[key] || newProps[key].length <= 0)) {
                                delete newProps[key];
                            }
                            animationDataDispatch(
                                {
                                    type: AnimationDataActions.editAnimationDefinition,
                                    animationDefinition: {
                                        ...animationDefinition,
                                        props: newProps
                                    }
                                }
                            );
                            animationDataDispatch({
                                type: AnimationDataActions.syncAnimationData,
                                url
                            })
                        }}
                        />
                    </Frames>)
                }
                return;
            })}
            {
                (!filterByFrameId)?
                <>
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
                        <FormLabel>{(propsOfEntry)?'Promote to animation definition': 'Definition name'}</FormLabel>
                        <FormInputString defaultValue={name} onChange={(event: any) => {
                            setName(event.target.value);
                        }} />
                        <div style={{paddingTop: '8px'}}>
                            <Button onClick={() => {
                                animationDataDispatch(
                                    {
                                        type: AnimationDataActions.editAnimationDefinition,
                                        animationDefinition: {
                                            ...animationDefinition,
                                            name
                                        }
                                    }
                                );
                                animationDataDispatch({
                                    type: AnimationDataActions.syncAnimationData,
                                    url
                                })
                                setName(undefined);
                            }}><CtaMain className="small orange">{(propsOfEntry)?'Create global definition': 'Set name'}</CtaMain></Button>
                        </div>
                    
                    </BottomSection>
                </>:null
            }
         
        </div>
    )
}
export default FormAnimationDefinition