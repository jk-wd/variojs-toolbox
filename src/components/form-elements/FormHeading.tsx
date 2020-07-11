import React from "react";
import styled from "styled-components";

interface IProps {
    children: React.ReactNode,
    className?: string,
    subHeading?: string,
}

const FormHeadingEl = styled.div`
    margin-top: 20px;
    margin-bottom: 4px;
    line-height: 1.3;
    font-size: 16px;
    font-family: "ProximaNova-Bold";
    &.large {
        font-size: 18px;
    }
    .sub-heading {
        display: block;
        font-size: 14px;
        font-family: "ProximaNova-regular";
    }
`;

const FormHeading = ({children, className, subHeading}: IProps) => {
    return (
    <FormHeadingEl className={className}>
        {children}
        {
            (subHeading)?
            <span className='sub-heading'>{subHeading}</span>:null
        }
    </FormHeadingEl>
    )
}
export default FormHeading;