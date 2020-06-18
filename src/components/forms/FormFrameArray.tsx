import React, {useState, useEffect, useCallback} from "react";
import {IFrameDef, IFrame, FrameValueTypes, PropTypes, unitMap} from "variojs";
import {useAnimationDataState} from "@context/animation-data/AnimaitonDataContext";
import FormFrame from "@components/forms/FormFrame";
import {uuidv4} from "@helpers/guid";
import {processFrameDef} from "variojs";
import CtaMain from '@components/cta/CtaMain';
import Button from '@components/Button';

export const emptyFrame = (propType: PropTypes, frameValueType:FrameValueTypes): IFrameDef => {
    return {
        id: uuidv4(),
        frameValueType: frameValueType,
        unit: ((unitMap as any)[propType])?(unitMap as any)[propType][0]:undefined,
        valueDef: {
            default:''
        },
    }
};

interface Props {
    onChange: (frames:IFrameDef[]) => void
    frameType?: FrameValueTypes,
    propType: PropTypes,
    frames?: IFrameDef[],
    filterByFrameId?: string
}



const FormFrameNumberArray = ({frames:framesFromProps = [], filterByFrameId, propType, frameType = FrameValueTypes.number, onChange=() => {}}: Props) => {
    const {animationData} = useAnimationDataState();
    const sortFrames = useCallback((frameAToSort: IFrameDef, frameBToSort: IFrameDef) => {
        const frameA: IFrame = processFrameDef(animationData, frameAToSort)
        const frameB: IFrame = processFrameDef(animationData, frameBToSort)
        if((frameA.ms || frameA.ms ===0) && (frameB.ms || frameB.ms===0) && frameA.ms < frameB.ms) {
            return -1;
        }
        if((frameA.px || frameA.px===0) && (frameB.px || frameB.px===0) && frameA.px < frameB.px) {
            return -1;
        }
        return 1;
    }, [animationData])

    const [frames, setFrames] = useState<IFrameDef[]>(framesFromProps.sort(sortFrames));
    const [newFrames, setNewFrames] = useState<IFrameDef[]>([]);

    useEffect(() => {
        onChange([...newFrames, ...frames].sort(sortFrames));
    }, [newFrames, frames]);



    const placeFrames = useCallback((frameDef:IFrameDef[], newAdded:boolean = false) => {
        return frameDef.map((frame:IFrameDef) => {
            if(filterByFrameId && frame.id != filterByFrameId) {
                return;
            }
            return (
                <FormFrame key={frame.id} frameType={frameType} frame={frame as any} 
                    onDelete={(frameChanged: IFrameDef) => {
                        const call = (newAdded)?setNewFrames:setFrames;
                        const frameDef = (newAdded)?newFrames:frames;
                        call(frameDef.reduce((result: IFrameDef[], savedFrame: IFrameDef) => {
                            if(frameChanged.id !== savedFrame.id) {
                                result.push(savedFrame)    
                            }
                            return result;
                        }, []));
                    }} 
                    onChange={(frameChanged: IFrameDef) => {
                        const call = (newAdded)?setNewFrames:setFrames;
                        const frameDef = (newAdded)?newFrames:frames;
                        call(frameDef.map((savedFrame: IFrameDef) => {
                            if(frameChanged.id === savedFrame.id) {
                                return frameChanged;
                            }
                            return savedFrame;
                        }));
                    }} 
                />
            )
        })
    }, [newFrames, frames, filterByFrameId]);

    return (
    <div>
        {
            placeFrames(frames)
        }
        {
            placeFrames(newFrames, true)
        }
        {
            (!filterByFrameId) ?
            <Button onClick={() => {
                setNewFrames([...newFrames, (frameType===FrameValueTypes.number)?emptyFrame(propType, FrameValueTypes.number):emptyFrame(propType, FrameValueTypes.string)])
            }}><CtaMain className="small green">Add frame</CtaMain></Button>:null
        }
        
    </div>
    )
}
export default FormFrameNumberArray