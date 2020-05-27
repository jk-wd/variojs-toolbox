import React, {useCallback} from "react";
import styled from "styled-components";
import DeleteLabel from "@components/typography/DeleteLabel";
import BlockLine from "@components/block-elements/BlockLine";
import Block from '@components/block-elements/Block';
import BlockHeading from '@components/block-elements/BlockHeading';
import BlockSection from '@components/block-elements/BlockSection';
import Button from '@components/Button';
import {getAnimationEntryById, IAnimationEntry, IParallaxTimeline} from 'variojs';
import {useAnimationDataDispatch, AnimationDataActions, useAnimationDataState} from "@context/animation-data/AnimaitonDataContext";

interface IProps {
    timeline: IParallaxTimeline
}

const RemoveButtonHolder = styled.div`
    float: right;
`;

const BlockParallaxTimeline = ({timeline}: IProps) => {
    const animationDataDispatch = useAnimationDataDispatch();
    const {animationData} = useAnimationDataState();
   
    const placeConnectTimeline = useCallback(() => {
        if(!animationData || !animationData.animationEntries) {
            return
        }
        return (
            <>
                <select onChange={
                    (event:any) => {
                        animationDataDispatch({
                            type: AnimationDataActions.connectAnimationEntryToTimeline,
                            timelineId: timeline.id,
                            animationEntryId: event.target.value,
                            parallax:true
                        });
                    }
                }>
                    <option selected disabled>Connect animation entry</option>
                    {
                        animationData.animationEntries.reduce((result: React.ReactNode[], animationEntry: IAnimationEntry) => {
                            if(animationEntry.id) {
                            result.push(
                                <option key={animationEntry.id} value={animationEntry.id}>{(animationEntry.name)?animationEntry.name:animationEntry.id}</option>
                            );
                            }
                            return result;
                        }, [])
                        
                    }
                </select><br/><br/>
            </>
        )
    }, [animationData]);
    const placeAnimationEntries = useCallback(() => {
        const animationEntries = timeline.animationEntries;

        if(!animationEntries){
            return;
        }
        return animationEntries.map((animationEntryId: string) => {
            const animationEntry = getAnimationEntryById(animationData, animationEntryId);
            const id = (animationEntry && animationEntry.id)?animationEntry.id:null;
            return(
                <BlockLine key={animationEntryId}>
                    
                    {(animationEntry && animationEntry.name)?animationEntry.name:id}
                    <RemoveButtonHolder>
                        <Button onClick={() => {
                            animationDataDispatch({
                                type: AnimationDataActions.disconnectAnimationEntryFromTimeline,
                                timelineId: timeline.id,
                                animationEntryId,
                                parallax:true
                            });
                        }}><DeleteLabel>Disconnect</DeleteLabel></Button>
                    </RemoveButtonHolder>
                </BlockLine>
            )
        })
    }, [timeline]);
    return (
    <Block>
        <BlockSection>
            <BlockHeading>id</BlockHeading>
            <span>{timeline.id}</span>
        </BlockSection>
        

        <BlockSection>
            <BlockHeading>Animation entries</BlockHeading>
            {
                placeConnectTimeline()
            }
            {
                placeAnimationEntries()
            }
        </BlockSection>
        <BlockSection>
            {
                (timeline.id !== 'main')?
                    <Button onClick={
                        () => {
                            animationDataDispatch({
                                type: AnimationDataActions.removeTimeline,
                                id: timeline.id,
                                parallax:true
                            });
                        }
                    }><DeleteLabel>Delete</DeleteLabel></Button>
                :null
            }
        </BlockSection>
    </Block>
    )
}
export default BlockParallaxTimeline;