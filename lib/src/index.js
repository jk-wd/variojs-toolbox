const WebSocket = require("ws");
import { calculatePageScroll } from "variojs";
import socketConnect from "../../src/socket-connect.js";

const sendSiteData = (ws, variojs) => {
  const animationData = variojs.getAnimationData();
  const timelineStates = variojs.getTimelineStates();
  const pixelTimelineStates = variojs.getPixelTimelineStates();
  if (!animationData) {
    return;
  }
  const domNodes = [].slice.call(document.querySelectorAll("[data-v]"));

  ws.send(
    JSON.stringify({
      action: "siteData",
      payload: {
        animationData,
        numbers: variojs.getNumbers(),
        siteUrl: window.location.href,
        timelineStates,
        pixelTimelineStates,
        placeholders: domNodes.reduce((result, domNode) => {
          const name = domNode.getAttribute("data-v");
          if (name && name != "") {
            result.push(name);
          }
          return result;
        }, []),
      },
    })
  );
};

const getPortParam = () => {
  const url = new URL(window.location);
  const portParam = url.searchParams.get("variojsp");
  return portParam || "";
};

export default {
  init: async (variojs) => {
    const port = getPortParam();
    if (!port) {
      return;
    }
    const ws = await socketConnect(port);

    variojs.onUpdateAnimationData((animationData) => {
      sendSiteData(ws, variojs);
    });
    window.addEventListener("scroll", () => {
      ws.send(
        JSON.stringify({
          action: "calculatePageScroll",
          payload: calculatePageScroll(),
        })
      );
    });
    sendSiteData(ws, variojs);

    ws.addEventListener("message", function (event) {
      const data = event.data;
      const dataParsed = JSON.parse(data);

      if (
        dataParsed.action === "updateAnimationData" &&
        dataParsed.payload.url === window.location.href
      ) {
        console.log(dataParsed.payload.animationData);
        variojs.updateAnimationData(dataParsed.payload.animationData);
        sendSiteData(ws, variojs);
      }
      if (dataParsed.action === "getAnimationData") {
        sendSiteData(ws, variojs);
      }
    });
  },
};