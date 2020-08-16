import React, { useEffect, useState } from "react";
import devSocket from "@socketserver/client/dev-socket";
import ChooseSite from "@components/ChooseSite";
import Main from "@components/Main";
import {
  SiteProvider,
  useSiteState,
  useSiteDispatch,
  SiteActions,
} from "@context/sites/SiteContext";
import ReactDOM from "react-dom";
import { ISocketSiteData } from "@interfaces/data";
import { ISite } from "@interfaces/site";
import styled from "styled-components";
const { ipcRenderer } = window.require("electron");
var pjson = require("../../node_modules/variojs/package.json");

(window as any).VarioJsDevTools = {
  scrollPos: {
    scrollOffset: 0,
    scrollPercentage: 0,
  },
};

const LandingBox = styled.div`
  width: 320px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 320px;
    margin-bottom: 10px;
  }
`;

const handleScroll = ({ scrollOffset, scrollPercentage }: any) => {
  const posIdicator = document.querySelector("#position_indicator");
  if (posIdicator) {
    posIdicator.innerHTML = `scroll: ${scrollOffset}px - ${scrollPercentage.toFixed(
      2
    )}%`;
  }
  (window as any).VarioJsDevTools.scrollPos = {
    scrollOffset,
    scrollPercentage,
  };
};

const SiteSwitcher = () => {
  const { sites } = useSiteState();
  const siteDispatch = useSiteDispatch();
  const [port, setPort] = useState<string>();

  useEffect(() => {
    setPort(ipcRenderer.sendSync("GET_PORT", ""));
  }, []);

  useEffect(() => {
    if (!port) {
      return;
    }
    devSocket.init(
      (socketData: ISocketSiteData, invalidVersionUsed: boolean = false) => {
        if (!invalidVersionUsed) {
          siteDispatch({
            type: SiteActions.updateSite,
            siteData: socketData,
          });
        } else {
          siteDispatch({
            type: SiteActions.removeSite,
            url: socketData.siteUrl,
          });
          const versionInAnimationData =
            socketData &&
            socketData.animationData &&
            socketData.animationData.variojsVersion
              ? socketData.animationData.variojsVersion
              : "[no version information available]";
          ipcRenderer.sendSync(
            "SHOW_MESSAGE",
            `VarioJS version on site: ${versionInAnimationData} incompatible with version: ${pjson.version}`
          );
        }
      },
      handleScroll,
      port
    );
  }, [port]);
  return (
    <>
      {sites.map((site: ISite) => {
        return <Main key={site.url} siteData={site} />;
      })}
      {!sites.find((site: ISite) => site.active === true) ? (
        <LandingBox>
          <img src="./public/logo.png" />
          <ChooseSite />
        </LandingBox>
      ) : null}
    </>
  );
};

ReactDOM.render(
  <SiteProvider>
    <SiteSwitcher />
  </SiteProvider>,
  document.querySelector("#vario-js-toolbox")
);
