import React, {ChangeEvent, useEffect, createRef} from "react";
import styled from "styled-components";
import FormElementLabel from "@components/form-elements/FormElementLabel";
import {Colors} from "@enums/colors";

interface IProps {
    defaultValue?: string | number,
    disabled?: boolean,
    label?: string,
    numberInput?: boolean,
    unit?: string,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const FormInputStringEl = styled.div`
    position: relative;
    > input {
        padding: 6px;
        font-size: 13px;
        width: 100%;
        background: ${Colors.white};
        border: 1px solid ${Colors.darkGrey};
    }
    &.with-unit > input {
        padding-right: 40px;
    }
`;

const Unit = styled.span`
    display:block;
    position: absolute;
    opacity: 0.6;
    color: ${Colors.darkGrey};
    right: 8px;
    bottom: 5px;
    padding-left: 2px;
`;


const FormInputText = ({defaultValue = "", label = "", numberInput = false, unit, disabled, onChange= () => {}}: IProps) => {
    const inputRef = createRef<HTMLInputElement>();
    
    useEffect(() => {
        if(inputRef.current) {
            inputRef.current.value = ''+defaultValue || '';
        }
    }, [defaultValue]);
    return (
        <FormInputStringEl className={(unit)?"with-unit":""}>
             {
                (label != "")?
                <><FormElementLabel>{label}</FormElementLabel><br /></>
                : null
            }
            <input type={(numberInput)?'number':'text'} ref={inputRef} onChange={onChange} disabled={disabled} defaultValue={defaultValue} />
            {
                (unit)?
                <Unit>{unit}</Unit>:null
            }
        </FormInputStringEl>
    )
}
export default FormInputText;