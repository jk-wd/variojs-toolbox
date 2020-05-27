import React, {useCallback} from "react";
import styled from "styled-components";
import DeleteLabel from "@components/typography/DeleteLabel";
import BlockLine from "@components/block-elements/BlockLine";
import Block from '@components/block-elements/Block';
import BlockHeading from '@components/block-elements/BlockHeading';
import BlockSection from '@components/block-elements/BlockSection';
import Button from '@components/Button';
import {getAnimationEntryById, IAnimationEntry, ITimeline} from 'variojs';
import {useAnimationDataDispatch, AnimationDataActions, useAnimationDataState} from "@context/animation-data/AnimaitonDataContext";

interface IProps {
    timeline: ITimeline
}

const RemoveButtonHolder = styled.div`
    float: right;
`;

const BlockTimeline = ({timeline}: IProps) => {
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
                            parallax: false
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
            if(!animationEntry) {
                return
            }
            return(
                <BlockLine key={animationEntryId}>
                    
                    {(animationEntry.name)?animationEntry.name:animationEntry.id}
                    <RemoveButtonHolder>
                        <Button onClick={() => {
                            animationDataDispatch({
                                type: AnimationDataActions.disconnectAnimationEntryFromTimeline,
                                timelineId: timeline.id,
                                animationEntryId,
                                parallax: false,
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
            <BlockHeading>Animation Entries</BlockHeading>
            {
                placeConnectTimeline()
            }
            {
                placeAnimationEntries()
            }
        </BlockSection>
        <BlockSection>
            <BlockHeading>loop</BlockHeading>
            <input checked={timeline.loop} type="checkbox" onChange={
                (event) => {
                    animationDataDispatch({
                        type: AnimationDataActions.editTimeline,
                        timeline: {
                            ...timeline,
                            loop: (event.target.value === 'on')
                        },
                    });
                }
            } />
        </BlockSection>
        <BlockSection>
            {
                (timeline.id !== 'main')?
                    <Button onClick={
                        () => {
                            animationDataDispatch({
                                type: AnimationDataActions.removeTimeline,
                                id: timeline.id,
                                parallax: false
                            });
                        }
                    }><DeleteLabel>Delete</DeleteLabel></Button>
                :null
            }
        </BlockSection>
    </Block>
    )
}
export default BlockTimeline;