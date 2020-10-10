import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue'
import NotFound from './components/nav/NotFound.vue'
import TeamsFooter from './components/teams/TeamsFooter.vue'
import UsersFooter from './components/users/UsersFooter.vue'

const router = new createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' }, // redirect from root
    { name: 'teams',
      path: '/teams',
      components: { default: TeamsList, footer: TeamsFooter } ,
      children: [
        { name: 'team-members', path: ':teamId', component: TeamMembers, props: true} // e.g. teams/t1
      ]
    }, // domain-name.com/teams ==> ... we could use alias: '/' here but alias won't change content/url?
    { path: '/users', components: {
      default: UsersList, footer: UsersFooter
    } }, // domain-name.com/users ==> ...
    { path: '/:notFound(.*)', component: NotFound } // dynamic segment catch any route not handled - must be LAST in routes list
  ],
  linkActiveClass: 'active'
});

const app = createApp(App)

app.use(router)

app.mount('#app');
