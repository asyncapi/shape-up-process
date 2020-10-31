const { writeFileSync } = require('fs')
const { resolve } = require('path')
const core = require('@actions/core')
const { Octokit } = require('@octokit/action')
const octokit = new Octokit()

start()

async function start () {
  try {
    core.setCommandEcho(true)
    const scopesWithComments = await octokit.graphql(
      `
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
        owner: core.getInput('repo_owner'),
        repo: core.getInput('repo_name'),
      }
    )

    const result = scopesWithComments.repository.issues.edges.map(sc => {
      return {
        issue_number: sc.node.number,
        percentage: sc.node.closed === false ? 100 : getCurrentPercentage(sc.node.comments.edges.map(edge => edge.node.bodyText)),
        history: getHistory(sc.node),
      }
    })

    writeFileSync(resolve(__dirname, '../../..', 'progress.json'), JSON.stringify(result, null, '  '))
  } catch (error) {
    core.setFailed(error.message)
  }
}

function getCurrentPercentage(comments) {
  const reversedComments = comments.reverse()
  let percentage
  let i = 0
  
  do {
    percentage = getPercentage(reversedComments[i])
    i++
  } while(percentage === null && i < reversedComments.length)

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