exports.up = async function (knex) {
    // Create the users table
    await knex.schema.createTable('users', (table) => {
      table.integer('user_id').primary();
      table.string('name', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.boolean('is_active').defaultTo(true);
      table.timestamp('last_login');
    });
  
    // Create the applications table
    await knex.schema.createTable('applications', (table) => {
      table.increments('application_id').primary(); // SERIAL equivalent in Objection
      table.string('description', 500);
      table.string('name', 255).notNullable();
      table.integer('user_id').notNullable(); // FOREIGN KEY
      table.integer('is_active').defaultTo(1);
      table.integer('is_deleted').defaultTo(0);
      table.string('last_report_generated', 255);
      table.integer('created_by'); // FOREIGN KEY
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.integer('updated_by'); // FOREIGN KEY
      table.timestamp('updated_at');
  
      // Foreign Key Constraints
      table.foreign('user_id').references('user_id').inTable('users');
      table.foreign('created_by').references('user_id').inTable('users');
      table.foreign('updated_by').references('user_id').inTable('users');
    });
  };
  
  exports.down = async function (knex) {
    // Drop the applications table first to avoid foreign key constraints
    await knex.schema.dropTableIfExists('applications');
    await knex.schema.dropTableIfExists('users');
  };
  