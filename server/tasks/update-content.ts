import { existsSync, statSync } from 'fs'
import { $, chalk, spinner } from 'zx'

export default defineTask({
  meta: {
    name: 'update-content',
    description: 'Update Code Snippets Repository To Latest',
  },
  async run() {
    const folder = 'content/'
    const v = existsSync(folder)
    let result = ''

    if (v) {
      if (statSync(folder + '.git')) {
        const a = await spinner('Updating CodeSnippets Repo:', () => $`cd content/;git pull --rebase`)
        result = a.stdout
      }
      else {
        console.log(chalk('no such file or directory'))
      }
    }
    else {
      const p = await $`git clone git@github.com:JamesLuAndJinpingcloud/codeSnippets.git ${folder}`

      result = p.stdout
    }

    return { result }
  },
})
