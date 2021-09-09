// https://github.com/element-plus/element-plus
// 此组件基于element-plus中的message组件修改.
// 了解详情可去element-plus参考查看,顺便帮他点个Star,谢谢
import { ComponentPublicInstance, render } from "vue";
import { isVNode } from "vue";
import { createVNode } from "vue";
import {
    MessageQueue,
    IMessageOptions,
    MessageVM,
    IMessage,
    MessageParams,
    TypedMessageParams,
    MessageType,
    IMessageHandle,
} from "./types";
import MessageConstructor from "./Index.vue";

const instances: MessageQueue = [];
let seed = 0;
const Message: IMessage = function (
    opts: MessageParams = {} as MessageParams
): IMessageHandle {
    if (typeof opts === "string") {
        opts = {
            message: opts,
        };
    }
    let options: IMessageOptions = <IMessageOptions>opts;

    if (
        Message.options.maxCount &&
        instances.length >= Message.options.maxCount
    ) {
        (
            instances[0]?.vm.component?.proxy as ComponentPublicInstance<{
                visible: boolean;
            }>
        ).visible = false;
        console.log(instances.length);
    }

    // 垂直方向上的便宜
    let verticalOffset: number;

    verticalOffset = opts.offset || 20;
    instances.forEach(({ vm }) => {
        verticalOffset += (vm?.el?.offsetHeight || 0) + 16;
    });
    verticalOffset += 16;

    const id = `tail_mess_${seed++}`;

    const userOnClose = options.onClose;
    // 配置
    options = {
        showIcon: Message.options.showIcon ? Message.options.showIcon : false,
        ...options,
        message: `${id}:${options.message}`,
        onClose: () => {
            close(id, userOnClose);
        },
        offset: verticalOffset,

        id,
        zIndex: 10,
    };
    // 构建容器
    const container = document.createElement("div");
    container.className = `container_${id}`;
    const message = `${id}:${options.message}`;
    // 创建一个vm
    const vm = createVNode(
        MessageConstructor,
        options,
        isVNode(options.message) ? { default: () => message } : null
    );
    // @ts-ignore
    vm.props.onDestroy = () => {
        render(null, container);
    };

    // 在container 中渲染vm
    render(vm, container);
    instances.push({ vm });
    // @ts-ignore
    document.body.appendChild(container.firstElementChild);
    return {
        close: () => {
            (
                vm.component?.proxy as ComponentPublicInstance<{
                    visible: boolean;
                }>
            ).visible = false;
        },
    };
} as any;

function calcMessagePosition(idx: number, removedHeight: number) {
    for (let i = idx; i < instances.length; i++) {
        const vertical = (instances[i]?.vm?.props as IMessageOptions)
            .anchorOrigin?.vertical;
        const pos =
            parseInt(instances[i]?.vm?.el?.style[vertical || "top"], 10) -
            removedHeight -
            16;
        // @ts-ignore
        instances[i].vm.component.props.offset = pos;
    }
}

export function close(id: string, userOnClose?: (vm: MessageVM) => void): void {
    const idx = instances.findIndex(({ vm }) => {
        const { id: _id } = vm.props as any;
        return id === _id;
    });
    if (idx === -1) {
        return;
    }
    const { vm } = instances[idx];
    if (!vm) return;
    userOnClose?.(vm);
    // @ts-ignore
    const removedHeight = vm.el.offsetHeight;
    instances.splice(idx, 1);
    const len = instances.length;
    if (len < 1) return;
    calcMessagePosition(idx, removedHeight);
}

export function closeAll(): void {
    for (let i = instances.length - 1; i >= 0; i--) {
        const instance = instances[i].vm.component as any;
        instance.ctx.close();
    }
}

(["success", "warn", "info", "error"] as const).forEach((type) => {
    Message[type] = (options?: TypedMessageParams<MessageType>) => {
        if (typeof options === "string") {
            options = {
                message: options,
                type: type,
            };
        } else {
            if (options) {
                options.type = type;
            }
        }
        return Message(options);
    };
});

Message.closeAll = closeAll;
export default Message;
