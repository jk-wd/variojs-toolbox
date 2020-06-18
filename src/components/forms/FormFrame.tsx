import React, {useState, useEffect, useCallback} from "react";
import {IFrameDef, EasingFunctions, IBreakpoint} from "variojs";
import FormLine from "@components/form-elements/FormLine";
import styled from "styled-components";
import FormLineSection from "@components/form-elements/FormLineSection";
import Button from "@components/Button";
import DeleteLabel from "@components/typography/DeleteLabel";
import FormElementLabel from "@components/form-elements/FormElementLabel";
import {useAnimationDataState} from "@context/animation-data/AnimaitonDataContext";
import FormFrameBlock from "@components/form-elements/FormFrameBlock";
import FormInputText from "@components/form-elements/FormInputText";
import {FrameValueTypes, NoBreakpointIdentifier} from "variojs";

interface Props {
    onChange: (frame:IFrameDef) => void,
    onDelete: (frame:IFrameDef) => void,
    frameType?: FrameValueTypes,
    frame: IFrameDef,
}

const BreakpointLabel = styled.div`
    text-align: right;
    font-family: "ProximaNova-Bold";
    font-size: 12px;
    padding-top: 6px;
`


const FormFrameNumber = ({onChange = () => {}, frameType=FrameValueTypes.number, onDelete = () => {}, frame:frameFromProps} : Props) => {
    const [frame, setFrame] = useState<IFrameDef>(frameFromProps);
    const {animationData} = useAnimationDataState();
    const [activeBreakpoints, setActiveBreakpoints] = useState<string[]>(Object.keys(frameFromProps.valueDef || {}));
    const breakpointSelectRef = React.createRef<HTMLSelectElement>();
    let breakpoints = (animationData.breakpoints)?animationData.breakpoints : [];
    breakpoints = [...breakpoints, {
        id: NoBreakpointIdentifier,
        order: 0,
        definition: ''
    }];

    useEffect(() => {
        onChange({
            ...frame,
            frameValueType: frameType
        });
    }, [frame]);

    useEffect(() => {
        if(breakpointSelectRef.current) {
            breakpointSelectRef.current.value = "Add a breakpoint value";
        }
    }, [activeBreakpoints]);

    const placeValueSection = useCallback((breakpoint = NoBreakpointIdentifier, label?:string) => {
        
        return (
            <FormLineSection>
                {
                    <FormInputText 
                    label={label}
                    unit={frame.unit}
                    onChange={(event: any) => {
                        const valueDef = event.target.value;
                        if(valueDef === '' && frame && frame.valueDef && frame.valueDef[breakpoint]) {
                            delete frame.valueDef[breakpoint];
                            setFrame({
                                ...frame
                            });
                            setActiveBreakpoints(activeBreakpoints.filter((activeBreakpoint) => (activeBreakpoint !== breakpoint)))
                        }else if(valueDef) {
                            setFrame({
                                ...frame,
                                valueDef: {
                                    ...frame.valueDef,
                                    [breakpoint]: valueDef
                                }
                            });
                        }
                    }}
                    defaultValue={(frame.valueDef && frame.valueDef[breakpoint])?frame.valueDef[breakpoint]:''} />
                }
                
            </FormLineSection>
        )
    }, [frame]);
 
    return (
        <FormFrameBlock>
            <FormLine>
                <FormLineSection>
                    <FormInputText 
                        label="px"
                        onChange={(event: any) => {
                            const pxDef = event.target.value;
                            if(pxDef) {
                                setFrame({
                                    ...frame,
                                    pxDef
                                });
                            }
                        }}
                        defaultValue={frame.pxDef} />
                       
                </FormLineSection>
                <FormLineSection>
                    <FormInputText 
                            label="ms"
                            onChange={(event: any) => {
                                const msDef = event.target.value;
                                if(msDef) {
                                    setFrame({
                                        ...frame,
                                        msDef
                                    });
                                }
                            }}
                            defaultValue={frame.msDef} />
                </FormLineSection>
                {
                    placeValueSection(NoBreakpointIdentifier, "value")
                }
            </FormLine>
            {
                activeBreakpoints.map((breakpoint:string) => {
                    if(breakpoint === NoBreakpointIdentifier) {
                        return;
                    }
                    return  (
                        <FormLine>
                            <FormLineSection></FormLineSection>
                            <FormLineSection><BreakpointLabel>{breakpoint}</BreakpointLabel></FormLineSection>
                            {
                                placeValueSection(breakpoint)
                            }
                        </FormLine>
                    )
                })
            }
            <FormLine>
                <FormLineSection>
                </FormLineSection>
                <FormLineSection>
                </FormLineSection>
                <FormLineSection>
                    <select ref={breakpointSelectRef} onChange={(event: any) => {
                        if(activeBreakpoints.indexOf(event.target.value) <= 0) {
                            setActiveBreakpoints([...activeBreakpoints, event.target.value]);
                        }
                    }}>
                        <option disabled>Add a breakpoint value</option>
                        {
                            breakpoints.map((breakpoint: IBreakpoint) => {
                                if(breakpoint.id === NoBreakpointIdentifier) {
                                    return;
                                }
                                return <option key={breakpoint.id} value={breakpoint.id}>{breakpoint.id}</option>
                            })
                        }
                    </select>
                </FormLineSection>
            </FormLine>
            <FormLine>
                {
                    (frameType === FrameValueTypes.number)?
                    <FormLineSection>
                        <FormElementLabel>Easing</FormElementLabel><br />
                        <select 
                            value={frame.easing}
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