import React, {ChangeEvent, useEffect, createRef} from "react";
import styled from "styled-components";
import FormElementLabel from "@components/form-elements/FormElementLabel";
import {Colors} from "@enums/colors";

interface IProps {
    defaultValue?: string,
    disabled?: boolean,
    label?: string,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const FormInputStringEl = styled.div`
    > input {
        padding: 6px;
        font-size: 13px;
        width: 100%;
        background: ${Colors.white};
        border: 1px solid ${Colors.darkGrey};
    }
`;

const FormInputString = ({defaultValue = "", label = "", disabled, onChange= () => {}}: IProps) => {
    const inputRef = createRef<HTMLInputElement>();
    
    useEffect(() => {
        if(inputRef.current) {
            inputRef.current.value = defaultValue || '';
        }
    }, [defaultValue]);
    return (
        <FormInputStringEl>
             {
                (label != "")?
                <><FormElementLabel>{label}</FormElementLabel><br /></>
                : null
            }
            <input type='text' ref={inputRef} onChange={onChange} disabled={disabled} defaultValue={defaultValue} />
        </FormInputStringEl>
    )
}
export default FormInputString;