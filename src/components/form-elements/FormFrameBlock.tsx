import React from "react";
import {Colors} from "@interfaces/colors";
import styled from "styled-components";

interface Props {
    children:React.ReactNode;
}

const FormFrameBlockEl = styled.div`
  background-color:${Colors.grey};
  margin-bottom: 10px;
  padding: 8px;
  padding-bottom: 10px;
  width: 100%;
`;


const FormFrameBlock = ({children}: Props) => {
    return (
    <FormFrameBlockEl>
         {children}
    </FormFrameBlockEl>
    )
}
export default FormFrameBlock