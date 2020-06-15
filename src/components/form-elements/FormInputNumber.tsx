import React, {ChangeEvent, createRef, useEffect} from "react";
import styled from "styled-components";
import FormElementLabel from "@components/form-elements/FormElementLabel";
import {Colors} from "@enums/colors";

interface IProps {
    defaultValue?: number,
    label?: string,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const FormInputNumberEl = styled.div`
    > input {
        padding: 6px;
        font-size: 13px;
        width: 100%;
        background: ${Colors.white};
        border: 1px solid ${Colors.darkGrey};
    }
`;

const FormInputNumber = ({defaultValue, label = "", onChange= () => {}}: IProps) => {
    const inputRef = createRef<HTMLInputElement>();
    
    useEffect(() => {
        if(inputRef.current) {
            inputRef.current.value = (defaultValue || defaultValue === 0)?''+defaultValue:'';
        }
    }, [defaultValue]);
    return (
        <FormInputNumberEl>
            {
                (label != "")?
                <><FormElementLabel>{label}</FormElementLabel><br /></>
                : null
            }
            <input type='number' ref={inputRef} onChange={onChange} defaultValue={defaultValue} />
        </FormInputNumberEl>
    )
}
export default FormInputNumber;