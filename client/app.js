/* jshint esnext: true */

import {Router}   from 'aurelia-router';
import bootstrap  from 'bootstrap';

export class App {

  static inject() {
    return [Router];
  }

  constructor(router) {
    this.router = router;

    this.router.configure(config => {
      config.title = 'Aurelia';
      config.map([
        {
          route: '',
          moduleId: 'home',
          nav: true,
          title: 'Home'
        }
      ]);
    });
  }
}
