import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  useLayoutEffect,
} from "react";

import IconCustom from "../Icon-custom/IconCustom";
import { MediaPlayer } from "../../typings/MediaPlayer";

interface HTMLVideoPicture extends HTMLVideoElement {
  requestPictureInPicture(): void;
  onleavepictureinpicture(): void;
  webkitEnterFullscreen(): void;
  webkitExitFullScreen(): void;
  webkitDisplayingFullscreen: boolean;
}

interface IndicatorInterface {
  mute: boolean;
  picture: boolean;
  screen: boolean;
  firstMuted: boolean;
}

const StreamPlayer = ({
  player,
  streamUrl,
}: {
  player: MediaPlayer;
  streamUrl: string;
}) => {
  const { PLAYING, IDLE, BUFFERING } = window.IVSPlayer.PlayerState;
  const [overlay, setOverlay] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(true);
  const [pictureInPicture, setPictureInPicture] = useState<boolean>(false);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(IDLE);
  const [firstTimeMuted, setFirstTimeMuted] = useState<boolean>(true);

  const videoEl = useRef<HTMLVideoPicture>(null);
  const mainContainer = useRef<HTMLDivElement>(null);

  const handleNothing = () => {};

  const handleMainButton = (): void => {
    const state = player.getState();

    switch (state) {
      case PLAYING:
        player.pause();
        break;

      case IDLE:
        player.play();
        break;

      default:
        break;
    }
  };

  const handlePictureAndPicture = (): void => {
    if (videoEl.current) {
      setPictureInPicture((prev) => {
        if (prev) document.exitPictureInPicture();
        else videoEl.current?.requestPictureInPicture();

        return !prev;
      });
    }
  };

  const handleFullScreen = (): void => {
    if (mainContainer.current) {
      mainContainer.current.onfullscreenchange = (): void => {
        const fullScreenElement =
          (document.fullscreenElement ?? document.mozFullScreenElement) ||
          document.webkitFullscreenElement ||
          document.msFullscreenElement;

        if (fullScreenElement) return;

        const exitFullScreen =
          document.exitFullscreen ||
          document.mozCancelFullScreen ||
          document.webkitExitFullscreen ||
          document.msExitFullscreen;

        if (exitFullScreen) exitFullScreen.bind(document)();
        setFullScreen(false);
      };

      setFullScreen((prev) => {
        if (prev) {
          const exitFullScreen =
            document.exitFullscreen ||
            document.mozCancelFullScreen ||
            document.webkitExitFullscreen ||
            document.msExitFullscreen;

          if (exitFullScreen) exitFullScreen.bind(document)();
        } else {
          const requestFullscreen =
            mainContainer.current?.requestFullscreen ??
            mainContainer.current?.mozRequestFullScreen ??
            mainContainer.current?.webkitRequestFullscreen ??
            mainContainer.current?.msRequestFullscreen;

          if (requestFullscreen)
            requestFullscreen.bind(mainContainer.current)();
        }

        return !prev;
      });
    }
  };

  const handleFullScreenMobile = (): void => {
    const mobileDiv = document.querySelector(
      "[class*=flexRowContent--playerContainer]"
    );

    if (mobileDiv) {
      mobileDiv.onfullscreenchange = (): void => {
        const fullScreenElement =
          (document.fullscreenElement ?? document.mozFullScreenElement) ||
          document.webkitFullscreenElement ||
          document.msFullscreenElement;

        if (fullScreenElement) return;

        const exitFullScreen =
          document.exitFullscreen ||
          document.mozCancelFullScreen ||
          document.webkitExitFullscreen ||
          document.msExitFullscreen;

        if (exitFullScreen) exitFullScreen.bind(document)();
        setFullScreen(false);
      };

      setFullScreen((prev) => {
        if (prev) {
          const exitFullScreen =
            document.exitFullscreen ||
            document.mozCancelFullScreen ||
            document.webkitExitFullscreen ||
            document.msExitFullscreen;

          if (exitFullScreen) exitFullScreen.bind(document)();
          else videoEl.current?.webkitExitFullScreen();
        } else {
          const requestFullscreen =
            mobileDiv.requestFullscreen ||
            mobileDiv.mozRequestFullScreen ||
            mobileDiv.webkitRequestFullscreen ||
            mobileDiv.msRequestFullscreen;

          if (requestFullscreen) requestFullscreen.bind(mobileDiv)();
          else videoEl.current?.webkitEnterFullscreen();
        }

        return !prev;
      });
    }
  };

  const handleMute = () => {
    setMuted((prev) => {
      player.setMuted(!prev);

      return !prev;
    });
    if (firstTimeMuted) {
      setFirstTimeMuted(false);
    }
  };

  const checkIfWebKit = useCallback((): boolean => {
    const ua = navigator.userAgent.toLowerCase();

    if (
      ua.indexOf("chrome") === ua.indexOf("android") &&
      ua.indexOf("safari") !== -1
    ) {
      // accessed via a WebKit-based browser
      return true;
    }

    return (
      ua.indexOf("ipad") !== -1 ||
      ua.indexOf("iphone") !== -1 ||
      ua.indexOf("ipod") !== -1
    );
  }, []);

  const buttonRenderer = (
    playerStatus: string,
    { mute, picture, screen, firstMuted }: IndicatorInterface
  ): JSX.Element => (
    <>
      {playerStatus === PLAYING || playerStatus === IDLE ? (
        firstMuted ? (
          <div
            role="button"
            tabIndex={0}
            className="player-video-central-button-position player-video-central-button-background"
            onClick={handleMute}
            onKeyDown={handleNothing}
          >
            <IconCustom
              id="muted-grounded-live-streaming"
              size={100}
              viewBox="0 0 400 400"
            />
          </div>
        ) : (
          <>
            <div
              role="button"
              tabIndex={0}
              className="player-video-central-button-position player-video-central-button-background"
              onClick={handleMainButton}
              onKeyDown={handleNothing}
              data-status={playerStatus}
            >
              <IconCustom
                id={`${
                  playerStatus === PLAYING ? "pause" : "play"
                }-grounded-live-streaming`}
                size={100}
                viewBox="0 0 400 400"
              />
            </div>
            <div
              role="button"
              tabIndex={0}
              className="player-video-picture-button-position player-video-button-flex"
              onClick={handlePictureAndPicture}
              onKeyDown={handleNothing}
            >
              <IconCustom
                id={`picture-and-picture${
                  picture ? "" : "-alt"
                }-live-streaming`}
                size={40}
                viewBox="0 0 400 400"
              />
            </div>
            <div
              role="button"
              tabIndex={0}
              className="player-video-mute-button-position player-video-button-flex"
              onClick={handleMute}
              onKeyDown={handleNothing}
            >
              <IconCustom
                id={`volume-${mute ? "off" : "up"}-live-streaming`}
                size={40}
                viewBox="0 0 400 400"
              />
            </div>
            <div
              role="button"
              tabIndex={0}
              className="player-video-fullscreen-button-position player-video-button-flex"
              onClick={handleFullScreen}
              onKeyDown={handleNothing}
            >
              <IconCustom
                id={`fullscreen${screen ? "-exit" : ""}-live-streaming`}
                size={40}
                viewBox="0 0 400 400"
              />
            </div>
          </>
        )
      ) : status === BUFFERING ? (
        <div
          className="player-video-central-button-position player-video-central-button-background"
          data-status={playerStatus}
        >
          <IconCustom
            id="loading-grounded-live-streaming"
            size={100}
            viewBox="0 0 400 400"
          />
        </div>
      ) : null}
    </>
  );

  const MainButtonRenderer = useMemo(
    () =>
      buttonRenderer(status, {
        mute: muted,
        picture: pictureInPicture,
        screen: fullScreen,
        firstMuted: firstTimeMuted,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [status, muted, pictureInPicture, fullScreen, firstTimeMuted]
  );

  useEffect(() => {
    if (!videoEl.current) return () => {};

    player.pause();
    player.attachHTMLVideoElement(videoEl.current);
    player.load(streamUrl);
    player.play();
    player.setMuted(true);

    return () => {};
  }, [player, streamUrl]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(player.getState());
    }, 500);

    return () => clearInterval(interval);
  }, [player]);

  useLayoutEffect(() => {
    let fullInterval: number | undefined;

    if (videoEl.current) {
      videoEl.current.onleavepictureinpicture = () =>
        setPictureInPicture(false);
      const isWebkit = checkIfWebKit();

      fullInterval = window.setInterval(() => {
        if (isWebkit)
          setFullScreen(videoEl.current?.webkitDisplayingFullscreen ?? false);
      }, 500);
    }

    return () => {
      if (fullInterval) clearInterval(fullInterval);
    };
  }, [videoEl, checkIfWebKit]);

  return (
    <>
      <div
        ref={mainContainer}
        className="player-ui"
        onMouseOver={() => setOverlay(true)}
        onMouseOut={() => setOverlay(false)}
        onFocus={handleNothing}
        onBlur={handleNothing}
        style={{ height: fullScreen ? "100vh" : "" }}
      >
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          className="player-video-el"
          controls={false}
          ref={videoEl}
          playsInline
          muted={muted}
          id="payer-video-el"
        />
        <div
          className="player-video-hover player-video-grid"
          data-visible={
            status === BUFFERING || firstTimeMuted
              ? BUFFERING
              : overlay
              ? "on"
              : "off"
          }
        >
          {MainButtonRenderer}
        </div>
        <div className="player-video-mobile">
          <div className="player-video-mobile">
            {firstTimeMuted && (
              <div
                role="button"
                tabIndex={0}
                onClick={handleMute}
                onKeyDown={handleNothing}
                className="player-video-mobile-muted"
              >
                <IconCustom
                  id="muted-grounded-live-streaming"
                  size={100}
                  viewBox="0 0 400 400"
                />
              </div>
            )}
            <div
              role="button"
              tabIndex={0}
              onClick={handleFullScreenMobile}
              onKeyDown={handleFullScreenMobile}
              className="player-video-mobile-fullscreen"
            >
              <IconCustom
                id={`fullscreen${fullScreen ? "-exit" : ""}-live-streaming`}
                size={42}
                viewBox="0 0 400 400"
              />
            </div>
            {!!videoEl?.current?.requestPictureInPicture && (
              <div
                role="button"
                tabIndex={0}
                onClick={handlePictureAndPicture}
                onKeyDown={handlePictureAndPicture}
                className="player-video-mobile-picture"
              >
                <IconCustom
                  id={`picture-and-picture${
                    pictureInPicture ? "" : "-alt"
                  }-live-streaming`}
                  size={40}
                  viewBox="0 0 400 400"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StreamPlayer;
