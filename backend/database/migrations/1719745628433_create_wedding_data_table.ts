import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'weddings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('url').unique().nullable
      table.string('title').notNullable()
      table.date('date').notNullable()
      table.string('address').notNullable()
      table.string('color').notNullable()
      table.integer('gallery_id').unsigned().references('id').inTable('galleries').onDelete('CASCADE')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('program_id').unsigned().references('id').inTable('programs').onDelete('CASCADE')
      table.integer('donation_id').unsigned().references('id').inTable('donations').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}