const { writeFileSync } = require('fs')
const { resolve } = require('path')
const fetch = require('node-fetch')
require('dotenv').config({
  path: resolve(process.cwd(), '.env.local')
})

async function start () {
  try {
    let res = await fetch('https://api.zenhub.com/v4/workspaces/296590488/open-milestones?workspaceId=5f6492205269c584ae1b576f', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Authentication-Token': process.env.ZENHUB_TOKEN,
      },
    })
    let cycles = await res.json()
    cycles = Object.values(cycles).flat()
    
    res = await fetch('https://api.zenhub.com/v5/workspaces/5f6492205269c584ae1b576f/issues?epics=1&estimates=1&pipelines=0&repo_ids=296590488', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-Authentication-Token': process.env.ZENHUB_TOKEN,
      },
    })
    const issues = await res.json()
    const bets = issues.filter(iss => iss.labels.length && iss.labels.find(label => label.name === 'Bet'))
    const scopes = issues.filter(iss => iss.labels.length && iss.labels.find(label => label.name === 'Scope'))

    const result = {
      cycles,
      bets,
      scopes,
    }

    writeFileSync(resolve(__dirname, '..', 'data.json'), JSON.stringify(result, null, '  '))
  } catch (e) {
    console.error(e)
  }
}

start()