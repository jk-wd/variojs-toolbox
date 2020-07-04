import React from "react";
import styled from "styled-components";
import {Colors} from "@enums/colors";

interface Props {
    children: React.ReactNode
}

const PanelEl = styled.div`
  z-index:1;
  position: fixed;
  width: 26vw;
  padding: 0 10px;
  top:0;
  left:0;
  height: 65vh;
  max-height: 100vh;
  overflow: auto;
  background: ${Colors.white};
`;


const Panel = ({children}: Props) => {
    return (
        <PanelEl>
            {children}
        </PanelEl>
    )
}

export default Panel;