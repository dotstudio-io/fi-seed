'use strict';

const rut = require('fi-rut');
const walk = require('walk');
const path = require('path');
const is = require('fi-is');
const fs = require('fs');

const Chance = require('chance');
const chance = new Chance();

const UNDER = '_';
const JS = '.js';

const WORD = {
  length: 8
};

const SENTENCE = {
  words: 8
};

const PARAGRAPH = {
  sentences: 8
};

module.exports = (config) => {

  /**
   * @returns A random mailinator email.
   */
  function randomEmail() {
    return randomAlpha() + '@mailinator.com';
  }

  /**
   * Recicle data from a mock object
   *
   * @param {any} mock
   * @param {any} many
   * @returns
   */
  function recicleMock(mock, many) {
    if (is.number(many) && many > 0) {
      return createMultipleMocks(mock, many);
    }

    var rec = {};

    var REPLACER = {
      rut: randomRut(),
      email: randomEmail(),
      code: randomNumber()
    };

    for (var _v in mock) {
      rec[_v] = REPLACER[_v] || mock[_v];
    }

    return rec;
  }

  /**
   * Perform a mock recicle several times
   *
   * @param {any} mock
   * @param {any} arraySize
   * @returns
   */
  function createMultipleMocks(mock, arraySize) {
    var mocks = [];

    for (let i = 0; i < arraySize; i++) {
      mocks.push(recicleMock(mock));
    }

    return mocks;
  }

  /**
   * Return a random person name.
   *
   * @param {any} gender
   * @param {any} middle
   * @returns
   */
  function randomName(gender, middle) {

    return chance.name({
      gender: gender || 'male',
      middle: !middle
    });
  }

  /**
   * Return a random city name.
   *
   * @returns
   */
  function randomCity() {
    return chance.city();
  }

  /**
   * Return a random word.
   *
   * @param {any} length
   * @returns
   */
  function randomAlpha(length) {
    WORD.length = length || WORD.length;
    return chance.word(WORD);
  }

  /**
   * Return a random sentence
   *
   * @param {any} words
   * @returns
   */
  function randomSentence(words) {
    SENTENCE.words = words || WORD.words;
    return chance.sentence(SENTENCE);
  }

  /**
   *  Return a random paragraph
   *
   * @param {any} sentences
   * @returns
   */
  function randomParagraph(sentences) {
    PARAGRAPH.sentences = sentences || WORD.sentences;
    return chance.paragraph(PARAGRAPH);
  }

  /**
   *
   *
   * @param {any} max
   * @param {any} min
   * @returns
   */
  function randomNumber(max, min) {
    // True / False Random
    if (max === 1 && min === 0) {
      return Number(Math.random() >= 0.5);
    }

    max = max || 1000;
    min = min || 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;

  }

  /**
   * Generates a valid random rut
   *
   * @returns
   */
  function randomRut() {
    var _rut = randomNumber(10000000, 1000000);
    var ver = rut.calculate(_rut);

    _rut = String(_rut) + ver;

    return _rut;
  }

  /**
   * Creates a new read stream of the file for each call and returns it
   * in formData format.
   *
   * @param {any} file
   * @returns
   */
  function formDataFile(file) {

    var formData = {
      files: {
        value: fs.createReadStream(file.path),
        options: file.options
      }
    };

    return formData;

  }

  /**
   * Extracts CSRF token from a HTTP response.
   *
   * @param {any} res
   * @returns
   */
  function parseCSRF(res) {
    let csrf;

    csrf = res.headers['set-cookie'][0].split(' ')[0];
    csrf = csrf.substring(0, csrf.length - 1);
    csrf = csrf.split('=')[1];
    csrf = decodeURIComponent(csrf);

    return csrf;
  }

  /**
   * Connects to mongoose test database
   *
   * @param {*} mongoose
   * @param {*} cb
   */
  function database(mongoose, cb) {
    mongoose.Promise = Promise;

    mongoose.connect('mongodb://' + config.host + '/' + config.database, {
      useMongoClient: true
    }).then(() => cb).catch(err => {
      console.log(err);
      process.exit(1);
    });
  }

  /**
   * Creates a new Date object from every stringified date property in an object
   *
   * @param {any} _object
   * @returns
   */
  function formatDates(_object) {
    var date = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/;
    var object = Object.assign({}, _object);

    for (let variable in object) {
      if (object.hasOwnProperty(variable)) {
        let prop = object[variable];
        if (typeof prop === 'string' && date.test(prop)) {
          object[variable] = new Date(prop);
        }
      }
    }

    return object;
  }

  /**
   * Concatenate tests paths from a JSON object
   *
   * @param {any} root
   * @param {any} tests
   * @returns
   */
  function expandTestsJSON(root, tests) {
    var testFiles = [];

    if (is.not.object(tests)) {

      tests = (is.string(tests)) ? [tests] : tests;

      var files = tests.map((test) => {
        return root.concat('/', test);
      });

      return files;
    }

    for (let test in tests) {
      let slash = (is.empty(test)) ? '' : '/';
      let path = root.concat(slash, test);

      testFiles = testFiles.concat(expandTestsJSON(path, tests[test]));
    }

    return testFiles;
  }

  /**
   * Loads test files into mocha
   *
   * @param {any} mocha
   */
  function loadTests(mocha) {
    var tests = require(config.data.tests);
    var testFiles = expandTestsJSON(config.paths.tests, tests);

    testFiles.forEach((testFile) => {
      mocha.addFile(testFile);
    });

  }

  /**
   * Loads schema files into mongoose
   *
   * @param {any} mongoose
   */
  function loadSchemas(mongoose) {

    walk.walkSync(config.paths.schemas, {
      listeners: {
        file: (root, stats) => {
          var isPartial = is.startWith(stats.name, UNDER);
          var isJs = path.extname(stats.name) === JS;

          if (!isPartial && isJs) {
            var filename = stats.name.replace('.js', '');
            var filepath = path.join(root, stats.name);
            let schema = require(filepath).apply(this, [mongoose.Schema]);

            mongoose.model(filename, schema);
          }
        },
        errors: (root, stats) => {
          console.error(root, stats);
          throw new Error('Could not load schema data!');
        }
      }
    });

  }

  /**
   * Loads test mock data from a js file
   *
   */
  function loadMockData() {
    var mock = {};

    walk.walkSync(config.data.mock, {
      listeners: {
        file: (root, stats) => {
          var filename = stats.name.replace('.js', '');
          var filepath = path.join(root, stats.name);
          var file = require(filepath)(this);

          mock[filename] = file;

        },
        errors: (err, stats) => {
          console.log(err, stats);
          throw new Error('Could not load mock data!');
        }
      }
    });

    /**
     * Make mock data globally available
     */
    global.mock = mock;
  }

  return {

    // Random Data
    randomParagraph,
    randomSentence,
    randomNumber,
    randomAlpha,
    randomEmail,
    randomName,
    randomCity,
    randomRut,

    // Test format utils
    formDataFile,
    recicleMock,
    formatDates,
    parseCSRF,

    // Bootstraping functions
    loadMockData,
    loadSchemas,
    loadTests,
    database

  };
};