import React from "react";
import styled from "styled-components";

interface IProps {
    children: React.ReactNode
}

const FormHeadingEl = styled.div`
    margin-top: 20px;
    margin-bottom: 10px;
`;

const FormHeading = ({children}: IProps) => {
    return (
    <FormHeadingEl>
        {children}
    </FormHeadingEl>
    )
}
export default FormHeading;