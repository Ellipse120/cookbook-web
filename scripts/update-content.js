import { existsSync, statSync } from 'fs'
import { $, chalk, echo, spinner } from 'zx'

echo`running task...`
/*
  1. check has content folder
    1-1 no: run clone
    1-2 yes: git fetch check
*/
const folder = '../content/'
const v = existsSync(folder)

if (v) {
  if (statSync(folder + '.git')) {
    const a = await spinner('Updating...', () => $`git pull`)
    console.log(chalk(a.stdout))
  }
  else {
    console.log(chalk('no such file or directory'))
  }
}
else {
  const p = await $`git clone git@github.com:JamesLuAndJinpingcloud/codeSnippets.git content/`

  console.log(p)
}
