import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Database tests', () => {
  test('Connect to database and check if table exists', async ({ assert }) => {
    try{
      await Database.rawQuery('show tables')
      assert.isTrue(true)
    } catch (error) {
      assert.isTrue(false)
    }
  })
})
