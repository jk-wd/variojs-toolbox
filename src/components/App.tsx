import React, {useEffect, useCallback} from "react";
import styled from "styled-components";
import TimelineSelect from '@components/timeline/TimelineSelect';
import {useNavigationState, useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import {useAnimationDataState, useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import {Sections} from "@enums/navigation";
import CtaMain from "@components/cta/CtaMain";
import Panel from "@components/Panel";
import SectionAnimationEntries from "@components/sections/SectionAnimationEntries";
import SectionAnimationEntry from "@components/sections/SectionAnimationEntry";
import SectionAddAnimationEntry from "@components/sections/SectionAddAnimationEntry";
import SectionMenu from '@components/sections/SectionMenu';
import SiteFrame from '@components/site-frame/SiteFrame';
import SectionTimelines from '@components/sections/SectionTimelines';
import SectionTimeline from '@components/sections/SectionTimeline';
import SectionAddTimeline from '@components/sections/SectionAddTimeline';
import SectionSave from '@components/sections/SectionSave';
import SectionAnimationDefinition from '@components/sections/SectionAnimationDefinition';
import SectionSelectSite from '@components/sections/SectionSelectSite';
import SectionAddAnimationDefinition from '@components/sections/SectionAddAnimationDefinition';
import SectionBreakpoints from '@components/sections/SectionBreakpoints';
import SectionNumbers from '@components/sections/SectionNumbers';
import SectionAnimationDefinitions from '@components/sections/SectionAnimationDefinitions';
import { Colors } from '@enums/colors';
import Timeline from '@components/timeline/Timeline';
import {ISite} from '@interfaces/site';
import DecisionBox from "@components/DecisionBox";
import {Modals} from "@enums/modals";
import Modal from "@components/modal/Modal";
import Button from "@components/Button";
import {useModalDispatch, ModalActions} from "@context/modal/ModalContext";
import {useSiteState, useSiteDispatch, SiteActions} from "@context/sites/SiteContext";

const AppContent = styled.div`
  border: none;
  padding: 40px 0;
  width: 100%;
`;

const MenuButton = styled.span`
  padding: 10px 0;
  display: block;
  font-size: 14px;
  color: ${Colors.darkGrey};
  font-family: "ProximaNova-Bold";
  text-decoration:underline;
  white-space: nowrap;
`

const Loading = styled.div`
    width: 100%;
    height: 100%;
    position:fixed;
    top: 0;
    left: 0;
    z-index: 100000;
    background-color: ${Colors.white};

    &.hide {
        display:none;
    }
`

const LoadingHolder = styled.div`
    position: fixed;
    text-align:center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const LoadingIcon = styled.div`
     @keyframes rotating {
        from {
          -ms-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
          -webkit-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        to {
          -ms-transform: rotate(360deg);
          -moz-transform: rotate(360deg);
          -webkit-transform: rotate(360deg);
          -o-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }

    -webkit-animation: rotating 3s linear infinite;
    -moz-animation: rotating 3s linear infinite;
    -ms-animation: rotating 3s linear infinite;
    -o-animation: rotating 3s linear infinite;
    animation: rotating 3s linear infinite;
    width: 40px;
    height: 40px;
    display: inline-block;
    margin-bottom: 10px;
    background-size: contain;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAABlCAMAAABjot39AAAAw1BMVEVMaXH7rRg6vaX7rRjvSG/7rRg6vaU6vaXvSG/vSG8nKTMnKTMnKTPvSG86vaUnKTP7rRjvSG86vaXvSG86vaXvSG/7rRj7rRgnKTM6vaU6vaU6vaX7rRgnKTMnKTP7rRjvSG86vaUnKTMnKTP7rRgnKTMnKTP7rRgnKTPvSG/vSG8nKTP7rRjvSG86vaX7rRg6vaU6vaX7rRjvSG/7rRg6vaXvSG8nKTMnKTPvSG/vSG/7rRg6vaX7rRg6vaXvSG8nKTPrnj6EAAAAPXRSTlMA0PDAwGAQQBBAIBDwYMCAEHCggGDw8IBAgCBwMKDAQNCw0FCgYLBQkDDgcCCQkODg0HCgsDCwMOAgUJBQrW0ShAAAAAlwSFlzAAASsAAAErAB+4lRkAAAAt9JREFUaN7tl+tyokAQhUfjDQMY7+IFVMRr1GwSTbK7MLz/UwU164oy04M0VKzK+QvFV83p6T5DSEgZxiOJVd3mnb3XepR9iIlhfCEOajTj4Dz6GHvOMzpk0rAv9YpcTtYOVOohAQgupttgUewRHiVlszXBgjxzIPYai7LmUexszNZ/NQAO5ZVPsXHGGgCxUUZAF6KgNLMBUe4wKM0fyrf0JZkeA89L9obOfjJzjDSSmMn8XkbbL9xdaeDtfTbkTyIZ5vbymIcJarQRelQOyMkTEoMmKaTM365pK3WgdfLA/SU1urqOXOfJ+ad0Jc9sayOCGzkt7fik5q/6zttiquv6uGTeBzzcPDkXWoVGFHuye9TYPH9cc4Kk5kIx7nuuX8OWAMRxfoXBmLJ7oenJ87zD0kAcUnKDNDzak0szKU5HFDJ1XT6mwoY46bYYxHJZGkP/a6eKWHPJTIq7AEvxJFSMzoa4cnHnCh8i5EzL5anH6eJjN0csxZPXACuA4gi4wofsnFEhCjzPFgBFJyQdnTIGKC4hTnTKEKK8YVAgiNvC+GMCFDURSiV6JwtQoFOpkujuFzEmTA+AyN47g8jT0gIoY5TJD00YiwDFiG0x/uGX9+uyHXkj8yd/6fDS38jpQgdLwUhKvI1s4qU+kwnxRbIAb7QwwdLirOOTNH6+M9VNuIxsCUB2raYJ3SzYaf/90ngr6MVNTatwbklQGi+d9UCveP1NZyZJEouz+D8436dXM6Rln+5V3yqFYFCrtJN5fRnKnJ6ovizEcEee9emZ6mV0iEIDtEUu54UGqo+KKVOG+ogQiTK1RIMU6mwKlbAoVQ6EzpMohVIlZusPyuBQ+nwKRenmAgDB+WUSRKkmYAuSMdUfyrf0JZkeA8/L79s5+5Ax20RmMtaCqSYwkr1i5hzKDC+LsSGYmUxhQV7iD33YEA9Tj+vU+/SRuUgvEolBko8zV0hM+ihnDj8uswzVwJ8Z90sMjhbxEQAAAABJRU5ErkJggg==');
`

const Logo = styled.img`
    width: 300px;
`;

const AppBottom = styled.div`
    height: 140px;
    background-color: ${Colors.midGrey};
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px;
`

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
  background-color: ${Colors.softGrey};
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

const LogoHolder = styled.div`
    position:fixed;
    top: 0;
    right: 0;
    width:60vw;
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const contentMap: {[key:string]: React.ReactNode} = {
    [Sections.MENU]: <SectionMenu />,
    [Sections.ANIMATION_ENTRY]: <SectionAnimationEntry />,
    [Sections.TIMELINES]: <SectionTimelines pixelBased={false} />,
    [Sections.TIMELINE]: <SectionTimeline />,
    [Sections.ADD_TIMELINE]: <SectionAddTimeline pixelBased={false} />,
    [Sections.ADD_PIXELBASED_TIMELINE]: <SectionAddTimeline pixelBased={true} />,
    [Sections.PIXELBASED_TIMELINES]: <SectionTimelines pixelBased={true} />,
    [Sections.PIXELBASED_TIMELINE]: <SectionTimeline />,
    [Sections.SAVE]: <SectionSave />,
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
    const siteDispatch = useSiteDispatch();
    const {animationData} = useAnimationDataState();
    const dispatchNavigation = useNavigationDispatch();
    const {sites} = useSiteState();
    const activeSite = sites.find((site: ISite) => (site.active));
    const url = (activeSite)?activeSite.url:undefined;
    const lastActiveSection = sections[sections.length-1];
    const modalId = `${Modals.CONFIRM_DATA_CHANGE}_${siteData.url}`;
    const modalDispatch = useModalDispatch();

    useEffect(() => {
        
        if(animationData && JSON.stringify(animationData) !== JSON.stringify(siteData.animationData)) {
            console.log(JSON.stringify(animationData), JSON.stringify(siteData.animationData));
            modalDispatch({
                type: ModalActions.setActiveModal,
                modal: modalId
            });
        }
        if(!animationData && siteData.animationData) {
            animationDataDispatch({
                type: AnimationDataActions.setAnimationData,
                animationData: siteData.animationData
            })
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

            <Loading className={`${(animationData)?'hide':''}`}>
                {JSON.stringify(animationData)}
                <LoadingHolder>
                    <LoadingIcon /><br/><br/>
                    <Button onClick={() => {
                        siteDispatch(
                            {
                                type: SiteActions.removeSite,
                                url
                            }
                        );
                    }}><CtaMain className="light small">Cancel</CtaMain></Button>
                </LoadingHolder>
            </Loading>
            
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
                        animationDataDispatch({
                            type: AnimationDataActions.syncAnimationData,
                            url
                        })
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
                            <MenuButton>Main menu</MenuButton>
                    </Button>
                    <div id="position_indicator"></div>
                </AppTopSection>
                <AppContent>
                    {
                        contentMap[lastActiveSection]
                    }
                </AppContent>
                {
                    (lastActiveSection === Sections.MENU)?
                    <AppBottom>
                        <TimelineSelect />
                    </AppBottom>:null
                }
            </Panel>
            <Timeline></Timeline>
        </>
    )
}

export default App;