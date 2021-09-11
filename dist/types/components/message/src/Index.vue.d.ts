import { PropType } from "vue";
import { MessageVM, IMessageOrigin } from "./types";
export declare type TailCompVariant = "outlined" | "filled" | "accent";
export declare const useTransitionFallthrough: () => {
    onAfterEnter: () => void;
    onAfterLeave: () => void;
    onBeforeLeve: () => void;
};
declare const _default: import("vue").DefineComponent<{
    anchorOrigin: {
        type: PropType<IMessageOrigin>;
        default: {
            vertical: string;
            horizontal: string;
        };
    };
    dangerouslyUseHTMLString: {
        type: BooleanConstructor;
        default: boolean;
    };
    message: {
        type: PropType<string | MessageVM>;
        default: string;
    };
    onClose: {
        type: PropType<() => void>;
        required: true;
    };
    closeable: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    showIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
}, {
    customStyle: import("vue").ComputedRef<{
        top: string;
        zIndex: number;
        bottom?: undefined;
    } | {
        bottom: string;
        zIndex: number;
        top?: undefined;
    }>;
    accentColor: import("vue").ComputedRef<string>;
    position: import("vue").ComputedRef<string>;
    icon: import("vue").ComputedRef<string>;
    visible: import("vue").Ref<boolean>;
    close: () => void;
    clearTimer: () => void;
    startTimer: () => void;
    fallthroughMethods: {
        onAfterEnter: () => void;
        onAfterLeave: () => void;
        onBeforeLeve: () => void;
    };
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("destroy" | "after-leave" | "after-enter")[], "destroy" | "after-leave" | "after-enter", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    anchorOrigin?: unknown;
    dangerouslyUseHTMLString?: unknown;
    message?: unknown;
    onClose?: unknown;
    closeable?: unknown;
    type?: unknown;
    duration?: unknown;
    showIcon?: unknown;
    offset?: unknown;
    zIndex?: unknown;
} & {
    type: string;
    message: string | MessageVM;
    onClose: () => void;
    offset: number;
    zIndex: number;
    anchorOrigin: IMessageOrigin;
    showIcon: boolean;
    closeable: boolean;
    dangerouslyUseHTMLString: boolean;
    duration: number;
} & {}> & {
    onDestroy?: (...args: any[]) => any;
    "onAfter-leave"?: (...args: any[]) => any;
    "onAfter-enter"?: (...args: any[]) => any;
}, {
    type: string;
    message: string | MessageVM;
    offset: number;
    zIndex: number;
    anchorOrigin: IMessageOrigin;
    showIcon: boolean;
    closeable: boolean;
    dangerouslyUseHTMLString: boolean;
    duration: number;
}>;
export default _default;
