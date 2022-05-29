import { Directive } from "vue";

// 将数字转化成 ...万或亿
export const tent: Directive = {
    mounted(el, binding) {
        let value = binding.value;
        if (value >= 100000000) {
            value = parseInt(String(value / 100000000)) + "亿";
        } else if (value >= 10000) {
            value = parseInt(String(value / 10000)) + "万";
        }
        el.innerHTML = value;
    }
}