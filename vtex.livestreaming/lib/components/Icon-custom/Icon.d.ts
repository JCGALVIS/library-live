import { ReactNode } from "react";
declare type Props = {
    readonly id?: string;
    readonly fill?: string;
    readonly width?: number;
    readonly height?: number;
    readonly viewBox?: string;
    readonly className?: string;
    readonly xmlns?: string;
    readonly xmlnsXlink?: string;
    readonly children?: ReactNode;
};
declare const Icon: {
    ({ children, ...props }: Props): JSX.Element;
    defaultProps: {
        xmlns: string;
        xmlnsXlink: string;
    };
};
export default Icon;
