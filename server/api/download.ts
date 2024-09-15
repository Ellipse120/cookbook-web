import { createReadStream } from 'node:fs'
import { access, constants } from 'node:fs/promises'
import path from 'path'
import { sendStream, setHeader } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as { fileName: string }
  const filePath = path.join('public', query?.fileName)
  setHeader(event, 'Content-Type', 'application/octet-stream')

  try {
    setHeader(event, 'fileName', `${encodeURIComponent(query?.fileName)}`)
    await access(filePath, constants.F_OK)
    return sendStream(event, createReadStream(`${filePath}`))
  }
  catch {
    throw createError({
      statusCode: 500,
      message: '文件不存在'
    })
  }
})
