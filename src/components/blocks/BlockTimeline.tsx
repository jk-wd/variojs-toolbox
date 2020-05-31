import React, {useCallback} from "react";
import styled from "styled-components";
import DeleteLabel from "@components/typography/DeleteLabel";
import BlockLine from "@components/block-elements/BlockLine";
import Block from '@components/block-elements/Block';
import BlockHeading from '@components/block-elements/BlockHeading';
import BlockSection from '@components/block-elements/BlockSection';
import Button from '@components/Button';
import {getAnimationEntryById, IAnimationEntry, ITimeline, IBreakpoint} from 'variojs';
import {useAnimationDataDispatch, AnimationDataActions, useAnimationDataState} from "@context/animation-data/AnimaitonDataContext";

interface IProps {
    timeline: ITimeline
    parallax: boolean
}

const RemoveButtonHolder = styled.div`
    float: right;
`;

const BlockTimeline = ({timeline, parallax}: IProps) => {
    const animationDataDispatch = useAnimationDataDispatch();
    const {animationData} = useAnimationDataState();
   
    const placeConnectTimeline = useCallback((breakpoint: string) => {
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
                            breakpoint,
                            animationEntryId: event.target.value,
                            parallax
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
        let breakpoints = (animationData.breakpoints)? animationData.breakpoints: [];
        breakpoints = [...breakpoints, {
            id: 'default',
            order: 0,
            definition: ''
        }]

        if(!animationEntries){
            return;
        }
        return  breakpoints.map((breakpoint: IBreakpoint) => {
            if(!breakpoint) {
                return
            }
            return (
                <div>
                    {breakpoint.id}
                    <br />
                    {placeConnectTimeline(breakpoint.id)}
                    {
                        (animationEntries[breakpoint.id])?
                        animationEntries[breakpoint.id].map((animationEntryId: string) => {
                            console.log("hoi hoi");
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
                                                parallax,
                                            });
                                        }}><DeleteLabel>Disconnect</DeleteLabel></Button>
                                    </RemoveButtonHolder>
                                </BlockLine>
                            )
                        }): null
                    }
                </div>
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