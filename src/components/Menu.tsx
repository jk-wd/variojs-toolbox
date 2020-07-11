import React, {useEffect} from "react";
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import {useAnimationDataDispatch, AnimationDataActions} from "@context/animation-data/AnimaitonDataContext";
import {useSiteState} from "@context/sites/SiteContext";
import {Sections} from "@enums/navigation";
import Button from "@components/Button";
import styled from "styled-components";
import {ISite} from "@interfaces/site";

const { ipcRenderer } = window.require('electron');

export const MenuEl = styled.nav`
    width:100%;
    & > button {
        text-decoration:underline;
        text-align:left;
        width: 100%;
        padding: 10px 0;
        font-size: 14px;
        width: 100%;
    }
`;

const Menu = () => {
    const dispatch = useNavigationDispatch();
    const animationDataDispatch = useAnimationDataDispatch();
    const {sites} = useSiteState();
    const activeSite = sites.find((site: ISite) => (site.active));
    const url = (activeSite)?activeSite.url:undefined;

    useEffect(() => {
        // @ts-ignore
        ipcRenderer.on('UPDATE_ANIMATION_DATA', (event?: any, args?:any) => {
            animationDataDispatch({
                type: AnimationDataActions.setAnimationData,
                animationData: args
            })
            animationDataDispatch({
                type: AnimationDataActions.syncAnimationData,
                url
            })
        });
    }, []);

    return (
    <MenuEl>
        <Button onClick={() => {
            dispatch({
                type: NavigationActions.setActiveSection,
                section: Sections.SAVE,
            });
        }}>Save animaiton json</Button>
        <Button onClick={() => {
            ipcRenderer.send('LOAD_FILE');
        }}>Load animaiton json</Button>
        <Button onClick={() => {
            dispatch({
                type: NavigationActions.setActiveSection,
                section: Sections.SITES,
            });
        }}>Sites</Button>
        <Button onClick={() => {
            dispatch({
                type: NavigationActions.setActiveSection,
                section: Sections.TIMELINES,
            });
        }}>Timelines</Button>
        <Button onClick={() => {
            dispatch({
                type: NavigationActions.setActiveSection,
                section: Sections.PIXELBASED_TIMELINES,
            });
        }}>Pixel based Timelines</Button>
        <Button onClick={() => {
            dispatch({
                type: NavigationActions.setActiveSection,
                section: Sections.ANIMATION_ENTRIES,
            });
        }}>Animation entries</Button>
        <Button onClick={() => {
            dispatch({
                type: NavigationActions.setActiveSection,
                section: Sections.ANIMATION_DEFINITIONS,
            });
        }}>Animation definitions</Button>

        <Button onClick={() => {
            dispatch({
                type: NavigationActions.setActiveSection,
                section: Sections.NUMBERS,
            });
        }}>Number variables</Button>
        <Button onClick={() => {
            dispatch({
                type: NavigationActions.setActiveSection,
                section: Sections.BREAKPOINTS,
            });
        }}>Breakpoint definitions</Button>
        <Button onClick={() => {
            dispatch({
                type: NavigationActions.setActiveSection,
                section: Sections.ADD_ANIMATION_ENTRY
            });
        }}>Add animation entry</Button>
        
    </MenuEl>
    )
}
export default Menu