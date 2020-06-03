import React from "react";
import styled from "styled-components";

interface IProps {
    children: React.ReactNode,
    className?: string,
    htmlFor?: string,
}

const FormLabelEl = styled.label`
    font-family: "ProximaNova-Bold";
    font-size: 16px;
    line-height:2;
    margin-top: '20px';
    margin-bottom: '10px';
    &.small {
        font-size: 14px;
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