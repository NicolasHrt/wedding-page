import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Gallery extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare mod: string

  @column()
  declare title: string

  @column()
  declare images: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}