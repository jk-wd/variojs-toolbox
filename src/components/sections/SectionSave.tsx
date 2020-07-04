import React from "react";
import {MenuEl} from "@components/Menu";
import {copyToClipBoard} from "@helpers/clipboard";
import {useAnimationDataState} from "@context/animation-data/AnimaitonDataContext";
import Button from "@components/Button";
const { ipcRenderer } = window.require('electron');

const SectionSave = () => {
    const {animationData} = useAnimationDataState();
    return (
    <MenuEl>
        <Button onClick={() => {
            ipcRenderer.sendSync('SAVE_FILE', JSON.stringify(animationData, null, 1))
        }}>Save to file</Button>
       <Button onClick={() => {
                copyToClipBoard(JSON.stringify(animationData, null, 2));
            }}>Copy animation JSON to clipboard</Button>
    </MenuEl>
    )
}
export default SectionSave
