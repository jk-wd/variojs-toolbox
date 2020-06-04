import React from "react";
import styled from "styled-components";
import { Colors } from '@interfaces/colors';

interface IProps {
    children: React.ReactNode,
    className?: string,
    htmlFor?: string,
}

const FormLabelEl = styled.label`
    font-family: "ProximaNova-Bold";
    font-size: 14px;
    line-height:2;
    margin-top: 20px;
    margin-bottom: 0;
    &.small {
        font-size: 13px;
        line-height: 1.2
    }
    &.line {
        display: block;
        padding: 4px 8px;
        margin-bottom: 8px;
        background-color: ${Colors.darkGrey};
        color: ${Colors.white};
    }
`;

const FormLabel = ({children, htmlFor, className=""}: IProps) => {
    return (
    <FormLabelEl className={className} htmlFor={htmlFor}>
        {children}
    </FormLabelEl>
    )
}
export default FormLabel;