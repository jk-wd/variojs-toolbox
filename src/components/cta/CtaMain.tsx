
import React from "react";
import styled from "styled-components";
import {Colors} from "@interfaces/colors";

interface IProps {
    children: React.ReactNode,
    className?: string
}

const CtaMainEl = styled.span`
    display: block;
    font-family: "ProximaNova-Regular";
    background-color: ${Colors.darkGrey};
    padding: 10px 20px;
    font-size: 14px;
    color: ${Colors.white};
    &.small {
        padding: 8px 14px;
        font-size: 12px;
    };
    &.tiny {
        font-family: "ProximaNova-Bold";
        padding: 6px 10px;
        font-size: 10px;
    };
    &.light {
        background-color: ${Colors.softWhite};
        color: ${Colors.darkGrey};
    }
    &.green {
        background-color: ${Colors.freshGreen};
    }
    &.orange {
        background-color: ${Colors.sunnyOrange};
    }
`;

const CtaMain = ({children, className}: IProps) => {
    return (
    <CtaMainEl className={className}>
        {children}
    </CtaMainEl>
    )
}
export default CtaMain
