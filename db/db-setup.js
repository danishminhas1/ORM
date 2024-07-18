const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('./knexfile');

// Initialize knex connection
const knex = Knex(knexConfig.development);

// Bind all Models to the knex instance
Model.knex(knex);

module.exports = knex;
