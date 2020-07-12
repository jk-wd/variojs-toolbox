import React from "react";
import App from "@components/App";
import styled, {createGlobalStyle} from "styled-components";
import {NavigationProvider} from "@context/navigation/NavigationContext";

import {PlaceholdersProvider} from "@context/placeholders/PlaceholdersContext";
import {AnimationDataProvider} from "@context/animation-data/AnimaitonDataContext";
import { ISite } from '@interfaces/site';
import { ModalProvider } from '@context/modal/ModalContext';

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

const SiteHolder = styled.div`
    display:none;
    &.active {
        display:block
    }
`

interface Props {
    siteData: ISite
}

const Main = ({siteData}:Props) => {
return (
        <NavigationProvider >                    
            <ModalProvider>
                <AnimationDataProvider animationData={siteData.animationData} >
                    <PlaceholdersProvider placeholders={siteData.placeholders} >
                        <SiteHolder className={(siteData.active)?'active':''}>
                            <GlobalStyle />
                            <App siteData={siteData} />
                        </SiteHolder>
                    </PlaceholdersProvider>
                </AnimationDataProvider>
            </ModalProvider>
        </NavigationProvider>
    
)
}

export default Main;
