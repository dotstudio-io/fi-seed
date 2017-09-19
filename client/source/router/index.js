import Vue from 'vue';
import Router from 'vue-router';

import NotFoundComponent from '@/components/NotFound.vue';
import HelloComponent from '@/components/Hello.vue';
import WorldComponent from '@/components/World.vue';

Vue.use(Router);

export default new Router({
  mode: 'history', // No #

  routes: [{
    path: '/',
    name: 'Hello',
    component: HelloComponent
  }, {
    path: '/world',
    name: 'World',
    component: WorldComponent
  }, {
    path: '*',
    component: NotFoundComponent
  }]
});
