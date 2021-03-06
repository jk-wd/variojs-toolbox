import React, { useEffect } from "react";
import devSocket from "@socketserver/client/dev-socket";
import ChooseSite from "@components/ChooseSite";
import Main from "@components/Main";
import {SiteProvider, useSiteState, useSiteDispatch, SiteActions} from "@context/sites/SiteContext";

import ReactDOM from "react-dom";
import { ISocketSiteData } from '@interfaces/data';
import { ISite } from '@interfaces/site';

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

const SiteSwitcher = () => {
    const {sites} = useSiteState();
    const siteDispatch = useSiteDispatch();


    useEffect(() => {
        devSocket.init((socketData:ISocketSiteData) => {
            siteDispatch(
                {
                    type: SiteActions.registerSite,
                    siteData: socketData
                }
            );
        }, handleScroll);
    }, [])
    return (
            <>
                {
                   sites.map((site: ISite) => {
                        return <Main key={site.url} siteData={site} />
                   })
               }
               {
                    (!sites.find((site:ISite) => (site.active  === true)))?
                    <ChooseSite />: null
               }
            </>            
    );
    }

ReactDOM.render(<SiteProvider><SiteSwitcher /></SiteProvider>, document.querySelector('#vario-js-toolbox'));    



