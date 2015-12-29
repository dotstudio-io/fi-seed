'use strict';

require('../server/globals')(global);
require('colors');

var database = require('../server/config/database');
var validator = require('validator');
var mongoose = require('mongoose');
var prompt = require('prompt');

/* Load roles data */
var roles = require('./statics/roles.json');

/* Register user schema in mongoose */
mongoose.model('user', require('../server/schemas/user')(mongoose.Schema));

function checkError(err) {
  if (err) {
    if (err.message === 'canceled') {
      console.log("\n\nAdministrator creation canceled!\n".yellow.bold);
      process.exit();
    }

    throw err;
  }
}

database(function (err) {
  checkError(err);

  console.log("\n\nCreating administrator's account...\n".bold);

  prompt.message = '';
  prompt.delimiter = '';

  prompt.start();

  prompt.get([{
    name: 'name',
    required: true,
    conform: value => value.match(/^[a-z\u00C0-\u02AB'´`]+\.?\s([a-z\u00C0-\u02AB'´`]+\.?\s?)+$/i),
    description: 'Enter administrator\'s name:',
    message: 'Name must contain only letters or spaces!'
  }, {
    name: 'email',
    required: true,
    conform: validator.isEmail,
    description: 'Enter administrator\'s email address:',
    message: 'Email must be a valid email address!'
  }, {
    name: 'password',
    required: true,
    conform: value => String(value).length > 3,
    description: 'Enter administrator\'s password:',
    message: 'Password must be at least 4 chars long!'
  }], function (err, administrator) {
    checkError(err);

    mongoose.model('user').find({
      roles: roles[0]._id /* Assuming role [0] is admin */
    }, function (err, users) {
      checkError(err);

      var exists = false;

      if (users.length) {
        if (users.length > 1) {
          console.log("\nThere are %d administrators already in the database:\n".bold, users.length);
        } else {
          console.log("\nAn administrator is already in the database:\n".bold);
        }

        users.forEach(function (user) {
          exists = user.email === administrator.email && !exists;

          console.log("Name:      %s" [exists ? 'red' : 'reset'], user.name);
          console.log("Email:     %s\n" [exists ? 'red' : 'reset'], user.email);
        });

        console.log("------");
      }

      if (exists) {
        console.log("\nAn administrator with the same email already exists!\n".bold.red);
        process.exit();
      }

      console.log("\nNew administrator account review:\n".bold);

      console.log("Name:      %s", administrator.name);
      console.log("Email:     %s", administrator.email);
      console.log("Password:  %s\n", administrator.password);

      prompt.get({
        name: 'answer',
        message: 'Type [Y] to add the new administrator:',
        required: true
      }, function (err, confirm) {
        checkError(err);

        if (!confirm.answer.match(/y/i)) {
          console.log("\nThe administrator was not created!\n".bold.yellow);
          process.exit();
        }

        mongoose.model('user').create({
          name: administrator.name,
          email: administrator.email,
          password: administrator.password,
          roles: [roles[0]._id]
        }, function (err, user) {
          checkError(err);

          if (user) {
            console.log("\nThe administrator was created successfully!\n".bold.green);
            process.exit();
          }

          console.log("\nThere was an unidetified problem when creating the administrator\n".bold.red);
          process.exit();
        });
      });
    });

  });

});
