import React from "react";
import styled from "styled-components";
import {Colors} from "@interfaces/colors";

interface Props {
    children: React.ReactNode
}

const PanelEl = styled.div`
  z-index:1;
  position: fixed;
  padding: 0 10px;
  top:0;
  left:0;
  width: 100%;
  min-width: 320px;
  max-width: 620px;
  height: 65vh;
  border-right: 1px solid ${Colors.darkGrey};
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