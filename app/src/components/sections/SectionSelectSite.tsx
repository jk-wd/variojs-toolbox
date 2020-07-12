import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import {useSiteState, useSiteDispatch, SiteActions} from "@context/sites/SiteContext";
import Button from '@components/Button';
import {ISite} from '@interfaces/site';
import FormHeading from "@components/form-elements/FormHeading";
import BlockLine from "@components/block-elements/BlockLine";
import FormInputText from '@components/form-elements/FormInputText';
import CtaMain from '@components/cta/CtaMain';

const Examples = styled.div`
    button {
        text-decoration: underline;
    }
`

const { ipcRenderer } = window.require('electron');
const SectionSelectSite = () => {
    const {sites} = useSiteState();
    const [url, setUrl] = useState<string>('');
    const [port, setPort] = useState<string>();
    const siteDispatch = useSiteDispatch();

    useEffect(() => {
        setPort(ipcRenderer.sendSync('GET_PORT', ''));
    }, []);

    const registerSite = useCallback((url?: string) => {
        if(url && url!=='' && port){
            let urlResult = new URL(url);
            urlResult.searchParams.set('variojsp', port);
            
            siteDispatch(
                {
                    type: SiteActions.updateSite,
                    siteData: {
                        siteUrl: urlResult.toString()
                    }
                }
            );
            siteDispatch(
                {
                    type: SiteActions.setActiveSite,
                    url: urlResult.toString()
                }
            );    
        }
    }, [
        port
    ]);

    if(!port) {
        return null
    }

    return (
        <div>
            <FormHeading className="large" subHeading="Select a site or copy paste the url of the site you want to animate">Site url</FormHeading>
            <div style={{
                paddingTop: '4px',
                marginBottom: '26px'
            }}>

                {
                    sites.map((site: ISite) => {
                        return (
                            <BlockLine key={site.url}>
                                <Button onClick={
                                    () => {
                                        siteDispatch(
                                            {
                                                type: SiteActions.setActiveSite,
                                                url: site.url,
                                            }
                                        );
                                    }
                                }>{site.url}</Button>
                            </BlockLine>
                            
                        )
                    })
                }

                <FormInputText debounceChange={false} onChange={(event:any) => {
                    setUrl(event.target.value);
                }} label="url" /><br/>
                <Button onClick={() => {
                   registerSite(url)
                }}><CtaMain>Select</CtaMain></Button>
                <Examples>
                <FormHeading>Examples</FormHeading>

<Button onClick={
    () => {
        registerSite("http://variojs.com/#/")
    }
}>http://variojs.com/#/</Button>

<Button onClick={
    () => {
       registerSite("http://variojs.com/#/examples/animation-control")
    }
}>http://variojs.com/#/examples/animation-control</Button>
<Button onClick={
    () => {
        registerSite("http://variojs.com/#/examples/text-animaiton")
    }
}>http://variojs.com/#/examples/text-animaiton</Button>
                </Examples>
               
            </div>
        </div>
    )
}

export default SectionSelectSite;