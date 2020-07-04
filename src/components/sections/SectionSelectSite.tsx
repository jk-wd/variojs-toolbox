import React, { useState, useEffect } from "react";

import {useSiteState, useSiteDispatch, SiteActions} from "@context/sites/SiteContext";
import Button from '@components/Button';
import {ISite} from '@interfaces/site';
import FormHeading from "@components/form-elements/FormHeading";
import BlockLine from "@components/block-elements/BlockLine";
import FormInputText from '@components/form-elements/FormInputText';
import CtaMain from '@components/cta/CtaMain';

const { ipcRenderer } = window.require('electron');
const SectionSelectSite = () => {
    const {sites} = useSiteState();
    const [url, setUrl] = useState<string>('');
    const [port, setPort] = useState<string>();
    const siteDispatch = useSiteDispatch();

    useEffect(() => {
        setPort(ipcRenderer.sendSync('GET_PORT', ''));
    }, []);

    if(!port) {
        return null
    }

    return (
        <div>
            <FormHeading className="large" subHeading="Copy paste the site url you want to animate">Sites</FormHeading>
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
                    if(url && url!==''){
                        let urlResult = new URL(url);
                        urlResult.searchParams.set('variojsp', port);
                        
                        siteDispatch(
                            {
                                type: SiteActions.registerSite,
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
                    
                }}><CtaMain>Select</CtaMain></Button>
            </div>
        </div>
    )
}

export default SectionSelectSite;