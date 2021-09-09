<template>
    <transition
        name="tail-mess-fade"
        @before-leave="onClose"
        @after-leave="$emit('destroy')"
        v-bind="fallthroughMethods"
    >
        <div
            v-show="visible"
            :class="[
                'tail-message flex items-center justify-between absolute mx-auto bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-sm shadow-md h-auto',
                `border-l-4 border-${accentColor}-500`,
                position,
            ]"
            :style="customStyle"
            @mouseleave="startTimer"
            @mouseenter="clearTimer"
        >
            <div class="flex items-center justify-center">
                <i
                    v-if="showIcon"
                    :class="['icon py-2 pl-1 pr-3', `text-${accentColor}-500`]"
                >
                    <slot name="icon">
                        <icon-park :type="icon" size="18" />
                    </slot>
                </i>

                <slot>
                    <p v-if="dangerouslyUseHTMLString" class="px-5 py-2">
                        {{ message }}
                    </p>
                    <p v-else v-html="message" />
                </slot>
            </div>

            <div
                v-if="closeable"
                class="
                    tail-message-close-btn
                    flex
                    items-center
                    justify-between
                    ml-2
                    border-transparent
                    rounded-full
                    p-1
                    hover:bg-gray-100
                    focus:bg-gray-300
                "
                @click.stop="close"
            >
                <slot name="closeIcon">
                    <icon-park type="close-one" size="18" />
                </slot>
            </div>
        </div>
    </transition>
</template>
<script lang="ts">
import {
    computed,
    defineComponent,
    getCurrentInstance,
    onBeforeUnmount,
    onMounted,
    PropType,
    ref,
} from "vue";
import { CloseOne, Info, Error, Success, Attention } from "@icon-park/vue-next";
import { MessageVM, IMessageOrigin, MessageType } from "./types";
import { on, off } from "../../../utils/dom";
import { Indexable } from "../../../utils/types";
import { IconPark } from "@icon-park/vue-next/es/all";
export type TailCompVariant = "outlined" | "filled" | "accent";

export const useTransitionFallthrough = () => {
    // @ts-ignore
    const { emit } = getCurrentInstance();
    return {
        onAfterEnter: () => {
            emit("after-enter");
        },
        onAfterLeave: () => {
            emit("after-leave");
        },
        onBeforeLeve: () => {
            emit("before-leave");
        },
    };
};

const TypeMap: Indexable<string> = {
    success: "green",
    info: "blue",
    warning: "orange",
    error: "red",
};

const IconMap: Indexable<string> = {
    success: "success",
    info: "info",
    warn: "attention",
    error: "error-prompt",
};
export default defineComponent({
    name: "TailMessageContainer",
    props: {
        anchorOrigin: {
            type: Object as PropType<IMessageOrigin>,
            default: {
                vertical: "top",
                horizontal: "center",
            },
        },
        dangerouslyUseHTMLString: { type: Boolean, default: false },
        message: {
            type: [String, Object] as PropType<string | MessageVM>,
            default: "",
        },
        onClose: {
            type: Function as PropType<() => void>,
            required: true,
        },
        closeable: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: "info",
        },
        duration: {
            type: Number,
            default: 3000,
        },
        showIcon: {
            type: Boolean,
            default: false,
        },
        offset: { type: Number, default: 20 },
        zIndex: { type: Number, default: 0 },
    },
    components: {
        CloseOne,
        Info,
        Error,
        Success,
        Attention,
        IconPark,
    },
    emits: ["destroy", "after-leave", "after-enter"],
    setup(props) {
        const fallthroughMethods = useTransitionFallthrough();
        const accentColor = computed(() => {
            const type = props.type;
            const color = type && TypeMap[type] ? TypeMap[type] : "green";
            return color;
        });
        const position = computed(() => {
            const anchorOrigin = props.anchorOrigin;
            const horizontal = anchorOrigin.horizontal;
            const vertical = anchorOrigin.vertical;
            let positionClass = [];
            positionClass.push(`${vertical}-0`);
            if (horizontal === "center") {
                positionClass.push(
                    `justify-center left-1/2 transform -translate-x-1/2`
                );
            } else {
                positionClass.push(`${horizontal}-2`);
            }
            console.log(positionClass);
            return positionClass.join(" ");
        });
        const icon = computed(() => {
            const type = props.type as MessageType;
            return IconMap[type];
        });
        const customStyle = computed(() => {
            const verticalOrigin = props.anchorOrigin.vertical;
            if (verticalOrigin === "top") {
                return {
                    top: `${props.offset}px`,
                    zIndex: props.zIndex,
                };
            } else {
                return {
                    bottom: `${props.offset}px`,
                    zIndex: props.zIndex,
                };
            }
        });
        const visible = ref(false);
        let timer: number | null = null;
        function startTimer() {
            if (props.duration > 0) {
                timer = window.setTimeout(() => {
                    if (visible.value) {
                        close();
                    }
                }, props.duration);
            }
        }
        function clearTimer() {
            if (timer !== null) {
                clearTimeout(timer);
                timer = null;
            }
        }
        function close() {
            visible.value = false;
        }
        function keydown({ code }: KeyboardEvent) {
            if (code === "esc") {
                if (visible.value) {
                    close();
                }
            } else {
                startTimer();
            }
        }
        onMounted(() => {
            startTimer();
            visible.value = true;
            // @ts-ignore
            on(document, "keydown", keydown);
        });
        onBeforeUnmount(() => {
            // @ts-ignore
            off(document, "keydown", keydown);
        });

        return {
            customStyle,
            accentColor,
            position,
            icon,
            visible,
            close,
            clearTimer,
            startTimer,
            fallthroughMethods,
        };
    },
});
</script>

<style lang="less" scoped>
.tail-mess-fade-enter-active,
.tail-mess-fade-leave-active {
    transition: opacity 0.5s ease-out;
}

.tail-mess-fade-enter-from,
.tail-mess-fade-leave-to {
    opacity: 0;
}
</style>
