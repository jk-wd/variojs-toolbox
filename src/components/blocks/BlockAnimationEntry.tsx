import React, {useCallback} from "react";
import {uuidv4} from "@helpers/guid";
import styled from "styled-components";
import DeleteLabel from "@components/typography/DeleteLabel";
import BlockLine from "@components/block-elements/BlockLine";
import { IAnimationEntry } from 'variojs/lib/types-interfaces';
import Block from '@components/block-elements/Block';
import BlockHeading from '@components/block-elements/BlockHeading';
import BlockSection from '@components/block-elements/BlockSection';
import FormInputString from '@components/form-elements/FormInputString';
import Button from '@components/Button';
import CtaMain from '@components/cta/CtaMain';
import {getAnimationDefinitionById, IAnimationDefinition} from 'variojs';
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import {useAnimationDataDispatch, AnimationDataActions, useAnimationDataState} from "@context/animation-data/AnimaitonDataContext";
import {Sections} from "@interfaces/navigation";

interface IProps {
    animationEntry: IAnimationEntry
}

const RemoveButtonHolder = styled.div`
    float: right;
`;

const BlockAnimationEntry = ({animationEntry}: IProps) => {
    const animationDataDispatch = useAnimationDataDispatch();
    const {animationData, breakpoint} = useAnimationDataState();
    const navigationDispatch = useNavigationDispatch();
    const placeAddAnimation = useCallback(() => {
        if(!animationData) {
            return
        }
        return (
            <Button onClick={
                () => {
                    animationDataDispatch({
                        type: AnimationDataActions.setActiveAnimationEntry,
                        activeAnimationEntry: {
                            id:animationEntry.id
                        }
                    });
                    
                    const animationDefinitionId = uuidv4();

                    animationDataDispatch({
                        type: AnimationDataActions.saveAnimationDefinition,
                        animationDefinition: {
                            id:animationDefinitionId,
                            props: {}
                        }
                    });

                    animationDataDispatch({
                        type: AnimationDataActions.setActiveAnimationDefinition,
                        animationDefinitionId,
                    });
                    navigationDispatch({
                        type: NavigationActions.setActiveSection,
                        section: Sections.ANIMATION_DEFINITION,
                    });
                }
            }><CtaMain className="small">Add new animation definition</CtaMain></Button>
        )
    }, [animationData]);
    const placeConnectAnimation = useCallback(() => {
        if(!animationData || !animationData.animationDefinitions) {
            return
        }
        return (
            <>
                <select onChange={
                    (event:any) => {
                        animationDataDispatch({
                            type: AnimationDataActions.connectAnimationDefinition,
                            definitionId: event.target.value,
                            animationEntryId: animationEntry.id,
                        });
                    }
                }>
                    <option selected disabled>Connect animation definition</option>
                    {
                        animationData.animationDefinitions.reduce((result: React.ReactNode[], animationDefinition: IAnimationDefinition) => {
                            if(animationDefinition.name) {
                            result.push(
                                <option key={animationDefinition.id} value={animationDefinition.id}>{animationDefinition.name}</option>
                            );
                            }
                            return result;
                        }, [])
                        
                    }
                </select><br/><br/>
            </>
        )
    }, [animationData]);
    const placeAnimations = useCallback(() => {
        const animations = animationEntry.animationDefinitions;
        if(!animations || !animations[breakpoint]){
            return;
        }
        return animations[breakpoint].map((animationDefinitionId: string) => {
            
            const animationDefinition = getAnimationDefinitionById(animationData, animationDefinitionId);

            if(!animationDefinition) {
                return
            }
            return(
                <BlockLine key={animationDefinitionId}>
                    <Button onClick={() => {
                        if(!animationDefinition) {
                            return;
                        }
                        animationDataDispatch({
                            type: AnimationDataActions.setActiveAnimationEntry,
                            activeAnimationEntry: {
                                id: animationEntry.id
                            },
                        });
                        animationDataDispatch({
                            type: AnimationDataActions.setActiveAnimationDefinition,
                            animationDefinitionId: animationDefinition.id
                        });
                        navigationDispatch({
                            type: NavigationActions.setActiveSection,
                            section: Sections.ANIMATION_DEFINITION,
                        });
                    }}>
                        {(animationDefinition && animationDefinition.name)? animationDefinition.name: (animationDefinition && animationDefinition.id)? animationDefinition.id : ''}
                    </Button>
                    <RemoveButtonHolder>
                        <Button onClick={() => {
                            if(!animationDefinition) {
                                return;
                            }
                            animationDataDispatch({
                                type: AnimationDataActions.disconnectAnimationDefinition,
                                definitionId: animationDefinition.id,
                                animationEntryId: animationEntry.id
                            });
                        }}><DeleteLabel>Disconnect</DeleteLabel></Button>
                    </RemoveButtonHolder>
                </BlockLine>
            )
        })
    }, [animationEntry, breakpoint]);
    return (
    <Block>
        <BlockSection>
           <FormInputString  label="id" defaultValue={(animationEntry.name)?animationEntry.name:animationEntry.id} onChange={(event: any) => {
                        animationDataDispatch(
                            {
                                type: AnimationDataActions.addEditAnimationEntry,
                                animationEntry: {
                                    ...animationEntry,
                                    name: event.target.value
                                }
                            }
                        );
            }} /> 
        </BlockSection>
        <BlockSection>
                
                <FormInputString defaultValue={animationEntry.startOffsetPixels} label="Start offsetPixels" onChange={(event: any) => {
                    animationDataDispatch(
                        {
                            type: AnimationDataActions.addEditAnimationEntry,
                            animationEntry: {
                                ...animationEntry,
                                startOffsetPixels: event.target.value
                            }
                        }
                    );
                }} />
                <FormInputString defaultValue={animationEntry.startMs} label="Start milliseconds" onChange={(event: any) => {
                    animationDataDispatch(
                        {
                            type: AnimationDataActions.addEditAnimationEntry,
                            animationEntry: {
                                ...animationEntry,
                                startMs: event.target.value
                            }
                        }
                    );
                }} />
        </BlockSection>
        <BlockSection>
            <BlockHeading>Time based animations</BlockHeading>
            {
                placeConnectAnimation()
            }
            {
                placeAnimations()
            }
            {
                placeAddAnimation()
            }
        </BlockSection>
    </Block>
    )
}
export default BlockAnimationEntry;