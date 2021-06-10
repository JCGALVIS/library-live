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
exports.LivestreamingVideo = void 0;
const react_1 = __importStar(require("react"));
const Feed_1 = __importDefault(require("./Feed"));
const IVS_PLAYER_MIN_JS = "https://player.live-video.net/1.2.0/amazon-ivs-player.min.js";
function LivestreamingVideo(streamUrl) {
    const [scriptVideoPlayer, setScriptVideoPlayer] = react_1.useState(false);
    const [isPlayerSupported, setIsPlayerSupported] = react_1.useState(false);
    react_1.useEffect(() => {
        if (!scriptVideoPlayer) {
            const script = document.createElement("script");
            script.src = IVS_PLAYER_MIN_JS;
            script.id = "IVS";
            script.async = true;
            document.body.appendChild(script);
            script.onload = () => {
                var _a;
                if ((_a = window === null || window === void 0 ? void 0 : window.IVSPlayer) === null || _a === void 0 ? void 0 : _a.isPlayerSupported) {
                    setIsPlayerSupported(true);
                }
            };
        }
        if (document.getElementById("IVS"))
            setScriptVideoPlayer(true);
    }, []);
    return (isPlayerSupported && (react_1.default.createElement("div", null,
        react_1.default.createElement(Feed_1.default, { streamUrl: streamUrl }))));
}
exports.LivestreamingVideo = LivestreamingVideo;
exports.default = LivestreamingVideo;
