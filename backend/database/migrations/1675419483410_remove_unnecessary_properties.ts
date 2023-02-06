import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('priority')
      table.dropColumn('complete_by')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
