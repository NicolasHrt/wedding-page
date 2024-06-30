import type { HttpContext } from '@adonisjs/core/http'

import Gallery from '#models/gallery'

export default class GalleryController {
  public async index({}: HttpContext) {
    return Gallery.all()
  }

  public async store({ request }: HttpContext) {
    const data = request.only(['mod', 'title', 'images', 'user_id'])
    const gallery = await Gallery.create(data)
    return gallery
  }

  public async show({ params }: HttpContext) {
    return Gallery.find(params.id)
  }

  public async update({ params, request }: HttpContext) {
    const data = request.only(['mod', 'title', 'images'])
    const gallery = await Gallery.findOrFail(params.id)
    gallery.merge(data)
    await gallery.save()
    return gallery
  }

  public async destroy({ params }: HttpContext) {
    const gallery = await Gallery.findOrFail(params.id)
    await gallery.delete()
  }
}
