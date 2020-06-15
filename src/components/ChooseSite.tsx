import React from "react";
import styled from "styled-components";
import SectionSelectSite from '@components/sections/SectionSelectSite';


const ChooseSiteEl = styled.div`
    max-width: 320px;
    margin: 0 auto;
`


const ChooseSite = () => {
    return (
        <ChooseSiteEl>
          <SectionSelectSite />
        </ChooseSiteEl>
    )
}

export default ChooseSite;