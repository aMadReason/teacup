import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import "./css/theme/index.css";
import "./css/theme/helpers.css";
import "./css/theme/themes/tea.css";
import "./css/style.css";
import App from "./App.vue";

import UIGame from "./components/UIGame.vue";
import UICredits from "./components/UICredits.vue";
import UINotFound from "./components/UINotFound.vue";
import UIMenu from "./components/UIMenu.vue";
import UIIntro from "./components/UIIntro.vue";

const routes = [
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: UINotFound },
  { path: '', name: 'home', component: UIIntro },
  { path: '/game', name: 'game', component: UIGame },
  { path: '/credits', name: 'credits', component: UICredits },
  { path: '/menu', name: 'menu', component: UIMenu }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


createApp(App).use(router).mount("#app");
