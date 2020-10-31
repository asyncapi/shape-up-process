import LinearScale from 'linear-scale'

export default function HillChart({ scopes = [] }) {
  let dots = scopes.map(scope => {
    const x = xScale(scope.progress.percentage)
    const y = yScale(hillFn(x))
    return {
      id: scope.number,
      x,
      y,
      color: scope.color,
      text: scope.title,
    }
  })

  dots.forEach(dot => {
    dots.forEach((d, index) => {
      if ((dot.id !== d.id && (Math.abs(d.y - dot.y) < 10 || Math.abs(d.x - dot.x) < 10))) {
        d.y = d.y - 15 * index
      }
    })
  })
  
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" className="w-full" viewBox="0 0 820 260">
        <g transform="translate(15, 15)">
          <path className="stroke-gray-200" fill="none" strokeWidth="1.5" d="M0,205H790" />
          <path className="stroke-gray-200" fill="none" strokeDasharray="2 2" strokeWidth="1.5" d="M395,0V195" />
          <path className="stroke-gray-200" fill="none" strokeWidth="1.5"  d={generateCurvePoints()} />
          <text x="23%" y="230" textAnchor="middle" className="fill-gray-500 uppercase text-xs">Figuring things out</text>
          <text x="73%" y="230" textAnchor="middle" className="fill-gray-500 uppercase text-xs">Making it happen</text>
          <g>
            {
              dots.map((dot, index) => (
                <circle key={index} title={dot.text} fill={dot.color} className="stroke-white" r="10" cx={dot.x} cy={dot.y} />
              ))
            }
          </g>
        </g>
      </svg>
    </div>
  )
}

const hillFn = (point) =>
  (50 * Math.sin((Math.PI / 400) * point - (1 / 2) * Math.PI) + 50)
const xScale = LinearScale().domain([0, 100]).range([0, 790])
const yScale = LinearScale().domain([0, 100]).range([195, 0])

function generateCurvePoints() {
  const initialX = 0
  let d = `M ${xScale(initialX)},${yScale(hillFn(xScale(initialX)))}`

  for (var x = initialX; x <= 100; x++) {
    d += ' L ' + xScale(x) + ', '
    d += yScale(hillFn(xScale(x)))
  }

  return d
}