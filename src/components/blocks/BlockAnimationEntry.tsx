import React, {useCallback} from "react";
import {uuidv4} from "@helpers/guid";
import styled from "styled-components";
import DeleteLabel from "@components/typography/DeleteLabel";
import BlockLine from "@components/block-elements/BlockLine";
import { IAnimationEntry, IAnimationConnection } from 'variojs/lib/types-interfaces';
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
    const {animationData} = useAnimationDataState();
    let animationDefinition;
    if(animationEntry.animationConnection && animationEntry.animationConnection.animationDefinitionId) {
        animationDefinition = getAnimationDefinitionById(animationData, animationEntry.animationConnection.animationDefinitionId);
    }
    
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
                        type: AnimationDataActions.addEditAnimationDefinition,
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
                            type: AnimationDataActions.connectAnimationDefinitionToEntry,
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
                </select><br/>
            </>
        )
    }, [animationData]);
    const placeAnimation = useCallback((animationConnection:IAnimationConnection, animationDefinition:IAnimationDefinition, privateConneciton:boolean = false) => {
        let title = (animationDefinition && animationDefinition.name)? animationDefinition.name: (animationDefinition && animationDefinition.id)? animationDefinition.id : '';
        if(privateConneciton) {
            title = 'Go to animation definition'
        }
       return (
        <BlockLine key={animationConnection.animationDefinitionId}>
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
            {title}
        </Button>
        {(!privateConneciton)?
        <>
            <RemoveButtonHolder>
                <Button onClick={() => {
                    if(!animationDefinition) {
                        return;
                    }
                    animationDataDispatch({
                        type: AnimationDataActions.disconnectAnimationDefinitionFromEntry,
                        definitionId: animationDefinition.id,
                        animationEntryId: animationEntry.id
                    });
                }}><DeleteLabel>Disconnect</DeleteLabel></Button>
            </RemoveButtonHolder>

            <br />
            <FormInputString defaultValue={animationConnection.startOffsetPixels} label="Start offsetPixels" onChange={(event: any) => {
                animationDataDispatch(
                    {
                        type: AnimationDataActions.addEditAnimationEntryConnection,
                        animationEntryId: animationEntry.id,
                        conneciton: {
                            ...animationConnection,
                            startOffsetPixels: event.target.value
                        },
                        privateConnection: false
                    }
                );
            }} />
            <FormInputString defaultValue={animationConnection.startMs} label="Start milliseconds" onChange={(event: any) => {
                animationDataDispatch(
                    {
                        type: AnimationDataActions.addEditAnimationEntryConnection,
                        animationEntryId: animationEntry.id,
                        conneciton: {
                            ...animationConnection,
                            startMs: event.target.value
                        },
                        privateConnection: false
                    }
                );
            }} />
        </>:null
        }
        
    </BlockLine>
       )
    }, [])
    const placeAnimations = useCallback(() => {
        const animationConnections = animationEntry.animationConnections;
        if(!animationConnections){
            return;
        }
        return animationConnections.map((animationConnection: IAnimationConnection) => {
            
            const animationDefinition = getAnimationDefinitionById(animationData, animationConnection.animationDefinitionId);

            if(!animationDefinition) {
                return
            }
            return placeAnimation(animationConnection, animationDefinition);
        })
    }, [animationEntry]);
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
            {
                (animationDefinition)? 
                    placeAnimation(animationEntry.animationConnection, animationDefinition, true)
                : null
            }
        </BlockSection>
        <BlockSection>
            <BlockHeading>Connected animation definitions</BlockHeading>
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