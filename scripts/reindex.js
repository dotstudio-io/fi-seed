'use strict';

require('../server/globals')(global);
require('colors');

const CONSTS = require('fi-consts');

const requireDir = require('require-dir');
const schemas = require('fi-schemas');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

CONSTS.load(config('consts'));

const configs = requireDir(__serverdir + '/config');

schemas(mongoose, configs.schemas);

configs.database(() => {
  console.log('\nReindexing models...'.bold);

  var promises = [];

  for (let name in mongoose.models) {
    let model = mongoose.models[name];
    promises.push(model.ensureIndexes());
  }

  Promise.all(promises).then((res) => {
    console.log(`\n${ res.length } models reindexed!\n`.bold.green);
    process.exit();
  }).catch((err) => {
    console.log(`\nCouldn't reindex models!\n`.bold.red);
    console.error(err);
    process.exit(1);
  });
});
