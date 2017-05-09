'use strict';

require('../../server/globals')(global);
require('colors');

/* Utils */
const Converter = require('csvtojson').Converter;
const mongoose = require('mongoose');
const CONSTS = require('fi-consts');
const inflect = require('inflect');
const prompt = require('prompt');
const path = require('path');
const fs = require('fs');

/* Load constants to assign item roles */
CONSTS.load(config('consts'));

/* The database connection script */
const database = require(path.normalize(path.join(__serverdir, 'config', 'database.js')));

/* Enable mongoose promises */
mongoose.Promise = Promise;

module.exports =  (itemsName) => {

  if (!itemsName) {
    throw new Error('No llames a este archivo manualmente!');
  }

  /* Singular item name */
  const ITEM_NAME = inflect.singularize(itemsName);

  /* Plural items name */
  const ITEMS_NAME = inflect.pluralize(ITEM_NAME);

  /* Source csv filename */
  const CSV_FILENAME = 'items.csv'.replace('items', ITEMS_NAME);

  /* Error json filename */
  const ERROR_FILENAME = 'items_errorlog.json'.replace('items', ITEMS_NAME);

  /* Error log file path */
  const ERROR_FILE_PATH = path.normalize(path.join(__dirname, 'data', ERROR_FILENAME));

  /* Users data file path */
  const ITEMS_FILE_PATH = path.normalize(path.join(__dirname, 'data', CSV_FILENAME));

  /* item schema file path */
  const ITEMS_SCHEMA_PATH = path.normalize(path.join(__serverdir, 'schemas', ITEM_NAME));

  /* Mongoose item schema */
  const MONGOOSE_SCHEMA = require(ITEMS_SCHEMA_PATH).apply(this, [mongoose.Schema]);

  /* Utilitary objects */
  var errored = [];
  var saved = 0;
  var itemCount;
  var items;

  /**
   * @description Stops this script.
   *
   */
  function stopProcess() {
    console.log('\n  Abortado\n'.bold.yellow);
    process.exit(0);
  }

  /**
   * @description Loads a CVS file with the items data and stores it in JSON format.
   *
   * @param {Function} cb The callback function.
   */
  function loadCSVFile(cb) {
    console.log('  Cargando lista de items\n'.replace('items', ITEMS_NAME));

    var converter = new Converter({});
    converter.fromFile(ITEMS_FILE_PATH, function (err, _items) {
      if (err) {
        console.log('  No se pudo cargar la lista de items\n'.replace('items', ITEMS_NAME).bold.red, err);
        return stopProcess();
      }

      items = _items;
      itemCount = items.length;

      console.log('  Lista de items cargada!\n'.replace('items', ITEMS_NAME).bold.yellow);
      console.log('  ' + items.length.toString().bold.yellow + ' items cargados!\n'.replace('items', ITEMS_NAME).bold.yellow);
      cb();
    });
  }

  /**
   * @description
   *
   * Displays information about successful and errored inserts.
   * In case of error, prints a JSON file with the error log.
   *
   * @param {String} db The name of the database in use.
   * @param {Function} cb The callback function.
   */
  function onDone() {
    itemCount = items.length;

    if (saved) {
      console.log('  ' + saved.toString().bold.green + ' items insertados\n'.replace('items', ITEMS_NAME).bold.green);
      saved = 0;
    }

    if (!errored.length) {
      console.log('  Operación exitosa!\n'.bold.yellow);
      process.exit(0);
    }

    console.log('  ' + errored.length.toString().bold.red + ' items no pudieron ser insertados\n'.replace('items', ITEMS_NAME).bold.red);
    var content = JSON.stringify(errored);

    fs.writeFile(ERROR_FILE_PATH, content, function (err) {
      if (err) {
        console.log(err.bold.red);
      }
      console.log('  Porfavor revisa el archivo migration/data/errorlog para conocer los errores generados!\n'.bold.red);
      stopProcess();
    });

  }

  /**
   * @description
   *
   * Checks if every item has been processed.
   *
   */
  function nextItem() {
    if (--itemCount === 0) {
      onDone();
    }
  }

  /* Script initialization messages */
  console.log('\n  Script de importación de items para FI-SEED\n'.replace('items', ITEMS_NAME).cyan.bold);

  prompt.message = '  '.reset;
  prompt.delimiter = '';

  prompt.start();

  console.log('\n  IMPORTANTE: '.bold + 'El listado de items a ingresar debe ser guardado en la carpeta scripts/load/data en formato CSV con el nombre items.csv\n'.replace(new RegExp('items', 'g'), ITEMS_NAME));

  prompt.get([{
    name: 'answer',
    pattern: /^si|sí|no$/i,
    message: '  Porfavor ingrese ' + 'sí'.bold + ' o ' + 'no'.bold + '...',
    description: 'Continuar? (si/no)',
    required: true
  }], (err, result) => {
    if (err || !result.answer.match(/si|sí/i)) {
      stopProcess();
    }

    loadCSVFile(() => {

      database(() => {
        mongoose.model(ITEM_NAME, MONGOOSE_SCHEMA);

        items.forEach((item) => {

          mongoose.model(ITEM_NAME)
            .create(item)
            .then(() => {
              saved += 1;
              nextItem();

            })
            .catch((err) => {
              errored.push({
                item: item,
                error: err
              });

              nextItem();
            });
        });
      });
    });
  });
};