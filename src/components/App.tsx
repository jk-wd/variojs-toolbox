import React, {useEffect, useCallback} from "react";
import styled from "styled-components";
import {useNavigationState, useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import {useAnimationDataState, useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import devSocket from "@socketserver/client/dev-socket";
import {copyToClipBoard} from "@helpers/clipboard";
import {Sections} from "@enums/navigation";
import Panel from "@components/Panel";
import SectionAnimationEntries from "@components/sections/SectionAnimationEntries";
import SectionAnimationEntry from "@components/sections/SectionAnimationEntry";
import SectionAddAnimationEntry from "@components/sections/SectionAddAnimationEntry";
import Button from '@components/Button';
import SectionMenu from '@components/sections/SectionMenu';
import SiteFrame from '@components/site-frame/SiteFrame';
import SectionTimelines from '@components/sections/SectionTimelines';
import SectionTimeline from '@components/sections/SectionTimeline';
import SectionAddTimeline from '@components/sections/SectionAddTimeline';
import SectionAnimationDefinition from '@components/sections/SectionAnimationDefinition';
import SectionSelectSite from '@components/sections/SectionSelectSite';
import SectionAddAnimationDefinition from '@components/sections/SectionAddAnimationDefinition';
import SectionBreakpoints from '@components/sections/SectionBreakpoints';
import SectionNumbers from '@components/sections/SectionNumbers';
import SectionAnimationDefinitions from '@components/sections/SectionAnimationDefinitions';
import CtaMain from '@components/cta/CtaMain';
import { Colors } from '@enums/colors';
import Timeline from '@components/timeline/Timeline';
import {ISite} from '@interfaces/site';
import DecisionBox from "@components/DecisionBox";
import {Modals} from "@enums/modals";
import Modal from "@components/modal/Modal";
import {useModalDispatch, ModalActions} from "@context/modal/ModalContext";

const AppContent = styled.div`
  border: none;
  padding: 40px 0;
  width: 100%;
`;


const MenuButton = styled.span`
  padding: 10px 0;
  display: block;
  font-size: 14px;
  color: ${Colors.white};
  font-family: "ProximaNova-Bold";
  text-decoration:underline;
`;

const AppTopSection = styled.div`
  position:fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:2;
  left:0;
  top:0;
  padding: 0 10px;
  height: 40px;
  width: 100%;
  width: 26vw;
  background-color: ${Colors.darkGrey};
  > div {
      text-align: center;
      width: 100%;
      font-size: 12px;
      font-family: "ProximaNova-Bold";
      padding-right: 10px;
      color: ${Colors.white};
  }
  > select {
        flex-basis: flex-end;
        float: right;
  }
`;

const CopyToClipBoard = styled.div`
  position:fixed;
  z-index:2;
  left:0;
  bottom:35vh;
  width: 26vw;
  & > button {
      width: 100%;
  }
`;
const Logo = styled.img`
    width: 300px;
`;
const LogoHolder = styled.div`
    position:fixed;
    top: 0;
    right: 0;
    width:60vw;
    height: 65vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const contentMap: {[key:string]: React.ReactNode} = {
    [Sections.MENU]: <SectionMenu />,
    [Sections.ANIMATION_ENTRY]: <SectionAnimationEntry />,
    [Sections.TIMELINES]: <SectionTimelines parallax={false} />,
    [Sections.TIMELINE]: <SectionTimeline />,
    [Sections.ADD_TIMELINE]: <SectionAddTimeline parallax={false} />,
    [Sections.ADD_PARALLAX_TIMELINE]: <SectionAddTimeline parallax={true} />,
    [Sections.PARALLAX_TIMELINES]: <SectionTimelines parallax={true} />,
    [Sections.PARALLAX_TIMELINE]: <SectionTimeline />,
    [Sections.ANIMATION_ENTRIES]: <SectionAnimationEntries />,
    [Sections.ANIMATION_DEFINITIONS]: <SectionAnimationDefinitions />,
    [Sections.BREAKPOINTS]: <SectionBreakpoints />,
    [Sections.NUMBERS]: <SectionNumbers />,
    [Sections.ADD_ANIMATION_ENTRY]: <SectionAddAnimationEntry />,
    [Sections.ADD_ANIMATION_DEFINITION]: <SectionAddAnimationDefinition />,
    [Sections.ANIMATION_DEFINITION]: <SectionAnimationDefinition />,
    [Sections.SITES]: <SectionSelectSite />,
}

interface IProps {
    siteData:ISite
}

const App = ({siteData}:IProps) => {
    const {sections} = useNavigationState();
    const animationDataDispatch = useAnimationDataDispatch();
    const {animationData} = useAnimationDataState();
    const dispatchNavigation = useNavigationDispatch();
    const lastActiveSection = sections[sections.length-1];
    const modalId = `${Modals.CONFIRM_DATA_CHANGE}_${siteData.url}`;
    const modalDispatch = useModalDispatch();

    useEffect(() => {
        if(JSON.stringify(animationData) !== JSON.stringify(siteData.animationData)) {
            modalDispatch({
                type: ModalActions.setActiveModal,
                modal: modalId
            });
        }
    }, [siteData])

    const onSelectUpdateAnimationData = useCallback(() => {
        dispatchNavigation({ 
            type: NavigationActions.setActiveSection,
            section: Sections.MENU,
        });
        modalDispatch({
            type: ModalActions.setActiveModal,
            modal: undefined
        });
        animationDataDispatch({
            type: AnimationDataActions.setAnimationData,
            animationData: siteData.animationData
        })
    }, [siteData]);

    return (
        <>
            <Modal modalId={modalId}>
                <DecisionBox 
                    title="Data set changed!"
                    description="The animation data set has changed, do you want to use the updated data set, and override your current changes?"
                    yesTile="Keep current"
                    noTitle="Update"
                    onClickYes={() => {
                        modalDispatch({
                            type: ModalActions.setActiveModal,
                            modal: undefined
                        });
                        devSocket.updateAnimationData(animationData);
                    }}
                    onClickNo={() => {
                        onSelectUpdateAnimationData();
                    }}
                />
            </Modal>
            {(true)?
             <SiteFrame siteUrl={siteData.url}/>
            :
             <LogoHolder>
                <Logo src="/logo.png" />
            </LogoHolder>
            }
           
            <Panel>
                <AppTopSection>
                    <Button onClick={() => {
                            dispatchNavigation({ 
                                type: NavigationActions.setActiveSection,
                                section: Sections.MENU,
                            });
                        }}>
                            <MenuButton>Menu</MenuButton>
                    </Button>
                    <div id="position_indicator"></div>
                </AppTopSection>
                <AppContent>
                    {
                        contentMap[lastActiveSection]
                    }
                </AppContent>
                <CopyToClipBoard>
                    <Button onClick={() => {
                        copyToClipBoard(JSON.stringify(animationData, null, 2));
                    }}><CtaMain>Copy animation JSON to clipboard</CtaMain></Button>
                </CopyToClipBoard>
            </Panel>
            <Timeline></Timeline>
        </>
    )
}

export default App;