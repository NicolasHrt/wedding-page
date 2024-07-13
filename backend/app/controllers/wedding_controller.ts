import type { HttpContext } from '@adonisjs/core/http'
import Wedding from '#models/wedding'
import Gallery from '#models/gallery'
import Program from '#models/program'
import Donation from '#models/donation'
import ProgramItem from '#models/program_item'


export default class WeddingController {
  public async index(ctx: HttpContext) {
    const weddings = await Wedding.query().preload('gallery').preload('user').preload('program', (programQuery) => {
      programQuery.preload('items')
    }).preload('donation')
    return ctx.response.json(weddings)
  }

  public async store(ctx: HttpContext) {
    const user = ctx.auth.user! // L'utilisateur actuellement authentifié

    const data = ctx.request.only(['title', 'date', 'address', 'color', 'gallery', 'program', 'donation'])

    // Create Gallery
    const galleryData = data.gallery
    const gallery = await Gallery.create(galleryData)

    // Create Donation
    const donationData = data.donation
    const donation = await Donation.create(donationData)

    // Create Program and ProgramItems
    const programData = data.program
    const program = await Program.create({ title: programData.title, description: programData.description })
    const programItemsData = programData.items

    for (const item of programItemsData) {
      await ProgramItem.create({ ...item, programId: program.id })
    }

    // Create Wedding with the created Gallery, Program, and Donation
    const wedding = await Wedding.create({
      title: data.title,
      date: data.date,
      address: data.address,
      color: data.color,
      galleryId: gallery.id,
      userId: user.id,
      programId: program.id,
      donationId: donation.id
    })

    return ctx.response.status(201).json(wedding)
  }

  public async show(ctx: HttpContext) {
    const wedding = await Wedding.query().where('id', ctx.params.id).preload('gallery').preload('user').preload('program', (programQuery) => {
      programQuery.preload('items')
    }).preload('donation').firstOrFail()
    return ctx.response.json(wedding)
  }

  public async update(ctx: HttpContext) {
    const wedding = await Wedding.findOrFail(ctx.params.id)

    const data = ctx.request.only(['title', 'date', 'address', 'color', 'gallery', 'program', 'donation'])

    // Update Gallery
    if (data.gallery) {
      const gallery = await Gallery.findOrFail(wedding.galleryId)
      gallery.merge(data.gallery)
      await gallery.save()
    }

    // Update Donation
    if (data.donation) {
      const donation = await Donation.findOrFail(wedding.donationId)
      donation.merge(data.donation)
      await donation.save()
    }

    // Update Program and ProgramItems
    if (data.program) {
      const program = await Program.findOrFail(wedding.programId)
      program.merge({ title: data.program.title, description: data.program.description })
      await program.save()

      // Update ProgramItems
      if (data.program.items) {
        await ProgramItem.query().where('programId', program.id).delete()
        for (const item of data.program.items) {
          await ProgramItem.create({ ...item, programId: program.id })
        }
      }
    }

    // Update Wedding
    wedding.merge({
      title: data.title,
      date: data.date,
      address: data.address,
      color: data.color
    })
    await wedding.save()

    return ctx.response.json(wedding)
  }

  public async destroy(ctx: HttpContext) {
    const wedding = await Wedding.findOrFail(ctx.params.id)
    await wedding.delete()
  }
}