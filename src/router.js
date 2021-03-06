import { createRouter, createWebHistory } from 'vue-router';


import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue'
import NotFound from './pages/NotFound.vue'
import TeamsFooter from './pages/TeamsFooter.vue'
import UsersFooter from './pages/UsersFooter.vue'

const router = new createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' }, // redirect from root
    { name: 'teams',
      path: '/teams',
      meta: { needsAuth: true },
      components: { default: TeamsList, footer: TeamsFooter } ,
      children: [
        { name: 'team-members', path: ':teamId', component: TeamMembers, props: true} // e.g. teams/t1
      ]
    }, // domain-name.com/teams ==> ... we could use alias: '/' here but alias won't change content/url?
    { path: '/users',
      components: {
        default: UsersList,
        footer: UsersFooter
      },
      beforeEnter(to, from, next) {
        console.log('users beforeEnter')
        console.log(to, from)
        next()
      }
    }, // domain-name.com/users ==> ...
    { path: '/:notFound(.*)', component: NotFound } // dynamic segment catch any route not handled - must be LAST in routes list
  ],
  linkActiveClass: 'active',

  // Note _ and _2 are used to indicate we don't intend to use these params (we just want savedPosition)
  scrollBehavior(_, _2, savedPosition) {
  // scrollBehavior(to, from, savedPosition) {

    // useful for back button
    if (savedPosition) {
      return savedPosition
    }
    return { left: 0, top: 0} // take us to the top
  }
});

// NavigationGuard: called before navigation
router.beforeEach(function(to, from, next) {
  console.log('Global beforeEach()')
  console.log(to,from)

  // example of using meta for a global route guard for authenticated routes
  if (to.meta.needsAuth) {
    console.log('Needs auth!')
    next()
  } else {
    next() // true | false | String (route)
  }
})

// can't use it to control what user sees on screen
// could be useful for app analytics (where did user go from here to there)
router.afterEach(function(to, from) {
  console.log('Global afterEach()')
  console.log(to, from)
})

export default router