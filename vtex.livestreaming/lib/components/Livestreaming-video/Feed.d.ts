/// <reference types="react" />
declare type FeedProps = {
    streamUrl: string;
};
declare const Feed: ({ streamUrl }: FeedProps) => JSX.Element | null;
export default Feed;
