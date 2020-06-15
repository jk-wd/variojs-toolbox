import React from "react";
import App from "@components/App";
import {createGlobalStyle} from "styled-components";
import {NavigationProvider} from "@context/navigation/NavigationContext";
import {PlaceholdersProvider} from "@context/placeholders/PlaceholdersContext";
import {AnimationDataProvider} from "@context/animation-data/AnimaitonDataContext";
import {IAnimationData} from "variojs";

const GlobalStyle = createGlobalStyle`
input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}
.app {
    display: none;
}
.app.active {
    display: block;
}
button {
    background-color: transparent;
    cursor: pointer;
    padding: 0;
    margin: 0;
}
fieldset{
    border: none;
}
* {
    box-sizing: border-box;
    font-family: "ProximaNova-Regular";
}
`

interface Props {
animationData: IAnimationData
placeholders: string[]
siteUrl: string
}

const Main = ({animationData, placeholders, siteUrl}:Props) => {
return (
        <NavigationProvider >                    
                <AnimationDataProvider animationData={animationData} >
                    <PlaceholdersProvider placeholders={placeholders} >
                        <>
                            <GlobalStyle />
                            <App siteUrl={siteUrl} />
                        </>
                    </PlaceholdersProvider>
                </AnimationDataProvider>
        </NavigationProvider>
    
)
}

export default Main;
