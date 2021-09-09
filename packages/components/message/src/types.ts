import { VNode } from "vue";

export type MessageType = "success" | "warn" | "info" | "error" | "";

export interface IMessageHandle {
    close: () => void;
}

export type IMessageOrigin = {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
};

export type IMessageOptions = {
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

export type MessageParams = IMessageOptions | string;
export type TypedMessageParams<T extends MessageType> =
    | ({ type: T } & Omit<IMessageOptions, "type">)
    | string;

// 全局配置
export type IMessageConfig = {
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

export type MessageVM = VNode;
type MessageQueueItem = {
    vm: MessageVM;
};

export type MessageQueue = Array<MessageQueueItem>;
