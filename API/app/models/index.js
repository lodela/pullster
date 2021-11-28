const dbConfig = require('../db.config.js');
const mongoose = require('mongoose');
      mongoose.Promise = global.Promise;

const db = {
  mongoose: mongoose,
  url: dbConfig.url,
  users: [],
  survey: [],
  answers: []
};

db.users   = require('./users.model.js')(mongoose);
db.surveys = require('./surveys.model.js')(mongoose);
db.answers = require('./answer.model.js')(mongoose);

module.exports = db;
