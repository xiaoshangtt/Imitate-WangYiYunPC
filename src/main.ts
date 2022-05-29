import { createApp } from "vue";
import App from "./App.vue";
import vueRouter from "@/router/index";
import store from "@/store";
import lazyPlugin from "vue3-lazy";
import "@/assets/css/index.css";
import "@/assets/less/index.less";
import { registerDirectives } from "@/directives/index";

// import ImgLoading from "./assets/images/加载_loading-one.png"
import ImgError from "./assets/images/图片错误_error-picture.png"
import ImgLoading2 from "./assets/images/沙漏空_hourglass-null.png";

const app = createApp(App)

registerDirectives(app);
app.use(vueRouter);
app.use(store);
lazyPlugin.install(app, {
    loading: ImgLoading2,
    error: ImgError
})

app.mount("#app");
