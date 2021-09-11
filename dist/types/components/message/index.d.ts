import type { Plugin } from "vue";
export declare type SFCWithinstall<T> = T & Plugin;
declare const _Message: SFCWithinstall<import("./src/types").IMessage>;
export default _Message;
export declare const TailMessage: SFCWithinstall<import("./src/types").IMessage>;
export * from "./src/types";
export declare const messageApi: SFCWithinstall<import("./src/types").IMessage>;
