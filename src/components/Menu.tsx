import React from "react";
import {useNavigationDispatch, NavigationActions} from "@context/navigation/NavigationContext";
import {Sections} from "@enums/navigation";
import Button from "@components/Button";
import styled from "styled-components";

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
    
    return (
    <MenuEl>
        <Button onClick={() => {
            dispatch({
                type: NavigationActions.setActiveSection,
                section: Sections.SAVE,
            });
        }}>Save</Button>
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

        
    </MenuEl>
    )
}
export default Menu