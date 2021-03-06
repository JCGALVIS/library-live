import React, { useState, useEffect } from "react";
import Feed from "./Feed";

const IVS_PLAYER_MIN_JS =
  "https://player.live-video.net/1.2.0/amazon-ivs-player.min.js";

export function LivestreamingVideo(streamUrl: string) {
  const [scriptVideoPlayer, setScriptVideoPlayer] = useState(false);
  const [isPlayerSupported, setIsPlayerSupported] = useState(false);

  useEffect(() => {
    if (!scriptVideoPlayer) {
      const script = document.createElement("script");

      script.src = IVS_PLAYER_MIN_JS;
      script.id = "IVS";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window?.IVSPlayer?.isPlayerSupported) {
          setIsPlayerSupported(true);
        }
      };
    }

    if (document.getElementById("IVS")) setScriptVideoPlayer(true);
  }, []);

  return (
    isPlayerSupported && (
      <div>
        <Feed streamUrl={streamUrl} />
      </div>
    )
  );
}

export default LivestreamingVideo;
