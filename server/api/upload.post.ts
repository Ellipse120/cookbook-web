import fs from 'fs'
import path from 'path'
import { z } from 'zod'
import { sizeInMB } from '~/utils'

export default defineEventHandler(async (event) => {
  let fileName = ''
  let fileUrl = ''
  const MAX_FILE_SIZE = 1

  const formData = await readFormData(event).catch(() => {
    throw createError({
      statusCode: 500,
      message: 'Empty Form Data',
    })
  })

  const formDataSchema = z.object({
    fileName: z.string({
      message: 'Need fileName parameter',
    }),
    file: z.custom<File>()
      .refine(
        file => !!file,
        'Need file param',
      )
      .refine(
        file => sizeInMB(file?.size) <= MAX_FILE_SIZE,
        `File size exceeds maximum bytes (${MAX_FILE_SIZE}MB)`,
      ),
  })

  const val = Object.fromEntries(formData.entries())
  const validateForm = formDataSchema.safeParse(val)

  if (!validateForm.success) {
    throw createError({
      statusCode: 500,
      message: validateForm.error?.issues.map(c => c.message)?.join(';'),
    })
  }
  try {
    // formData?.forEach((file) => {
    //   fileName = `${Date.now()}_${Math.round(Math.random() * 100000)}_${
    //     file?.filename
    //   }`
    //
    //   const newPath = `${path.join('public', 'uploads', fileName)}`
    //
    //   fileUrl = path.join('/uploads', fileName)
    //   fs.writeFileSync(newPath, file?.data as Buffer)
    //
    //   result.push({
    //     fileName,
    //     url: fileUrl,
    //   })
    // })
    const file = formData.get('file') as File
    fileName = `${Date.now()}_${Math.round(Math.random() * 100000)}_${file?.name}`

    const newPath = `${path.join('public', 'uploads', fileName)}`

    fileUrl = path.join('/uploads', fileName)
    fs.writeFileSync(newPath, new DataView(await file?.arrayBuffer()))
  }
  catch (error: any) {
    throw createError(error)
  }

  return {
    fileName,
    url: fileUrl,
  }
})
