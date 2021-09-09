import { App } from "vue";
import { Plugin } from "vue";
import Message from "./src/message";
import { IMessageConfig } from "./src/types";
export type SFCWithinstall<T> = T & Plugin;
const _Message = Message as SFCWithinstall<typeof Message>;
_Message.install = (app: App, options: IMessageConfig) => {
    _Message.options = options;
    app.config.globalProperties.$mess = _Message;
};
export default _Message;
export const TailMessage = _Message;
export * from "./src/types";

export const messageApi = _Message;
