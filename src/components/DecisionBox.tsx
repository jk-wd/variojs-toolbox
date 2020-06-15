import React from "react";
import styled from "styled-components";
import Button from './Button';
import {Colors} from '@enums/Colors';
import CtaMain from './cta/CtaMain';

interface IProps {
    title: string,
    description: string,
    yesTile: string,
    noTitle: string,
    onClickYes?: () => void
    onClickNo?: () => void
}

const DesicionBoxEl = styled.div`
    border: 1px solid ${Colors.darkGrey};
    background-color: ${Colors.white};
    width: 320px;
    padding: 20px;
    h4 {
        font-family: "ProximaNova-Bold";
        font-size: 16px;
        padding: 0;
        margin: 0;
        line-height: 1;
    }
    p {
        margin-top: 10px;
        margin-bottom: 20px;
    }
    > div {
        display: flex;
        justify-content: space-between;
    }
`;

const DesicionBox = ({yesTile="", noTitle="", title="", description="", onClickYes=()=> {}, onClickNo=()=> {}}: IProps) => {
    return (
    <DesicionBoxEl>
        <h4>{title}</h4>
        <p>{description}</p>
        <div>
            <Button onClick={() => {
                onClickYes();
            }}><CtaMain className="">{yesTile}</CtaMain></Button>
            <Button onClick={() => {
                onClickNo();
            }}><CtaMain className="">{noTitle}</CtaMain></Button>
        </div>
    </DesicionBoxEl>
    )
}
export default DesicionBox
