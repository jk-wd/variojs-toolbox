import React from "react";
import styled from "styled-components";

interface Props {
    children:React.ReactNode;
}

const FormLineEl = styled.div`
  width: 100%;
  padding-bottom: 7px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;


const FormLine = ({children}: Props) => {
    return (
    <FormLineEl>
         {children}
    </FormLineEl>
    )
}
export default FormLine