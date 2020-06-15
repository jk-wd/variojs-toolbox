import React from "react";
import {sites, setActiveSite} from "@helpers/site-select";
import BlockLine from "@components/block-elements/BlockLine";
import Button from '@components/Button';
import FormHeading from "@components/form-elements/FormHeading";
import { ISite } from '@interfaces/site';

const SectionSelectSite = () => {
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
                                        setActiveSite(site.url);
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