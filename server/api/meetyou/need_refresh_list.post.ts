import { writeFile, access, constants, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { remove } from 'es-toolkit/compat'

const filePath = 'public/meetyou/'
const fileName = 'baby_list.json'
const jsonPath = filePath + fileName

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const dates = body.dates
  const needRefresh = body.needRefresh

  let currentData = []

  await access(jsonPath, constants.F_OK)

  const content = await readFile(resolve(jsonPath), { encoding: 'utf-8' })

  currentData = JSON.parse(content)

  if (needRefresh && dates) {
    remove(currentData, item => item.date === dates)
    await writeFile(jsonPath, JSON.stringify(currentData, null, 2))
  }

  return {
    success: true,
  }
})
