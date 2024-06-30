import type { HttpContext } from '@adonisjs/core/http'
import Wedding from '#models/wedding'
import Gallery from '#models/gallery'

export default class WeddingController {
  public async index(ctx: HttpContext) {
    const wedding = await Wedding.query().preload('gallery').preload('user')
    return ctx.response.json(wedding)
  }

  public async store(ctx: HttpContext) {
    const user = ctx.auth.user! // L'utilisateur actuellement authentifié
    const data = ctx.request.only(['title', 'date', 'address', 'color', 'gallery'])


    const galleryData = data.gallery

    // Create Gallery
    const gallery = await Gallery.create(galleryData)

    // Create Wedding with the created Gallery and authenticated user
    const wedding = await Wedding.create({

      title: data.title,
      date: data.date,
      address: data.address,
      color: data.color,
      galleryId: gallery.id,
      userId: user.id
    })

    return ctx.response.status(201).json(wedding)
  }

  public async show(ctx: HttpContext) {
    const wedding = await Wedding.query().where('id', ctx.params.id).preload('gallery').preload('user').firstOrFail()
    return ctx.response.json(wedding)
  }

  public async update(ctx: HttpContext) {
    const data = ctx.request.only(['title', 'date', 'address', 'color', 'gallery'])
    const wedding = await Wedding.findOrFail(ctx.params.id)

    if (data.gallery) {
      const gallery = await Gallery.findOrFail(wedding.galleryId)
      gallery.merge(data.gallery)
      await gallery.save()
    }

    wedding.merge(data)
    await wedding.save()
    return ctx.response.json(wedding)
  }

  public async destroy(ctx: HttpContext) {
    const wedding = await Wedding.findOrFail(ctx.params.id)
    await wedding.delete()
  }
}
