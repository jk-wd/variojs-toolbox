import React, {useState, useEffect} from "react";
import {IFrame, EasingFunctions, IFrameNumber, IFrameString} from "variojs";
import FormLine from "@components/form-elements/FormLine";
import FormLineSection from "@components/form-elements/FormLineSection";
import Button from "@components/Button";
import DeleteLabel from "@components/typography/DeleteLabel";
import FormElementLabel from "@components/form-elements/FormElementLabel";
import FormFrameBlock from "@components/form-elements/FormFrameBlock";
import FormInputNumber from "@components/form-elements/FormInputNumber";
import FormInputString from "@components/form-elements/FormInputString";
import {FrameType} from "@enums/frames";

interface Props {
    onChange: (frame:IFrame) => void,
    onDelete: (frame:IFrame) => void,
    frameType?: FrameType,
    frame: IFrameString | IFrameNumber,
}


const FormFrameNumber = ({onChange = () => {}, frameType=FrameType.NumberFrame,  onDelete = () => {}, frame:frameFromProps} : Props) => {
    const [frame, setFrame] = useState<IFrameString | IFrameNumber>(frameFromProps);

    useEffect(() => {
        onChange(frame);
    }, [frame]);

    return (
        <FormFrameBlock>
            <FormLine>
                <FormLineSection>
                    <FormInputNumber 
                        label="px"
                        onChange={(event: any) => {
                            const value = parseInt(event.target.value);
                            if(value || value === 0) {
                                setFrame({
                                    ...frame,
                                    offsetPixels: value
                                });
                            }
                        }}
                        defaultValue={frame.offsetPixels} />
                       
                </FormLineSection>
                <FormLineSection>
                    <FormInputNumber 
                            label="ms"
                            onChange={(event: any) => {
                                const value = parseInt(event.target.value);
                                if(value || value === 0) {
                                    setFrame({
                                        ...frame,
                                        ms: value
                                    });
                                }
                            }}
                            defaultValue={frame.ms} />
                </FormLineSection>
                <FormLineSection>
                    {
                        (frameType === FrameType.StringFrame)?
                        <FormInputString 
                            label="value"
                            onChange={(event: any) => {
                                const value = event.target.value;
                                if(value || value === 0) {
                                    setFrame({
                                        ...frame,
                                        value
                                    });
                                }
                            }}
                            defaultValue={''+frame.value} />
                        : null
                    }
                    {
                         (frameType === FrameType.NumberFrame)?
                        <FormInputNumber 
                        label="value"
                        onChange={(event: any) => {
                            const value = parseInt(event.target.value);
                            if(value || value === 0) {
                                setFrame({
                                    ...frame,
                                    value
                                });
                            }
                        }}
                        defaultValue={frame.value as number} />:null
                    }
                    
                    
                </FormLineSection>
            </FormLine>
            <FormLine>
                {
                    (frameType === FrameType.NumberFrame)?
                    <FormLineSection>
                        <FormElementLabel>Easing</FormElementLabel><br />
                        <select 
                            value={(frame as IFrameNumber).easing}
                            onChange={
                                (event: any) => {
                                    setFrame({
                                        ...frame,
                                        easing: event.target.value
                                    });
                                }
                            }
                        >
                            {
                                Object.keys(EasingFunctions).map((key:string) => {
                                    return (<option key={key} value={key}>{key}</option>
                                    );
                                })
                            }
                        </select>
                    </FormLineSection>:null
                }
                
                <FormLineSection>
                    <div style={{'float':'right'}}>
                        <Button onClick={
                            () => {
                                onDelete(frame)
                            }
                        }>
                            <div style={{marginTop: "20px"}}>
                                <DeleteLabel>Delete frame</DeleteLabel>
                            </div>
                        </Button>
                    </div>
                    
                </FormLineSection>
            </FormLine>
        </FormFrameBlock>
    )
    
}
export default FormFrameNumber