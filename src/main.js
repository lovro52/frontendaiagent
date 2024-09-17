import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// Clear access token on app load (for development)
localStorage.removeItem("accessToken");

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
