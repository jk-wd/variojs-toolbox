import React from "react";
import styled from "styled-components";

interface IProps {
    children: React.ReactNode
}

const BlockHeadingEl = styled.span`
    display:block;
    font-family: "ProximaNova-Bold";
    font-size:14px;
    line-height:1.6;
`;

const BlockHeading = ({children}: IProps) => {
    return (
    <BlockHeadingEl>
        {children}
    </BlockHeadingEl>
    )
}
export default BlockHeading;