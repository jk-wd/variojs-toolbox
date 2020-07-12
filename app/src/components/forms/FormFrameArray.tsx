import React, {useState, useEffect, useCallback} from "react";
import {IFrameDef, IFrame, FrameValueTypes, PropTypes, unitMap, NoBreakpointIdentifier, Units} from "variojs";
import {useAnimationDataState, useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import FormLabel from "@components/form-elements/FormLabel";
import styled from "styled-components";
import FormFrame from "@components/forms/FormFrame";
import {useSiteState} from "@context/sites/SiteContext";
import {uuidv4} from "variojs";
import {processFrameDef} from "variojs";
import CtaMain from '@components/cta/CtaMain';
import Button from '@components/Button';
import { ISite } from '@interfaces/site';


export const emptyFrame = (frameValueType:FrameValueTypes, unit: Units): IFrameDef => {
    return {
        id: uuidv4(),
        frameValueType: frameValueType,
        unit,
        valueDef: {
            [NoBreakpointIdentifier]:''
        },
    }
};

interface Props {
    onChange: (frames:IFrameDef[]) => void
    frameValueType?: FrameValueTypes,
    frameType?: string,
    propType: PropTypes,
    frames?: IFrameDef[],
    filterByFrameId?: string
    animationDefinitionId?: string
}

const UsePercentual = styled.div`
    float: right;
`;

const UnitSelect = styled.div`
    float: right;
    margin-left: 12px;
`;



let newFrames:string[] = [];

const FormFrameNumberArray = ({frames:framesFromProps = [], filterByFrameId, propType, frameType="", animationDefinitionId = "", frameValueType = FrameValueTypes.number, onChange=() => {}}: Props) => {
    const foundPercentValue =  framesFromProps.find((frame:IFrameDef) => (!!frame.percentDef));
    const {animationData} = useAnimationDataState();
    const {sites} = useSiteState();
    const activeSite = sites.find((site: ISite) => (site.active));
    const url = (activeSite)?activeSite.url:undefined;
    const animationDataDispatch = useAnimationDataDispatch();
    const numbers = (activeSite && activeSite.numbers)?activeSite.numbers:{};
    const animationDataNumbers = (animationData && animationData.numbers)?animationData.numbers:{};
    const [usePercentual, setUsePercentual] = useState<boolean>(!!foundPercentValue);
    const sortFrames = useCallback((frameAToSort: IFrameDef, frameBToSort: IFrameDef) => {
        const frameA: IFrame = processFrameDef(animationData, frameAToSort, numbers, animationDataNumbers)
        const frameB: IFrame = processFrameDef(animationData, frameBToSort, numbers, animationDataNumbers)

        if((frameA.ms || frameA.ms ===0) && (frameB.ms || frameB.ms===0) && frameA.ms < frameB.ms) {
            return -1;
        }
        if((frameA.px || frameA.px===0) && (frameB.px || frameB.px===0) && frameA.px < frameB.px) {
            return -1;
        }
        return 1;
    }, [animationData, numbers, animationDataNumbers])

    const [frames, setFrames] = useState<IFrameDef[]>(framesFromProps.sort(sortFrames));


    const getUnitFromFirstFrame = useCallback(() => {
        if(frames && frames.length > 0) {
            return frames[0].unit;
        }
        return (unitMap as any)[propType][0];
    }, [propType, frames]);

    const [unit, setUnit] = useState<Units>(getUnitFromFirstFrame());

 
    const placeUnitSelect = useCallback((key:string, unit: string) => {
        const units = (unitMap as any)[key];
        if(!units || units.length <= 0) {
            return null;
        }

        return (
            <select defaultValue={unit} onChange={
                (event: any) => {
                    setUnit(event.target.value);
                    if(animationDefinitionId) {

                        for(let frame of frames) {

                            animationDataDispatch(
                                {
                                    type: AnimationDataActions.editFrame,
                                    animationDefinitionId,
                                    propType,
                                    frame: {
                                        ...frame,
                                        unit: event.target.value
                                    }
                                }
                            );
    
                        }
                       
                        animationDataDispatch({
                            type: AnimationDataActions.syncAnimationData,
                            url
                        })
                    }
                    
                }
            }>
                {units.map((unit:string) => {
                    return <option value={unit} key={unit}>{unit}</option>
                })}
            </select>
        )
    }, [animationDefinitionId, frames]);
    


    const sortFramesForPlacement = useCallback((frameAToSort: IFrameDef, frameBToSort: IFrameDef) => {
        if(newFrames.indexOf(frameAToSort.id) > -1) {
            return 1;
        }
       return sortFrames(frameAToSort, frameBToSort);
    }, [animationData, newFrames])
    

    
    

    useEffect(() => {
        onChange([...frames].sort(sortFrames));
    }, [frames]);

    useEffect(() => {
        newFrames = [];
    }, []);


    const placeFrames = useCallback((frameDef:IFrameDef[]) => {
        return JSON.parse(JSON.stringify(frameDef)).sort(sortFramesForPlacement).map((frame:IFrameDef) => {
            if(filterByFrameId && frame.id != filterByFrameId) {
                return;
            }
            return (
                <FormFrame usePercentual={usePercentual} key={frame.id} frameType={frameType} frameValueType={frameValueType} frame={frame as any} 
                    onDelete={(frameChanged: IFrameDef) => {
                        setFrames(frames.reduce((result: IFrameDef[], savedFrame: IFrameDef) => {
                            if(frameChanged.id !== savedFrame.id) {
                                result.push(savedFrame)    
                            }
                            return result;
                        }, []));
                    }} 
                    onChange={(frameChanged: IFrameDef) => {
                        setFrames(frames.map((savedFrame: IFrameDef) => {
                            if(frameChanged.id === savedFrame.id) {
                                return frameChanged;
                            }
                            return savedFrame;
                        }));
                    }} 
                />
            )
        })
    }, [newFrames, usePercentual, frames, filterByFrameId]);

    return (
    <div>

        <FormLabel className="line">{frameType}
            <UnitSelect>
                <FormLabel className="small">Unit</FormLabel>{placeUnitSelect(frameType, unit)}
            </UnitSelect>
            <UsePercentual>
                <FormLabel className="small">Use percentual time</FormLabel>
                        <input
                            name="usePercentual"
                            type="checkbox"
                            checked={usePercentual}
                            onChange={(event: any) => {
                                setUsePercentual(event.target.checked);
                            }} />
            </UsePercentual>
        </FormLabel>
        {
            placeFrames(frames)
        }
        {
            (!filterByFrameId) ?
            <Button onClick={() => {
                const newFrame = (frameValueType===FrameValueTypes.number)?emptyFrame(FrameValueTypes.number, unit):emptyFrame(FrameValueTypes.string, unit);
                newFrames = [...newFrames, newFrame.id];
                setFrames([...frames, newFrame]);
            }}><CtaMain className="small green">Add frame</CtaMain></Button>:null
        }
        
    </div>
    )
}
export default FormFrameNumberArray