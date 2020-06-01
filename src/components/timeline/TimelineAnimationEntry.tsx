import React from "react";
import styled from "styled-components";
import { IAnimationEntry } from 'variojs/lib/types-interfaces';
import {useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import {Sections} from "@interfaces/navigation";
import Button from "@components/Button";
import TimelineAnimationDefinition from "@components/timeline/TimelineAnimationDefinition";
import { Colors } from '@interfaces/colors';
import { IAnimationConnection } from 'variojs';


interface IProps {
    animationEntry: IAnimationEntry
}
const offsetLeft = 14;
const TimelineAnimationEntryEl = styled.div`
    position: relative;
`;
const Title = styled.span`
    display:block;
    width: ${300}px;
    padding-top: 6px;
    font-size: 15px;
    font-weight: bold;
    background-color: ${Colors.midGrey};
    color: ${Colors.white};
    padding-left: ${offsetLeft}px;
    height: 30px;
    position:relative;
`;

const TimelineAnimationEntry = ({animationEntry}: IProps) => {
    const dispatchNavigation = useNavigationDispatch();
    const dispatchAnimationData = useAnimationDataDispatch();
    return (
        <TimelineAnimationEntryEl>
            <Button className='text-align-left' onClick={() => {
                if(!animationEntry.id) {
                    return
                }
                dispatchAnimationData({
                    type: AnimationDataActions.setActiveAnimationEntry,
                    activeAnimationEntry: {
                        id: animationEntry.id
                    }
                });
                dispatchNavigation({
                    type: NavigationActions.setActiveSection,
                    section: Sections.ANIMATION_ENTRY,
                });
            }}><Title>{animationEntry.name}</Title></Button>
            <>
            {
                (animationEntry.animationConnection)?
                <TimelineAnimationDefinition animationConnection={animationEntry.animationConnection} />
                :null
            }
            </>
            {
                (animationEntry && animationEntry.animationConnections)?
                    animationEntry.animationConnections.map((animationConnection: IAnimationConnection, index:number) => {
                        if(!animationConnection) {
                            return
                        }
                        return (<TimelineAnimationDefinition key={animationConnection.animationDefinitionId +''+ index} animationConnection={animationConnection} />)
                    })
                : null
            }
        </TimelineAnimationEntryEl>
    )
}
export default TimelineAnimationEntry;