import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import User from '#models/user'
import Gallery from '#models/gallery'
import Program from './program.js'
import Donation from './donation.js'
export default class Wedding extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare url: string
  
  @column()
  declare title: string

  @column.dateTime()
  declare date: DateTime

  @column()
  declare address: string

  @column()
  declare color: string

  @column()
  declare galleryId: number

  @column()
  declare userId: number

  @column()
  declare programId: number

  @column()
  declare donationId: number

  @belongsTo(() => Gallery)
  declare gallery: BelongsTo<typeof Gallery>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Program)
  declare program: BelongsTo<typeof Program>

  @belongsTo(() => Donation)
  declare donation: BelongsTo<typeof Donation>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}