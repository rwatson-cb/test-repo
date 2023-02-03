import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import Task from 'App/Models/Task'

test.group('First test', () => {
  test('should display welcome page', async ({ client }) => {
    const response = await client.get('/')

    response.assertStatus(200)
    response.assertTextIncludes('<h1 class="title"> It Works! </h1>')
  })

  test('should display home page', async ({ client }) => {
    const response = await client.get('/home')

    response.assertStatus(200)
    response.assertTextIncludes('<h1 class="title"> ToDo: Home </h1>')
  })

  test('should display tasks', async ({ client }) => {
    const response = await client.get('/tasks')

    response.assertStatus(200)
    response.assertBodyContains({
      tasks: [],
    })
  })

  test('should display a specific task', async ({ client }) => {
    const task = await Task.create({
      title: 'Show test task',
      description: 'Show test description',
    })

    const getResponse = await client
      .get(`/tasks/${task.id}`)
    getResponse.assertStatus(200)
    getResponse.assertBodyContains({task: {
      id: task.id,
      title: 'Show test task',
      description: 'Show test description',
      is_completed: 0,
    }})
  })

  test('should not display a task that does not exist', async ({ client }) => {
    const response = await client.get('/tasks/-999')

    response.assertStatus(404)
    response.assertBodyContains({ error: 'Task not found' })
  })

  test('should store a tasks', async ({ client, assert }) => {
    const response = await client
      .post('/tasks')
      .form({
        title: 'Test task',
        description: 'Test description',
      })
    response.assertStatus(200) //should this not be a 302?
    response.assertRedirectsTo('/home')
    const check = await Database.from('tasks').where('title', 'Test task').select('*')
    assert.include(check[0], {
      title: 'Test task',
      description: 'Test description',
      is_completed: 0,
    })
  })

  test('should mark a task as complete', async ({ client, assert }) => {
    const task = await Task.create({
      title: 'Test task',
      description: 'Test description',
      is_completed: false,
      completed_at: null,
    })

    const response = await client.post(`/tasks/${task.id}/complete`)
    response.assertStatus(200)
    response.assertRedirectsTo('/home')

    const check = await Database
      .from('tasks')
      .where('id', task.id)
      .select('*')

    assert.isTrue(!!check[0].is_completed)
  })

  test('should not mark a task that does not exist as complete', async ({ client }) => {
    const response = await client.post('/tasks/word/complete')
    response.assertStatus(404)
    response.assertBodyContains({ error: 'Task not found' })
  })
})
