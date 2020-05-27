import React from "react";
import styled from "styled-components";
import { Colors } from '@interfaces/colors';

interface IProps {
    children: React.ReactNode
}

const BlockLineEl = styled.span`
    margin-bottom: 6px;
    display:block;
    margin: 6px 0;
    border: 1px solid ${Colors.darkGrey};
    padding: 6px 10px 8px 10px;
    background-color: ${Colors.white};
    > button {
        font-size: 14px;
        text-decoration: underline;
    }
`;

const BlockLine = ({children}: IProps) => {
    return (
    <BlockLineEl>
        {children}
    </BlockLineEl>
    )
}
export default BlockLine;