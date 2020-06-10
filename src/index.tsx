import React from "react";
import ReactDOM from "react-dom";
import {IAnimationData} from "variojs";
import devSocket from "@socketserver/client/dev-socket";
import {createGlobalStyle} from "styled-components";
import App from "@components/App";
import {NavigationProvider} from "@context/navigation/NavigationContext";
import {PlaceholdersProvider} from "@context/placeholders/PlaceholdersContext";
import {AnimationDataProvider} from "@context/animation-data/AnimaitonDataContext";


const GlobalStyle = createGlobalStyle`
    input:focus,
    select:focus,
    textarea:focus,
    button:focus {
        outline: none;
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

(window as any).VarioJsDevTools = {
    scrollPos: {
        scrollOffset: 0,
        scrollPercentage: 0,
    }
};


const handleScroll = ({scrollOffset, scrollPercentage}: any) => {
    const posIdicator = document.querySelector('#position_indicator');
    if(posIdicator) {
        posIdicator.innerHTML = `scroll: ${scrollOffset}px - ${scrollPercentage.toFixed(2)}%`
    }
    (window as any).VarioJsDevTools.scrollPos = {scrollOffset, scrollPercentage};
}

ReactDOM.render(<div>Please refresh the site you want to animate</div>, document.querySelector('#vario-js-toolbox'));

devSocket.init((initialData:any) => {
    ReactDOM.render(<Main siteUrl={initialData.siteUrl} animationData={(initialData.animationData as any)} placeholders={(initialData.placeholders as any)} />, document.querySelector('#vario-js-toolbox'));
}, handleScroll);


