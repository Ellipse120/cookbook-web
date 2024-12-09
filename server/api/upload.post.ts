import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  let fileName = ''
  let fileUrl = ''

  const formData = await readMultipartFormData(event)

  try {
    fileName = `${Date.now()}_${Math.round(Math.random() * 100000)}_${
      formData?.[1]?.filename
    }`

    const newPath = `${path.join('public', 'uploads', fileName)}`

    fileUrl = path.join('/uploads', fileName)
    fs.writeFileSync(newPath, formData?.[1]?.data as Buffer)
  }
  catch (error: any) {
    throw createError(error)
  }

  return {
    fileName,
    url: fileUrl,
  }
})
