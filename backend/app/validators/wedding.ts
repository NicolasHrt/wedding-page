import vine from '@vinejs/vine'
export const createWeddingValidator = vine.compile(
    vine.object({
      url: vine.string().trim().unique(async (db, value) => {
        const url = await db.from('wedding').where('url', value).first()
        return !url
      }

      )
    })
  )
