import React from "react";
import styled from "styled-components";
import {IBreakpoint} from "variojs";
import {useNavigationState, useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import {useAnimationDataState, useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import {copyToClipBoard} from "@helpers/clipboard";
import {Sections} from "@interfaces/navigation";
import Panel from "@components/Panel";
import SectionAnimationEntries from "@components/sections/SectionAnimationEntries";
import SectionAddAnimationEntry from "@components/sections/SectionAddAnimationEntry";
import Button from '@components/Button';
import SectionMenu from '@components/sections/SectionMenu';
import SectionTimelines from '@components/sections/SectionTimelines';
import SectionParallaxTimelines from '@components/sections/SectionParallaxTimelines';
import SectionAnimationDefinition from '@components/sections/SectionAnimationDefinition';
import SectionBreakpoints from '@components/sections/SectionBreakpoints';
import SectionNumbers from '@components/sections/SectionNumbers';
import SectionAnimationDefinitions from '@components/sections/SectionAnimationDefinitions';
import CtaMain from '@components/cta/CtaMain';
import { Colors } from '@interfaces/colors';
import Timeline from '@components/timeline/Timeline';

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
  font-weight: bold;
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
  min-width: 320px;
  max-width: 620px;
  background-color: ${Colors.darkGrey};
  > div {
      text-align: center;
      width: 100%;
      font-size: 12px;
      font-weight: bold;
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
  bottom:30vh;
  width: 100%;
  min-width: 320px;
  max-width: 620px;
  & > button {
      width: 100%;
  }
`;

const contentMap: {[key:string]: React.ReactNode} = {
    [Sections.MENU]: <SectionMenu />,
    [Sections.TIMELINES]: <SectionTimelines />,
    [Sections.PARALLAX_TIMELINES]: <SectionParallaxTimelines />,
    [Sections.ANIMATION_ENTRIES]: <SectionAnimationEntries />,
    [Sections.ANIMATION_DEFINITIONS]: <SectionAnimationDefinitions />,
    [Sections.BREAKPOINTS]: <SectionBreakpoints />,
    [Sections.NUMBERS]: <SectionNumbers />,
    [Sections.ADD_ANIMATION_ENTRY]: <SectionAddAnimationEntry />,
    [Sections.ANIMATION_DEFINITION]: <SectionAnimationDefinition />,
}

const App = () => {
    const {sections} = useNavigationState();
    const {animationData} = useAnimationDataState();
    const dispatchNavigation = useNavigationDispatch();
    const dispatchAnimationData = useAnimationDataDispatch();
    const lastActiveSection = sections[sections.length-1];

    return (
        <>

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
                    <select onChange={(event: any) => {
                        dispatchAnimationData({
                            type: AnimationDataActions.setBreakpoint,
                            breakpoint: event.target.value,
                        });
                    }} id="selectBreakpoint">
                        <option value='default'>Select breakpoint</option>
                        <option value='default'>none</option>
                        {
                            (animationData.breakpoints)?
                                animationData.breakpoints.map((breakpoint: IBreakpoint) => {
                                return (
                                    <option  key={breakpoint.id} value={breakpoint.id}>{breakpoint.id} - {breakpoint.definition}</option>
                                )
                            }):null
                        }
                        
                    </select>
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