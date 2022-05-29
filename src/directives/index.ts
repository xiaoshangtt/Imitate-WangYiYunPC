import { App } from "vue";
import { tent } from "@/directives/v-tent"
import { lazyload } from "@/directives/v-lazyload";

export function registerDirectives(app: App) {
    app.directive("tent", tent);
    app.directive("lazyload", lazyload);
}