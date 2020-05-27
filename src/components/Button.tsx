import React from "react";
import styled from "styled-components";

interface IProps {
    children: React.ReactNode
    onClick?: (event: any) => void
}

const ButtonEl = styled.button`
  border: none;
`;

const Button = ({children, onClick}: IProps) => {
    return (
    <ButtonEl onClick={onClick}>
        {children}
    </ButtonEl>
    )
}
export default Button
