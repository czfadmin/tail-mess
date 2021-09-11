import { VNode } from "vue";
export declare type MessageType = "success" | "warn" | "info" | "error" | "";
export interface IMessageHandle {
    close: () => void;
}
export declare type IMessageOrigin = {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
};
export declare type IMessageOptions = {
    message?: string | VNode;
    onClose?: () => void;
    type?: MessageType;
    offset?: number;
    id?: string;
    zIndex?: number;
    anchorOrigin?: IMessageOrigin;
    showIcon?: boolean;
    closeable?: boolean;
};
export declare type MessageParams = IMessageOptions | string;
export declare type TypedMessageParams<T extends MessageType> = ({
    type: T;
} & Omit<IMessageOptions, "type">) | string;
export declare type IMessageConfig = {
    maxCount: number;
    showIcon: boolean;
    duration: number;
    iconVariant: "outline" | "filled" | "two-one";
    variant: "accent" | "filled";
    strokeLinecap: "butt" | "round" | "square";
};
export interface IMessage {
    options: IMessageConfig;
    (options?: MessageParams): IMessageHandle;
    success: (options?: TypedMessageParams<"success">) => IMessageHandle;
    warn: (options?: TypedMessageParams<"warn">) => IMessageHandle;
    info: (options?: TypedMessageParams<"info">) => IMessageHandle;
    error: (options?: TypedMessageParams<"error">) => IMessageHandle;
    closeAll(): void;
}
export declare type MessageVM = VNode;
declare type MessageQueueItem = {
    vm: MessageVM;
};
export declare type MessageQueue = Array<MessageQueueItem>;
export {};
