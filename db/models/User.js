const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'created_at'],

      properties: {
        user_id: { type: 'integer' },
        name: { type: 'string', maxLength: 255 },
        email: { type: 'string', maxLength: 255 },
        created_at: { type: 'string', format: 'date-time' }, // Use TIMESTAMP
        is_active: { type: 'boolean' }, // BOOLEAN
        last_login: { type: 'string', format: 'date-time' } // Use TIMESTAMP
      }
    };
  }

  static get relationMappings() {
    const Application = require('./Application');

    return {
      applications: {
        relation: Model.HasManyRelation,
        modelClass: Application,
        join: {
          from: 'users.user_id',
          to: 'applications.user_id'
        }
      },
      createdApplications: {
        relation: Model.HasManyRelation,
        modelClass: Application,
        join: {
          from: 'users.user_id',
          to: 'applications.created_by'
        }
      },
      updatedApplications: {
        relation: Model.HasManyRelation,
        modelClass: Application,
        join: {
          from: 'users.user_id',
          to: 'applications.updated_by'
        }
      }
    };
  }
}

module.exports = User;
