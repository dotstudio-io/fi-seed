'use strict';

const path = require('path');
const os = require('os');

const env = process.argv.indexOf('--env');
const PACKAGE = require('./package.json');

let ENVIRONMENT = 'development';

if (env > -1) {
  ENVIRONMENT = process.argv[env + 1];
  console.log('-- Environment is [%s]', ENVIRONMENT);
} else {
  console.log('-- No environment specified. Using default [%s].', ENVIRONMENT);
}

const POST_DEPLOY = 'npm i --production && pm2 reload ecosystem.config.js';
const REPOSITORY_REF = 'origin/stable';
const DEVELOPMENT = 'development';
const PRODUCTION = 'production';
const STAGING = 'staging';
const USER = 'ubuntu';
const APP_PATH = path.normalize(path.resolve(
  path.join(path.sep, 'app', 'deploy', 'to', PACKAGE.name)
));

let exec_mode = 'cluster';
let instances = 0;
let watch;

/* Set development app options */
if (ENVIRONMENT === DEVELOPMENT) {
  exec_mode = 'fork';
  instances = 1;
  watch = [
    'package.json',
    'server'
  ];
}

module.exports = {
  /**
   * Application configuration section.
   *
   * @see http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [{
    name: PACKAGE.name,
    script: PACKAGE.main,
    instances,
    exec_mode,
    env: {},
    watch,
    env_development: {
      NODE_ENV: DEVELOPMENT,
      DEBUG: 'app:*'
    },
    env_staging: {
      NODE_ENV: STAGING,
      DEBUG: 'app:*'
    },
    env_production: {
      NODE_ENV: PRODUCTION,
      DEBUG: ''
    }
  }],

  /**
   * Deployment section.
   *
   * @see http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    staging: {
      key: path.normalize(path.resolve(
        path.join(os.homedir(), 'path', 'to', 'credentials.pem')
      )),
      host: 'x.x.x.x',
      repo: PACKAGE.repository,
      ref: REPOSITORY_REF,
      path: APP_PATH,
      user: USER,
      env: {
        NODE_ENV: STAGING,
        DEBUG: 'app:*'
      },

      'post-deploy': `${ POST_DEPLOY } --env ${ STAGING }`
    },
    production: {
      key: path.normalize(path.resolve(
        path.join(os.homedir(), 'path', 'to', 'credentials.pem')
      )),
      host: 'x.x.x.x',
      repo: PACKAGE.repository,
      ref: REPOSITORY_REF,
      path: APP_PATH,
      user: USER,
      env: {
        NODE_ENV: PRODUCTION,
        DEBUG: ''
      },

      'post-deploy': `${ POST_DEPLOY } --env ${ PRODUCTION }`
    }
  }
};
