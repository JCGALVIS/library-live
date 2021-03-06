type LogLevel = 'debug' | 'error' | 'info' | 'warn'
type PlayerState = 'Buffering' | 'Ended' | 'Idle' | 'Playing' | 'Ready'

interface Quality {
    bitrate: number
    codecs: string
    name: string
    height: number
    width: number
}

interface BufferRange {
    end: number
    start: number
}

export interface MediaPlayer {
    addEventListener: (name: string, fn: (payload: Event) => void) => void
    attachHTMLVideoElement: (videoElement: HTMLVideoElement) => void
    delete: () => void
    getBufferDuration: () => number
    getBuffered: () => BufferRange
    getDisplayHeight: () => number
    getDisplayWidth: () => number
    getDuration: () => number
    getHTMLVideoElement: () => HTMLVideoElement
    getLiveLatency: () => number
    getPlaybackRate: () => number
    getPosition: () => number
    getQualities: () => Quality[]
    getQuality: () => Quality
    getSessionId: () => string | undefined
    getState: () => PlayerState
    getVersion: () => string
    getVolume: () => number
    isAutoQualityMode: () => boolean
    isAutoplay: () => boolean
    isLiveLowLatency: () => boolean
    isMuted: () => boolean
    isPaused: () => boolean
    load: (path: string, mediaType?: string) => void
    pause: () => void
    play: () => void
    removeEventListener: (name: string, fn: (payload: Event) => void) => void
    seekTo: (time: number) => void
    setAutoMaxBitrate: (bitrate: number) => void
    setAutoMaxQuality: (quality: Quality) => void
    setAutoQualityMode: (enable: boolean) => void
    setAutoplay: (enabled: boolean) => void
    setLiveLowLatencyEnabled: (enable: boolean) => void
    setLogLevel: (level: LogLevel) => void
    setMuted: (mute: boolean) => void
    setPlaybackRate: (rate: number) => void
    setQuality: (quality: Quality, adaptive?: boolean) => void
    setVolume: (volume: number) => void
}
