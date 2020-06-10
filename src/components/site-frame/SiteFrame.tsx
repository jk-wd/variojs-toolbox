import React, {useState} from "react";
import styled from "styled-components";


const SiteFrameEl = styled.div`
    position:fixed;
    top: 0;
    right: 0;
    width:74vw;
    height: 65vh;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
        border-radius: 0;
        border: 1px solid black;
        border-top: none;
        position: absolute;
        top: 0;
        right: 40px;
        font-size: 14px;
        padding:10px;

    }
    iframe {
        border: none;
        width: ${props => {
            //@ts-ignore
            return props.frameWidth
        }};
        height: 100%;
    }
`;

interface Props {
    siteUrl: string
}

const SiteFrame = ({siteUrl}:Props) => {
    const [width, setWidth] = useState<number>();
    return (
        //@ts-ignore
        <SiteFrameEl frameWidth={(width)?width+"px":"100%"} >
            <iframe src={siteUrl}></iframe>
            <input type="number" placeholder="width of screen" onChange={(event) => {
                const widthToSet = parseInt(event.target.value, 10);
                setWidth(widthToSet);
            }}></input>
        </SiteFrameEl>
    )
}

export default SiteFrame;