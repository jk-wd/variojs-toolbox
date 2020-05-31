import React from "react";
import styled from "styled-components";
import { IAnimationEntry } from 'variojs/lib/types-interfaces';
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
    return (
        <TimelineAnimationEntryEl>
            <Title>{animationEntry.name}</Title>
            <>
            {
                (animationEntry.animationConnection)?
                <TimelineAnimationDefinition animationConnection={animationEntry.animationConnection} />
                :null
            }
            </>
            {
                (animationEntry && animationEntry.animationConnections)?
                    animationEntry.animationConnections.map((animationConnection: IAnimationConnection) => {
                        if(!animationConnection) {
                            return
                        }
                        return (<TimelineAnimationDefinition animationConnection={animationConnection} />)
                    })
                : null
            }
        </TimelineAnimationEntryEl>
    )
}
export default TimelineAnimationEntry;