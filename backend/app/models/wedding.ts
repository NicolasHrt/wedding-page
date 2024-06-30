import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import User from '#models/user'
import Gallery from '#models/gallery'
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

  @belongsTo(() => Gallery)
  declare gallery: BelongsTo<typeof Gallery>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}