import React from "react";
import styled from "styled-components";

interface Props {
    children:React.ReactNode;
}

const FormLineSectionEl = styled.div`
  width: 100%;
  padding-right: 10px;
`;


const FormLineSection = ({children}: Props) => {
    return (
    <FormLineSectionEl>
         {children}
    </FormLineSectionEl>
    )
}
export default FormLineSection