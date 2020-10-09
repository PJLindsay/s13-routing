import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';

const router = new createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/teams', component: TeamsList }, // domain-name.com/teams ==> ...
    { path: '/users', component: UsersList }, // domain-name.com/users ==> ...
  ],
  linkActiveClass: 'active'
});

const app = createApp(App)

app.use(router)

app.mount('#app');
