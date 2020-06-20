import React, {useState} from "react";
import FormInputText from "@components/form-elements/FormInputText";
import FormFrameBlock from "@components/form-elements/FormFrameBlock";
import FormLine from "@components/form-elements/FormLine";
import FormLineSection from "@components/form-elements/FormLineSection";
import FormLabel from "@components/form-elements/FormLabel";
import FormFieldset from "@components/form-elements/FormFieldset";
import FormHeading from "@components/form-elements/FormHeading";
import DeleteLabel from "@components/typography/DeleteLabel";
import Button from "@components/Button";
import { useAnimationDataState, useAnimationDataDispatch, AnimationDataActions } from '@context/animation-data/AnimaitonDataContext';
import CtaMain from '@components/cta/CtaMain';

const SectionNumbers = () => {
    const dispatchAnimationData = useAnimationDataDispatch();
    const [numberVariable, setNumberVariable] = useState<any>({});
    const {animationData} = useAnimationDataState();

    return (
    <div>
        <FormHeading className="large">Number variables</FormHeading>
        <div style={{
                paddingTop: '4px',
                marginBottom: '26px'
            }}>
                 {
            (animationData.numbers)?
            Object.keys(animationData.numbers).reverse().map((numberKey:string) => {
                const value = (animationData && animationData.numbers && animationData.numbers[numberKey])?animationData.numbers[numberKey]: 0;
                if(typeof value === "function") {
                    return
                }
                return(
                    <FormFrameBlock key={numberKey}>
                        <FormLine>
                            <FormLineSection>
                                <FormLabel className="small">{numberKey}</FormLabel>
                                <FormInputText onChange={(event: any) => {
                                     dispatchAnimationData({
                                        type: AnimationDataActions.addEditNumberVariable,
                                        name: numberKey,
                                        value: parseInt(event.target.value,10),
                                    });
                                }} defaultValue={value}/>
                            </FormLineSection>
                        </FormLine>
                        <FormLine>
                            <FormLineSection>
                                <Button onClick={
                                    () => {
                                        dispatchAnimationData({
                                            type: AnimationDataActions.deleteNumberVariable,
                                            name: numberKey,
                                        });
                                    }
                                }><DeleteLabel>Delete</DeleteLabel></Button>
                            </FormLineSection>
                        </FormLine>
                    </FormFrameBlock>
                )
            })
            :null
        }
        </div>
        <form onSubmit={(event:any) => {
            event.preventDefault();
            if(numberVariable.name && numberVariable.value) {
                dispatchAnimationData({
                    type: AnimationDataActions.addEditNumberVariable,
                    name: numberVariable.name,
                    value: parseInt(numberVariable.value, 10),
                });
            }
        }}>
            <FormHeading>
                Add nummber varable
            </FormHeading>
            <FormFieldset>
                <FormInputText onChange={(event:any) => {
                    setNumberVariable(
                        {
                            ...numberVariable,
                            name: event.target.value
                        }
                    );
                }} label="Number varaible name"/>
                <FormInputText onChange={(event:any) => {
                    setNumberVariable(
                        {
                            ...numberVariable,
                            value: event.target.value
                        }
                    );
                }} label="Number varaible value"/>
            </FormFieldset>
            <FormFieldset>
                <button type="submit"><CtaMain>Add variable</CtaMain></button>
            </FormFieldset>
        </form>
    </div>
    )
}
export default SectionNumbers