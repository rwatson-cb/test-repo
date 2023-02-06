import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import { DateTime } from 'luxon'

export default class TasksController {
  public async index ({ response }: HttpContextContract) {
    try{
      const tasks = await Task.all()
      return response.json({ tasks })
    } catch (error) {
      console.log(error)
    }
  }

  public async store ({ request, response }: HttpContextContract) {
    try{
      const data = request.only(['title', 'description'])
      Task.create({
        title: data.title,
        description: data.description,
      })
      return response.redirect('/home')
    } catch (error) {
      console.log(error)
    }
  }

  public async show ({ params: {id}, response }: HttpContextContract) {
    try{
      const task = await Task.find(id)
      if(!task) {
        return response.notFound({ error: 'Task not found' })
      }
      return response.json({ task })
    } catch (error) {
      console.log(error)
    }
  }

  public async complete ({ params: {id}, response }: HttpContextContract) {
    try{
      const task = await Task.find(id)
      if (!task) {
        return response.notFound({ error: 'Task not found' })
      }
      task.merge({
        is_completed: true,
        completed_at: DateTime.now(),
      }).save()
      return response.redirect('/home')
    } catch (error) {
      console.log(error)
    }
  }

  // public async delete ({ params, response }: HttpContextContract) {
  //   try{
  //     const task = await Database.from('tasks').where('id', params.id).delete()
  //     return response.json(task)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
}
