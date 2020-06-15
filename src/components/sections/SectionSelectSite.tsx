import React from "react";
import BlockLine from "@components/block-elements/BlockLine";
import {useSiteState, useSiteDispatch, SiteActions} from "@context/sites/SiteContext";
import Button from '@components/Button';
import FormHeading from "@components/form-elements/FormHeading";
import { ISite } from '@interfaces/site';

const SectionSelectSite = () => {
    const {sites} = useSiteState();
    const siteDispatch = useSiteDispatch();
    return (
        <div>
            <FormHeading className="large" subHeading="select the site you want to animate">Sites</FormHeading>
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
                                                url: site.url
                                            }
                                        );
                                    }
                                }>{site.url}</Button>
                            </BlockLine>
                            
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SectionSelectSite;