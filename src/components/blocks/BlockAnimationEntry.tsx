import React, {useCallback} from "react";
import {uuidv4} from "variojs";
import styled from "styled-components";
import DeleteLabel from "@components/typography/DeleteLabel";
import BlockLine from "@components/block-elements/BlockLine";
import { IAnimationEntry, IAnimationConnection } from 'variojs/lib/types-interfaces';
import Block from '@components/block-elements/Block';
import BlockHeading from '@components/block-elements/BlockHeading';
import BlockSection from '@components/block-elements/BlockSection';
import FormInputText from '@components/form-elements/FormInputText';
import Button from '@components/Button';
import CtaMain from '@components/cta/CtaMain';
import {getAnimationDefinitionById, IAnimationDefinition} from 'variojs';
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import {useAnimationDataDispatch, AnimationDataActions, useAnimationDataState} from "@context/animation-data/AnimaitonDataContext";
import {Sections} from "@enums/navigation";

interface IProps {
    animationEntry: IAnimationEntry
}

const RemoveButtonHolder = styled.div`
    float: right;
`;

const BlockAnimationEntry = ({animationEntry}: IProps) => {
    const animationDataDispatch = useAnimationDataDispatch();
    const {animationData} = useAnimationDataState();

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
                        type: AnimationDataActions.addAnimationDefinition,
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
    }, [animationData, animationEntry]);
    const placeConnectAnimation = useCallback(() => {
        if(!animationData || !animationData.animationDefinitions) {
            return
        }
        return (
            <>
                <select onChange={
                    (event:any) => {
                        animationDataDispatch({
                            type: AnimationDataActions.addAnimationEntryConnection,
                            animationConnection: {
                                animationDefinitionId: event.target.value
                            },
                            animationEntryId: animationEntry.id,
                            local: false
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
    }, [animationData, animationEntry]);
    const placeAnimation = useCallback((animationConnection:IAnimationConnection, animationDefinition:IAnimationDefinition) => {
        let title = (animationDefinition && animationDefinition.name)? animationDefinition.name: (animationDefinition && animationDefinition.id)? animationDefinition.id : '';
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
        <>
            <RemoveButtonHolder>
                <Button onClick={() => {
                    if(!animationDefinition) {
                        return;
                    }
                    animationDataDispatch({
                        type: AnimationDataActions.deleteAnimationEntryConnection,
                        animationDefinitionId: animationDefinition.id,
                        animationEntryId: animationEntry.id,
                        local: false
                    });
                }}><DeleteLabel>Disconnect</DeleteLabel></Button>
            </RemoveButtonHolder>

            <br />
            <FormInputText defaultValue={animationConnection.startPx} label="Start px" onChange={(event: any) => {
                animationDataDispatch(
                    {
                        type: AnimationDataActions.editAnimationEntryConnection,
                        animationEntryId: animationEntry.id,
                        animationConnection: {
                            ...animationConnection,
                            startPx: event.target.value
                        },
                        local: false
                    }
                );
            }} />
            <FormInputText defaultValue={animationConnection.startMs} label="Start milliseconds" onChange={(event: any) => {
                animationDataDispatch(
                    {
                        type: AnimationDataActions.editAnimationEntryConnection,
                        animationEntryId: animationEntry.id,
                        animationConnection: {
                            ...animationConnection,
                            startMs: event.target.value
                        },
                        local: false
                    }
                );
            }} />
        </>
        
    </BlockLine>
       )
    }, [animationData, animationEntry])
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
    }, [animationData, animationEntry]);
    return (
    <Block>
        <BlockSection>
           <FormInputText label="name" defaultValue={(animationEntry.name)?animationEntry.name:animationEntry.id} onChange={(event: any) => {
                        animationDataDispatch(
                            {
                                type: AnimationDataActions.editAnimationEntry,
                                animationEntry: {
                                    ...animationEntry,
                                    name: event.target.value
                                }
                            }
                        );
            }} /> <br/>
            {animationEntry.domReference}
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