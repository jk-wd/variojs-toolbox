import React, {ChangeEvent} from "react";
import styled from "styled-components";
import FormElementLabel from "@components/form-elements/FormElementLabel";
import {Colors} from "@interfaces/colors";

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
    return (
        <FormInputNumberEl>
            {
                (label != "")?
                <><FormElementLabel>{label}</FormElementLabel><br /></>
                : null
            }
            <input type='number' onChange={onChange} defaultValue={defaultValue} />
        </FormInputNumberEl>
    )
}
export default FormInputNumber;