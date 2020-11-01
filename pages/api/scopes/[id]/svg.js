import ReactDOMServer from 'react-dom/server'
import nearestColor from 'nearest-color'
import stringToColor from 'string-to-color'
import colors from '../../../../components/colors'
import HillChart from '../../../../components/HillChart'
import data from '../../../../data.json'
import progress from '../../../../progress.json'

export default function handler(req, res) {
  const scope = data.scopes.find(s => String(s.number) === req.query.id)
  const scopeProgress = progress.find(p => p.issue_number === scope.number)
  scope.progress = scopeProgress || null
  scope.color = nearestColor.from(colors)(stringToColor(scope.title))

  res.statusCode = 200
  res.setHeader('Content-Type', 'image/svg+xml')
  res.end(ReactDOMServer.renderToStaticMarkup(<HillChart scopes={[scope]} />))
}

