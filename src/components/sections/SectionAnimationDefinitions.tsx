import React from "react";
import styled from "styled-components";
import DeleteLabel from "@components/typography/DeleteLabel";
import BlockLine from "@components/block-elements/BlockLine";
import { IAnimationDefinition } from 'variojs';
import Button from '@components/Button';
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import {useAnimationDataDispatch, AnimationDataActions, useAnimationDataState} from "@context/animation-data/AnimaitonDataContext";
import {Sections} from "@interfaces/navigation";

const RemoveButtonHolder = styled.div`
    float: right;
`;

const SectionAnimationDefinitions = () => {
    const animationDataDispatch = useAnimationDataDispatch();
    const {animationData} = useAnimationDataState();
    const navigationDispatch = useNavigationDispatch();
    return (
        <div>
            {
                (animationData && animationData.animationDefinitions)?
                    animationData.animationDefinitions.map((animationDefinition: IAnimationDefinition) => {
                        if(!animationDefinition.name) {
                            return null
                        }
                        return(
                            <BlockLine key={animationDefinition.id}>
                                <Button onClick={() => {
                                    if(!animationDefinition) {
                                        return;
                                    }
                                    animationDataDispatch({
                                        type: AnimationDataActions.setActiveAnimationEntry,
                                        activeAnimationEntry: {},
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
                                    {(animationDefinition && animationDefinition.name)? animationDefinition.name: animationDefinition.id}
                                </Button>
                                <RemoveButtonHolder>
                                    <Button onClick={() => {
                                        if(!animationDefinition) {
                                            return;
                                        }
                                        animationDataDispatch({
                                            type: AnimationDataActions.deleteAnimationDefinition,
                                            definitionId: animationDefinition.id,
                                        });
                                    }}><DeleteLabel>Delete</DeleteLabel></Button>
                                </RemoveButtonHolder>
                            </BlockLine>
                        )
                    }): null
            }
        </div>
    )
}
export default SectionAnimationDefinitions;