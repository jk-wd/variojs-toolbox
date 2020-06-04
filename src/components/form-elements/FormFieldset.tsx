import React from "react";
import styled from "styled-components";

interface IProps {
    children: React.ReactNode
}

const FormFieldsetEl = styled.fieldset`
    display:block;
    margin: 0;
    padding: 0;
    margin-bottom:10px;
    border: none;
`;

const FormFieldset = ({children}: IProps) => {
    return (
    <FormFieldsetEl>
        {children}
    </FormFieldsetEl>
    )
}
export default FormFieldset;