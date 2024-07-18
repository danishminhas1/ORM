const { Model } = require('objection');

class Application extends Model {
  static get tableName() {
    return 'applications';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'user_id', 'created_at'],

      properties: {
        application_id: { type: 'integer' },
        description: { type: 'string', maxLength: 500 },
        name: { type: 'string', maxLength: 255 },
        user_id: { type: 'integer' }, // Changed to integer
        is_active: { type: 'integer' }, // INTEGER
        is_deleted: { type: 'integer' }, // INTEGER
        last_report_generated: { type: 'string', maxLength: 255 },
        created_by: { type: 'integer' }, // Changed to integer
        created_at: { type: 'string', format: 'date-time' }, // Use TIMESTAMP
        updated_by: { type: 'integer' }, // Changed to integer
        updated_at: { type: 'string', format: 'date-time' } // Use TIMESTAMP
      }
    };
  }

  static get relationMappings() {
    const User = require('./User');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'applications.user_id',
          to: 'users.user_id'
        }
      },
      createdBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'applications.created_by',
          to: 'users.user_id'
        }
      },
      updatedBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'applications.updated_by',
          to: 'users.user_id'
        }
      }
    };
  }
}

module.exports = Application;
