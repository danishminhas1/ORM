const { DateTime } = require('luxon');

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('applications').del();
  await knex('users').del();

  // Insert seed entries
  await knex('users').insert([
    {
      user_id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      created_at: DateTime.now().toISO(),
      is_active: true,
      last_login: DateTime.now().toISO()
    }
  ]);

  await knex('applications').insert([
    {
      application_id: 1,
      description: 'A web-based project management tool.',
      name: 'Project Manager',
      user_id: 1,
      is_active: 1,
      is_deleted: 0,
      last_report_generated: 'Weekly Progress Report',
      created_by: 1,
      created_at: DateTime.now().toISO(),
      updated_by: 1,
      updated_at: DateTime.now().toISO()
    },
    {
      application_id: 2,
      description: 'An e-commerce platform for various products.',
      name: 'E-Commerce Site',
      user_id: 1,
      is_active: 1,
      is_deleted: 0,
      last_report_generated: 'Sales Report Q1',
      created_by: 1,
      created_at: DateTime.now().toISO(),
      updated_by: 1,
      updated_at: DateTime.now().toISO()
    },
    {
      application_id: 3,
      description: 'A customer relationship management (CRM) system.',
      name: 'CRM Tool',
      user_id: 1,
      is_active: 1,
      is_deleted: 0,
      last_report_generated: 'Customer Engagement Report',
      created_by: 1,
      created_at: DateTime.now().toISO(),
      updated_by: 1,
      updated_at: DateTime.now().toISO()
    },
    {
      application_id: 4,
      description: 'A mobile app for fitness tracking.',
      name: 'Fitness Tracker',
      user_id: 1,
      is_active: 1,
      is_deleted: 0,
      last_report_generated: 'Monthly Activity Report',
      created_by: 1,
      created_at: DateTime.now().toISO(),
      updated_by: 1,
      updated_at: DateTime.now().toISO()
    }
  ]);
};
