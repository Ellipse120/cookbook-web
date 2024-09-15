import { createReadStream } from 'fs'
import { sendStream } from 'h3'

export default defineEventHandler(async (event) => {
  /**
   * Read file stream to page
   */
  const stream = createReadStream('poems1.json', {
    encoding: 'utf-8'
    // start: 50,
    // end: 2048,
    // highWaterMark: 32,
  })
    // .on('data', (v) => {
  // console.log(v, v.length);
    // })
    .on('error', (error) => {
      throw createError({
        statusCode: 500,
        message: error.message
      })
    })

  return sendStream(event, stream)
})
