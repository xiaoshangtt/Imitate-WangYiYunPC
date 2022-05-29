import { Directive } from "vue";

// 懒加载的指令v-lazyload
export const lazyload: Directive = {
    mounted(el, binding) {
        const value = binding.value;
        const arg = binding.arg || "src";

        // entries是一个数组，第零个元素就是监视的元素的对象，通过entriese[0].target可以获取到这个元素
        // IntersectionObserverEntry[] 是这个entries的类型，可以通过ctrl然后点击IntersectionObserver来查看需要传入的参数类型
        const callback = (entries: IntersectionObserverEntry[]) => {
            // 可以直接取第零个元素，也可以循环出来，反正就一个
            entries.forEach(item => {
                // 获取元素 也可以使用el
                const image = item.target;
                if (item.isIntersecting) {
                    image.setAttribute(arg, value);
                    Observer.unobserve(image);
                }
            })
        }
        const Observer = new IntersectionObserver(callback);
        Observer.observe(el);
    }
}