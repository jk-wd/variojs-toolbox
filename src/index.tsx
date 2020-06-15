import React from "react";
import devSocket from "@socketserver/client/dev-socket";
import {registerSite} from "@helpers/site-select";
import ChooseSite from "@components/ChooseSite";
import ReactDOM from "react-dom";
import { IInitialData } from '@interfaces/data';

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

if(!document.querySelector('.app.active')) {
    
}


devSocket.init((initialData:IInitialData) => {
    registerSite(initialData);
    ReactDOM.render(<ChooseSite />, document.querySelector('#vario-js-toolbox'));    
}, handleScroll);


