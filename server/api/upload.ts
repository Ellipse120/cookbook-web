import fs from 'fs'
import path from 'path'
import formidable from 'formidable'

export default defineEventHandler(async (event) => {
  let files
  let oldPath = ''
  let newPath = ''
  let fileName = ''
  let fileUrl = ''

  const form = formidable({
    multiples: false,
    keepExtensions: true,
  })

  try {
    [, files] = await form.parse(event.node.req)

    fileName = `${Date.now()}_${Math.round(Math.random() * 100000)}_${
      files.file?.[0].originalFilename
    }`

    oldPath = files.file?.[0]?.filepath
    newPath = `${path.join('public', 'uploads', fileName)}`
    fileUrl = '/uploads/' + fileName

    fs.copyFileSync(oldPath, newPath)
  }
  catch (error: any) {
    throw createError(error)
  }

  return {
    fileName,
    url: fileUrl,
  }
})
