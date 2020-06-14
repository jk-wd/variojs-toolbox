import React, {useState, useEffect, useCallback} from "react";
import {IFrame, IFrameString, IFrameNumber} from "variojs";
import FormFrame from "@components/forms/FormFrame";
import {uuidv4} from "@helpers/guid";
import {FrameType} from "@interfaces/frames";
import CtaMain from '@components/cta/CtaMain';
import Button from '@components/Button';

export const emptyFrameNumber = (): IFrameNumber => {
    return {
        id: uuidv4(),
        value: 0,
    }
};

export const emptyFrameString = (): IFrameString => {
    return {
        id: uuidv4(),
        value: '',
    }
};


interface Props {
    onChange: (frames:IFrame[]) => void
    frameType?: FrameType,
    frames?: IFrame[],
    filterByFrameId?: string
}

const sortFrames = (frameA: IFrame, frameB: IFrame) => {
    if((frameA.ms || frameA.ms ===0) && (frameB.ms || frameB.ms===0) && frameA.ms < frameB.ms) {
        return -1;
    }
    if((frameA.offsetPixels || frameA.offsetPixels===0) && (frameB.offsetPixels || frameB.offsetPixels===0) && frameA.offsetPixels < frameB.offsetPixels) {
        return -1;
    }
    return 1;
}

const FormFrameNumberArray = ({frames:framesFromProps = [], filterByFrameId, frameType = FrameType.NumberFrame, onChange=() => {}}: Props) => {
    const [frames, setFrames] = useState<IFrame[]>(framesFromProps.sort(sortFrames));
    const [newFrames, setNewFrames] = useState<IFrame[]>([]);

    useEffect(() => {
        onChange([...newFrames, ...frames].sort(sortFrames));
    }, [newFrames, frames]);

    const placeFrames = useCallback((frameSet:IFrame[], newAdded:boolean = false) => {
        return frameSet.map((frame:IFrame) => {
            if(filterByFrameId && frame.id != filterByFrameId) {
                return;
            }
            return (
                <FormFrame key={frame.id} frameType={frameType} frame={frame as any} 
                    onDelete={(frameChanged: IFrame) => {
                        const call = (newAdded)?setNewFrames:setFrames;
                        const frameSet = (newAdded)?newFrames:frames;
                        call(frameSet.reduce((result: IFrame[], savedFrame: IFrame) => {
                            if(frameChanged.id !== savedFrame.id) {
                                result.push(savedFrame)    
                            }
                            return result;
                        }, []));
                    }} 
                    onChange={(frameChanged: IFrame) => {
                        const call = (newAdded)?setNewFrames:setFrames;
                        const frameSet = (newAdded)?newFrames:frames;
                        call(frameSet.map((savedFrame: IFrame) => {
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
                setNewFrames([...newFrames, (frameType===FrameType.NumberFrame)?emptyFrameNumber():emptyFrameString()])
            }}><CtaMain className="small green">Add frame</CtaMain></Button>:null
        }
        
    </div>
    )
}
export default FormFrameNumberArray