const { writeFileSync } = require('fs')
const { resolve } = require('path')
const fetch = require('node-fetch')
const { graphql } = require('@octokit/graphql')
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
    const pitches = issues.filter(iss => iss.labels.length && iss.labels.find(label => label.name === 'Pitch'))
    const bets = issues.filter(iss => iss.labels.length && iss.labels.find(label => label.name === 'Bet'))
    const scopes = issues.filter(iss => iss.labels.length && iss.labels.find(label => label.name === 'Scope'))

    const scopesWithComments = await graphql(`
      query scopesWithComments($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          issues(labels: ["Scope"], last: 100) {
            edges {
              node {
                number
                closed
                closedAt
                comments(last: 100) {
                  edges {
                    node {
                      body
                      bodyText
                      createdAt
                      updatedAt
                      url
                      author {
                        avatarUrl(size: 100)
                        ... on User {
                          name
                          url
                        }
                      }
                    }
                  }
                }
                timelineItems(last: 100) {
                  nodes {
                    ... on ClosedEvent {
                      url
                      actor {
                        avatarUrl(size: 100)
                        ... on User {
                          name
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
      {
        owner: 'asyncapi',
        repo: 'shape-up-process',
        headers: {
          authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    )

    const progress = scopesWithComments.repository.issues.edges.map(sc => {
      return {
        issue_number: sc.node.number,
        percentage: sc.node.closed === true ? 100 : getCurrentPercentage(sc.node.comments.edges.map(edge => edge.node.bodyText)),
        history: getHistory(sc.node),
      }
    })

    const result = {
      cycles,
      pitches,
      bets,
      scopes,
      progress,
    }

    writeFileSync(resolve(__dirname, '..', 'data.json'), JSON.stringify(result, null, '  '))
  } catch (e) {
    console.error(e)
  }
}

function getCurrentPercentage(comments) {
  const reversedComments = comments.reverse()
  let percentage
  let i = 0

  do {
    percentage = getPercentage(reversedComments[i])
    i++
  } while (percentage === null && i < reversedComments.length)

  return percentage === null ? 0 : percentage
}

function getPercentage(comment = '') {
  const matches = comment.match(/^\/progress[\s]+([\d]+)/)
  if (matches && matches.length === 2) {
    let result = Number(matches[1])
    if (Number.isNaN(result)) return null
    if (result < 0) return 0
    if (result > 100) return 100
    return result
  }
  return null
}

function getStatus(comment = '') {
  const matches = comment.match(/^\/progress[\s]+[\d\n]+(.*)/s)
  if (matches && matches.length === 2) return matches[1]
  return null
}

function getHistory(scope) {
  const historyPoints = scope.comments.edges.map(edge => getHistoryPoint(edge.node)).filter(Boolean)
  if (scope.closed) {
    const closedEvent = scope.timelineItems.nodes.find(node => node.actor)
    historyPoints.push({
      percentage: 100,
      status: null,
      statusMarkdown: null,
      createdAt: scope.closedAt,
      updatedAt: scope.closedAt,
      author: closedEvent.actor,
      url: closedEvent.url,
    })
  }

  return historyPoints.reverse()
}

function getHistoryPoint(commentObject) {
  if (!commentObject.bodyText.match(/^\/progress[\s]+/)) return

  return {
    percentage: getPercentage(commentObject.bodyText),
    status: getStatus(commentObject.bodyText),
    statusMarkdown: getStatus(commentObject.body),
    createdAt: commentObject.createdAt,
    updatedAt: commentObject.updatedAt,
    author: commentObject.author,
    url: commentObject.url,
  }
}

start()