'use strict';

require('eventsource-polyfill');

const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');

hotClient.subscribe((event) => {
  /* eslint-env browser */
  if (event.action === 'reload') {
    window.location.reload();
  }
});
