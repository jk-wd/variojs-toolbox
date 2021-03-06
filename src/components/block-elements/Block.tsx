import React from "react";
import styled from "styled-components";
import {Colors} from "@enums/colors";

interface IProps {
    children: React.ReactNode
}

const BlockEl = styled.div`
  background-color: ${Colors.lightGrey};
  padding: 10px;
  margin: 10px 0;
`;

const Block = ({children}: IProps) => {
    return (
    <BlockEl>
        {children}
    </BlockEl>
    )
}
export default Block;