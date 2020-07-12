import React from "react";
import styled from "styled-components";

interface IProps {
    children: React.ReactNode
    className?: string
    onClick?: (event: any) => void
}

const ButtonEl = styled.button`
  border: none;
  padding: 0;
  &.text-align-left {
      text-align: left;
  }
`;

const Button = ({children, className, onClick}: IProps) => {
    return (
    <ButtonEl className={className} onClick={onClick}>
        {children}
    </ButtonEl>
    )
}
export default Button
