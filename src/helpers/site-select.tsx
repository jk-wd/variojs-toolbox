
import React from "react";
import {ISite} from '@interfaces/site'
import ReactDOM from "react-dom";
import Main from "@components/Main";
import { IInitialData } from '@interfaces/data';

export let activeSite: ISite | undefined = undefined;

export const sites: ISite[] = [];

export const setActiveSite = (url: string) => {
    for(let site of sites){
        site.div.style.display = 'none';
        site.active = false;
        if(site.url === url){
            site.active = true;
            site.div.style.display = 'block';
        }
    }
}

export const registerSite = (initialData:IInitialData) => {
    if(sites.find((site:ISite) => (site.url === initialData.siteUrl))) {
        return;
    }
    const div = document.createElement("div");
    div.classList.add('app');
    document.body.insertBefore(div, document.body.firstChild);
    ReactDOM.render(<Main siteUrl={initialData.siteUrl} animationData={initialData.animationData} placeholders={initialData.placeholders} />, div);
    sites.push({
        animationData:initialData.animationData,
        url:initialData.siteUrl,
        div,
        active: false
    });
}
