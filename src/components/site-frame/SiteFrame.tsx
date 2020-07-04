import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { Colors } from '@enums/colors';
import FormLabel from '@components/form-elements/FormLabel';


const SiteFrameEl = styled.div`
    position:fixed;
    top: 0;
    right: 0;
    width:74vw;
    height: 65vh;
    padding-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${Colors.softWhite};

    iframe {
        background-color: transparent;
        border: 0;
        width: ${props => {
            //@ts-ignore
            return props.frameWidth
        }};
        height: 100%;
    }
`;


const SiteFrameMenu = styled.div`
  position:absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:2;
  left:0;
  top:0;
  padding: 0 10px;
  height: 40px;
  width: 100%;
  background-color: ${Colors.midGrey};
  .position-indicator {
      text-align: center;
      width: 100%;
      font-size: 12px;
      font-family: "ProximaNova-Bold";
      padding-right: 10px;
      color: ${Colors.white};
  }
  .width-screen {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 40px;
    input {
        border-radius: 0;
        border: 1px solid black;
        border-top: none;    
        font-size: 14px;
        padding:4px;
        float: right;
        margin-left: 10px;
    }
    label {
        color: ${Colors.white};
        display:inline-block;
        margin-top: 6px;
    }
  }

  > select {
        flex-basis: flex-end;
        float: right;
  }
`;

interface Props {
    siteUrl: string
}

const SiteFrame = ({siteUrl}:Props) => {
    const [width, setWidth] = useState<number>();
    const iframeRef = React.createRef<HTMLIFrameElement>();
    useEffect(() => {
        if(iframeRef && iframeRef.current) {
            const iframe = iframeRef.current;
            setTimeout(() => {
                iframe.src=siteUrl;
            }, 2000);
        }
    }, [siteUrl]);
    return (
        //@ts-ignore
        <SiteFrameEl frameWidth={(width)?width+"px":"100%"} >
            <SiteFrameMenu>

                <div id="position_indicator" className="position-indicator"></div>
                <div className="width-screen">
                    <FormLabel className="small">Width of screen: </FormLabel>
                    <input type="number" onChange={(event) => {
                        const widthToSet = parseInt(event.target.value, 10);
                        setWidth(widthToSet);
                    }} />
                </div>
                
            </SiteFrameMenu>
            <iframe frameBorder="0" ref={iframeRef} ></iframe>

        </SiteFrameEl>
    )
}

export default SiteFrame;