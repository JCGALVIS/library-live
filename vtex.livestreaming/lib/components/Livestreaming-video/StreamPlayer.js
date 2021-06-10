"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const IconCustom_1 = __importDefault(require("../Icon-custom/IconCustom"));
const StreamPlayer = ({ player, streamUrl, }) => {
    var _a;
    const { PLAYING, IDLE, BUFFERING } = window.IVSPlayer.PlayerState;
    const [overlay, setOverlay] = react_1.useState(false);
    const [muted, setMuted] = react_1.useState(true);
    const [pictureInPicture, setPictureInPicture] = react_1.useState(false);
    const [fullScreen, setFullScreen] = react_1.useState(false);
    const [status, setStatus] = react_1.useState(IDLE);
    const [firstTimeMuted, setFirstTimeMuted] = react_1.useState(true);
    const videoEl = react_1.useRef(null);
    const mainContainer = react_1.useRef(null);
    const handleNothing = () => { };
    const handleMainButton = () => {
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
    const handlePictureAndPicture = () => {
        if (videoEl.current) {
            setPictureInPicture((prev) => {
                var _a;
                if (prev)
                    document.exitPictureInPicture();
                else
                    (_a = videoEl.current) === null || _a === void 0 ? void 0 : _a.requestPictureInPicture();
                return !prev;
            });
        }
    };
    const handleFullScreen = () => {
        if (mainContainer.current) {
            mainContainer.current.onfullscreenchange = () => {
                var _a;
                const fullScreenElement = ((_a = document.fullscreenElement) !== null && _a !== void 0 ? _a : document.mozFullScreenElement) ||
                    document.webkitFullscreenElement ||
                    document.msFullscreenElement;
                if (fullScreenElement)
                    return;
                const exitFullScreen = document.exitFullscreen ||
                    document.mozCancelFullScreen ||
                    document.webkitExitFullscreen ||
                    document.msExitFullscreen;
                if (exitFullScreen)
                    exitFullScreen.bind(document)();
                setFullScreen(false);
            };
            setFullScreen((prev) => {
                var _a, _b, _c, _d, _e, _f, _g;
                if (prev) {
                    const exitFullScreen = document.exitFullscreen ||
                        document.mozCancelFullScreen ||
                        document.webkitExitFullscreen ||
                        document.msExitFullscreen;
                    if (exitFullScreen)
                        exitFullScreen.bind(document)();
                }
                else {
                    const requestFullscreen = (_f = (_d = (_b = (_a = mainContainer.current) === null || _a === void 0 ? void 0 : _a.requestFullscreen) !== null && _b !== void 0 ? _b : (_c = mainContainer.current) === null || _c === void 0 ? void 0 : _c.mozRequestFullScreen) !== null && _d !== void 0 ? _d : (_e = mainContainer.current) === null || _e === void 0 ? void 0 : _e.webkitRequestFullscreen) !== null && _f !== void 0 ? _f : (_g = mainContainer.current) === null || _g === void 0 ? void 0 : _g.msRequestFullscreen;
                    if (requestFullscreen)
                        requestFullscreen.bind(mainContainer.current)();
                }
                return !prev;
            });
        }
    };
    const handleFullScreenMobile = () => {
        const mobileDiv = document.querySelector("[class*=flexRowContent--playerContainer]");
        if (mobileDiv) {
            mobileDiv.onfullscreenchange = () => {
                var _a;
                const fullScreenElement = ((_a = document.fullscreenElement) !== null && _a !== void 0 ? _a : document.mozFullScreenElement) ||
                    document.webkitFullscreenElement ||
                    document.msFullscreenElement;
                if (fullScreenElement)
                    return;
                const exitFullScreen = document.exitFullscreen ||
                    document.mozCancelFullScreen ||
                    document.webkitExitFullscreen ||
                    document.msExitFullscreen;
                if (exitFullScreen)
                    exitFullScreen.bind(document)();
                setFullScreen(false);
            };
            setFullScreen((prev) => {
                var _a, _b;
                if (prev) {
                    const exitFullScreen = document.exitFullscreen ||
                        document.mozCancelFullScreen ||
                        document.webkitExitFullscreen ||
                        document.msExitFullscreen;
                    if (exitFullScreen)
                        exitFullScreen.bind(document)();
                    else
                        (_a = videoEl.current) === null || _a === void 0 ? void 0 : _a.webkitExitFullScreen();
                }
                else {
                    const requestFullscreen = mobileDiv.requestFullscreen ||
                        mobileDiv.mozRequestFullScreen ||
                        mobileDiv.webkitRequestFullscreen ||
                        mobileDiv.msRequestFullscreen;
                    if (requestFullscreen)
                        requestFullscreen.bind(mobileDiv)();
                    else
                        (_b = videoEl.current) === null || _b === void 0 ? void 0 : _b.webkitEnterFullscreen();
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
    const checkIfWebKit = react_1.useCallback(() => {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("chrome") === ua.indexOf("android") &&
            ua.indexOf("safari") !== -1) {
            // accessed via a WebKit-based browser
            return true;
        }
        return (ua.indexOf("ipad") !== -1 ||
            ua.indexOf("iphone") !== -1 ||
            ua.indexOf("ipod") !== -1);
    }, []);
    const buttonRenderer = (playerStatus, { mute, picture, screen, firstMuted }) => (react_1.default.createElement(react_1.default.Fragment, null, playerStatus === PLAYING || playerStatus === IDLE ? (firstMuted ? (react_1.default.createElement("div", { role: "button", tabIndex: 0, className: "player-video-central-button-position player-video-central-button-background", onClick: handleMute, onKeyDown: handleNothing },
        react_1.default.createElement(IconCustom_1.default, { id: "muted-grounded-live-streaming", size: 100, viewBox: "0 0 400 400" }))) : (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { role: "button", tabIndex: 0, className: "player-video-central-button-position player-video-central-button-background", onClick: handleMainButton, onKeyDown: handleNothing, "data-status": playerStatus },
            react_1.default.createElement(IconCustom_1.default, { id: `${playerStatus === PLAYING ? "pause" : "play"}-grounded-live-streaming`, size: 100, viewBox: "0 0 400 400" })),
        react_1.default.createElement("div", { role: "button", tabIndex: 0, className: "player-video-picture-button-position player-video-button-flex", onClick: handlePictureAndPicture, onKeyDown: handleNothing },
            react_1.default.createElement(IconCustom_1.default, { id: `picture-and-picture${picture ? "" : "-alt"}-live-streaming`, size: 40, viewBox: "0 0 400 400" })),
        react_1.default.createElement("div", { role: "button", tabIndex: 0, className: "player-video-mute-button-position player-video-button-flex", onClick: handleMute, onKeyDown: handleNothing },
            react_1.default.createElement(IconCustom_1.default, { id: `volume-${mute ? "off" : "up"}-live-streaming`, size: 40, viewBox: "0 0 400 400" })),
        react_1.default.createElement("div", { role: "button", tabIndex: 0, className: "player-video-fullscreen-button-position player-video-button-flex", onClick: handleFullScreen, onKeyDown: handleNothing },
            react_1.default.createElement(IconCustom_1.default, { id: `fullscreen${screen ? "-exit" : ""}-live-streaming`, size: 40, viewBox: "0 0 400 400" }))))) : status === BUFFERING ? (react_1.default.createElement("div", { className: "player-video-central-button-position player-video-central-button-background", "data-status": playerStatus },
        react_1.default.createElement(IconCustom_1.default, { id: "loading-grounded-live-streaming", size: 100, viewBox: "0 0 400 400" }))) : null));
    const MainButtonRenderer = react_1.useMemo(() => buttonRenderer(status, {
        mute: muted,
        picture: pictureInPicture,
        screen: fullScreen,
        firstMuted: firstTimeMuted,
    }), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [status, muted, pictureInPicture, fullScreen, firstTimeMuted]);
    react_1.useEffect(() => {
        if (!videoEl.current)
            return () => { };
        player.pause();
        player.attachHTMLVideoElement(videoEl.current);
        player.load(streamUrl);
        player.play();
        player.setMuted(true);
        return () => { };
    }, [player, streamUrl]);
    react_1.useEffect(() => {
        const interval = setInterval(() => {
            setStatus(player.getState());
        }, 500);
        return () => clearInterval(interval);
    }, [player]);
    react_1.useLayoutEffect(() => {
        let fullInterval;
        if (videoEl.current) {
            videoEl.current.onleavepictureinpicture = () => setPictureInPicture(false);
            const isWebkit = checkIfWebKit();
            fullInterval = window.setInterval(() => {
                var _a, _b;
                if (isWebkit)
                    setFullScreen((_b = (_a = videoEl.current) === null || _a === void 0 ? void 0 : _a.webkitDisplayingFullscreen) !== null && _b !== void 0 ? _b : false);
            }, 500);
        }
        return () => {
            if (fullInterval)
                clearInterval(fullInterval);
        };
    }, [videoEl, checkIfWebKit]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { ref: mainContainer, className: "player-ui", onMouseOver: () => setOverlay(true), onMouseOut: () => setOverlay(false), onFocus: handleNothing, onBlur: handleNothing, style: { height: fullScreen ? "100vh" : "" } },
            react_1.default.createElement("video", { className: "player-video-el", controls: false, ref: videoEl, playsInline: true, muted: muted, id: "payer-video-el" }),
            react_1.default.createElement("div", { className: "player-video-hover player-video-grid", "data-visible": status === BUFFERING || firstTimeMuted
                    ? BUFFERING
                    : overlay
                        ? "on"
                        : "off" }, MainButtonRenderer),
            react_1.default.createElement("div", { className: "player-video-mobile" },
                react_1.default.createElement("div", { className: "player-video-mobile" },
                    firstTimeMuted && (react_1.default.createElement("div", { role: "button", tabIndex: 0, onClick: handleMute, onKeyDown: handleNothing, className: "player-video-mobile-muted" },
                        react_1.default.createElement(IconCustom_1.default, { id: "muted-grounded-live-streaming", size: 100, viewBox: "0 0 400 400" }))),
                    react_1.default.createElement("div", { role: "button", tabIndex: 0, onClick: handleFullScreenMobile, onKeyDown: handleFullScreenMobile, className: "player-video-mobile-fullscreen" },
                        react_1.default.createElement(IconCustom_1.default, { id: `fullscreen${fullScreen ? "-exit" : ""}-live-streaming`, size: 42, viewBox: "0 0 400 400" })),
                    !!((_a = videoEl === null || videoEl === void 0 ? void 0 : videoEl.current) === null || _a === void 0 ? void 0 : _a.requestPictureInPicture) && (react_1.default.createElement("div", { role: "button", tabIndex: 0, onClick: handlePictureAndPicture, onKeyDown: handlePictureAndPicture, className: "player-video-mobile-picture" },
                        react_1.default.createElement(IconCustom_1.default, { id: `picture-and-picture${pictureInPicture ? "" : "-alt"}-live-streaming`, size: 40, viewBox: "0 0 400 400" }))))))));
};
exports.default = StreamPlayer;
