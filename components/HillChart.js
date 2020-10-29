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
      <svg xmlns="http://www.w3.org/2000/svg" className="w-full" viewBox="0 0 820 230">
        <style>{`
          .hill-dot__circle {
            stroke: #fff;
            stroke-width: 0;
          }
        `}</style>
        <g transform="translate(15, 15)">
          <g className="hill-chart__x-axis" fill="none">
            <path className="stroke-gray-200" strokeWidth="1.5" d="M0,205H790" />
          </g>
          <g className="hill-chart__y-axis" strokeDasharray="2 2" fill="none">
            <path className="stroke-gray-200" strokeWidth="1.5" d="M395,0V195" />
          </g>
          <path className="stroke-gray-200" strokeWidth="1.5" fill="none" d={generateCurvePoints()} />
          <g className="hill-dots">
            {
              dots.map((dot, index) => (
                <circle key={index} title={dot.text} fill={dot.color} className="stroke-white" r="10" cx={dot.x} cy={dot.y} />
              ))
            }
          </g>
        </g>
      </svg>
      <div className="flex">
        <span className="w-1/2 text-center text-gray-500 uppercase text-sm">Figuring things out</span>
        <span className="w-1/2 text-center text-gray-500 uppercase text-sm">Making it happen</span>
      </div>
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