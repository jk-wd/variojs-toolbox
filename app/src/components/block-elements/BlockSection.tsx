import React from "react";
import styled from "styled-components";

interface IProps {
    children: React.ReactNode
}

const BlockSectionEl = styled.span`
    margin-bottom: 6px;
    display:block;
`;

const BlockSection = ({children}: IProps) => {
    return (
    <BlockSectionEl>
        {children}
    </BlockSectionEl>
    )
}
export default BlockSection;