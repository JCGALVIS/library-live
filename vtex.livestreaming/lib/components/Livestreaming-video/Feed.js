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
const StreamPlayer_1 = __importDefault(require("./StreamPlayer"));
const Feed = ({ streamUrl }) => {
    const { IVSPlayer } = window;
    const { isPlayerSupported, MediaPlayer } = IVSPlayer;
    const player = react_1.useRef(null);
    const [playerCurrent, setPlayerCurrent] = react_1.useState(false);
    react_1.useEffect(() => {
        const { ENDED, PLAYING, READY } = IVSPlayer.PlayerState;
        const { ERROR } = IVSPlayer.PlayerEventType;
        if (!isPlayerSupported) {
            console.warn("The current browser does not support the Amazon IVS player.");
            return;
        }
        const onStateChange = () => { };
        const onError = (err) => {
            console.warn("Player Event - ERROR:", err.message);
            setTimeout(() => {
                setPlayerCurrent(false);
                setPlayerCurrent(true);
            }, 5000);
        };
        player.current = IVSPlayer.create();
        player.current.addEventListener(READY, onStateChange);
        player.current.addEventListener(PLAYING, onStateChange);
        player.current.addEventListener(ENDED, onStateChange);
        player.current.addEventListener(ERROR, onError);
        setPlayerCurrent(true);
        return () => {
            player.current.removeEventListener(READY, onStateChange);
            player.current.removeEventListener(PLAYING, onStateChange);
            player.current.removeEventListener(ENDED, onStateChange);
            player.current.removeEventListener(ERROR, onError);
        };
    }, [IVSPlayer, isPlayerSupported, streamUrl]);
    if (!isPlayerSupported) {
        return null;
    }
    return playerCurrent ? (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(StreamPlayer_1.default, { player: player.current, streamUrl: streamUrl }))) : (react_1.default.createElement("div", null));
};
exports.default = Feed;
