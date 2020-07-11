import React, {ChangeEvent, useEffect, useCallback, createRef} from "react";
import styled from "styled-components";
import FormElementLabel from "@components/form-elements/FormElementLabel";
import {Colors} from "@enums/colors";

const debounce = (fn:Function, time:number) => {
    let timeout:any;
  
    return function() {
        //@ts-ignore
      const functionCall = () => fn.apply(this, arguments);
      
      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
    }
  }

interface IProps {
    defaultValue?: string | number,
    disabled?: boolean,
    label?: string,
    debounceChange?: boolean,
    subLabel?: string,
    id?: string,
    numberInput?: boolean,
    unit?: string,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const FormInputStringEl = styled.div`
    position: relative;
    div > input {
        box-sizing:border-box;
        padding: 6px;
        font-size: 13px;
        width: 100%;
        background: ${Colors.white};
        border: 1px solid ${Colors.darkGrey};
    }
    &.with-unit div > input {
        padding-right: 40px;
    }
`;

const Unit = styled.span`
    display:block;
    position: absolute;
    opacity: 0.6;
    color: ${Colors.darkGrey};
    right: 8px;
    top: 5px;
    padding-left: 2px;
`;
const SubLabel = styled.span`
    display:block;
    padding: 4px 0 0 6px;
    font-size: 10px;
    color: ${Colors.darkGrey};
`;



const FormInputText = ({defaultValue = "", label = "",subLabel, debounceChange = true, id, numberInput = false, unit, disabled, onChange= () => {}}: IProps) => {
    const inputRef = createRef<HTMLInputElement>();

    const onChangeDebounced = useCallback(debounce((event:any) => {
        onChange(event);
    }, 500), [onChange]);

    useEffect(() => {
        if(inputRef.current) {
            inputRef.current.value = ''+defaultValue || '';
        }
    }, [defaultValue]);
    return (
        <FormInputStringEl  className={(unit)?"with-unit":""}>
             {
                (label != "")?
                <><FormElementLabel>{label}</FormElementLabel><br /></>
                : null
            }
            <div style={{position:'relative'}}>
            <input id={id} type={(numberInput)?'number':'text'} ref={inputRef} onChange={(event:any)=> {
                event.persist();
                if(!debounceChange) {
                    onChange(event);
                    return;
                }
                //@ts-ignore
                onChangeDebounced(event);
            }} disabled={disabled} defaultValue={defaultValue} />
            {
                (unit)?
                <Unit>{unit}</Unit>:null
            }
            </div>
           
            {
                (subLabel && subLabel !== defaultValue)?
            <SubLabel>{subLabel}</SubLabel>:null
            }
        </FormInputStringEl>
    )
}
export default FormInputText;