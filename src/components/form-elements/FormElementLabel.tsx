import React from "react";
import styled from "styled-components";

interface IProps {
    children: React.ReactNode,
    htmlFor?: string,
}

const FormElementLabelEl = styled.label`
    font-size: 12px;
    font-weight: bold;
    line-height:2;
`;

const FormElementLabel = ({children, htmlFor}: IProps) => {
    return (
    <FormElementLabelEl htmlFor={htmlFor}>
        {children}
    </FormElementLabelEl>
    )
}
export default FormElementLabel;