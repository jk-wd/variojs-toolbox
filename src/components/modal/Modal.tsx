import React from "react";
import styled from "styled-components";
import {useModalState} from "@context/modal/ModalContext";


const ModalEl = styled.div`
    z-index: 100000000;
    position:fixed;
    top: 0;
    left: 0;
    display:none;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0255,255,255,0.8);
    align-items:center;
    justify-content:center;
    &.active {
        display: flex;
    }
`;

interface IProps {
    modalId:string
    children:React.ReactNode
}

const Modal = ({modalId, children}:IProps) => {
    const {modal} = useModalState();
    return (
        <ModalEl className={(modal === modalId)?'active':''}>
            {children}
        </ModalEl>
    )
}

export default Modal;