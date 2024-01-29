import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  AiCrossref,
  BiPlusSquare,
  BiToggleOff,
  BiToggleOn,
  BiXCircle,
} from "oh-vue-icons/icons";
import { createApp } from "vue";

import "./style.scss";
import App from "./App.vue";

addIcons(AiCrossref, BiPlusSquare, BiToggleOff, BiToggleOn, BiXCircle);

const app = createApp(App);

// eslint-disable-next-line vue/component-definition-name-casing
app.component("v-icon", OhVueIcon);
app.mount("#app");
