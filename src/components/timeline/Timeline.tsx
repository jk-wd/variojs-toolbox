import React from "react";
import styled from "styled-components";
import { Colors } from '@interfaces/colors';
import TimelineSelect from '@components/timeline/TimelineSelect';

const TimelineEl = styled.div`
  width: 100%;
  height: 30vh;
  position: fixed;
  background-color: ${Colors.lightGrey};
  bottom: 0;
  left: 0;
  overflow: scroll;
`;

const Timeline = () => {
    return (
        <TimelineEl>
            <TimelineSelect />
        </TimelineEl>
    )
}

export default Timeline;