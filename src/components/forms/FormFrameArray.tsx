import React, {useState, useEffect} from "react";
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
    frames?: IFrame[]
}

const sortFrames = (frameA: IFrame, frameB: IFrame) => {
    if(frameA.ms && frameB.ms && frameA.ms < frameB.ms) {
        return -1;
    }
    if((frameA.offsetPixels || frameA.offsetPixels===0) && (frameB.offsetPixels || frameB.offsetPixels===0) && frameA.offsetPixels < frameB.offsetPixels) {
        return -1;
    }
    return 1;
}

const FormFrameNumberArray = ({frames:framesFromProps = [], frameType = FrameType.NumberFrame, onChange=() => {}}: Props) => {
    const [frames, setFrames] = useState<IFrame[]>(framesFromProps);
    const sortedFrames = frames.sort(sortFrames);
    useEffect(() => {
        onChange(frames);
    }, [frames]);

    return (
    <div>
        {
            sortedFrames.map((frame:IFrame) => {
                console.log(frame);
                return (
                    <FormFrame key={frame.id} frameType={frameType} frame={frame as any} 
                        onDelete={(frameChanged: IFrame) => {
                            setFrames(frames.reduce((result: IFrame[], savedFrame: IFrame) => {
                                if(frameChanged.id !== savedFrame.id) {
                                    result.push(savedFrame)    
                                }
                                return result;
                            }, []));
                        }} 
                        onChange={(frameChanged: IFrame) => {
                            setFrames(frames.map((savedFrame: IFrame) => {
                                if(frameChanged.id === savedFrame.id) {
                                    return frameChanged;
                                }
                                return savedFrame;
                            }));
                        }} 
                    />
                )
            })
        }
        <Button onClick={() => {
                setFrames([...frames, (frameType===FrameType.NumberFrame)?emptyFrameNumber():emptyFrameString()])
            }}><CtaMain className="small green">Add frame</CtaMain></Button>
    </div>
    )
}
export default FormFrameNumberArray