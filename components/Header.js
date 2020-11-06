import Link from 'next/link'

export default function Header() {
  return (
    <div className="lg:flex lg:justify-between">
      <div className="max-w-xl">
        <a href="https://www.asyncapi.com" target="_blank">
          <img src="/asyncapi-horizontal-color.svg" className="h-7 mb-4" />
        </a>
        <Link href="/">
          <a><h2 className="text-4xl leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">Shape Up 🏋️‍♀️</h2></a>
        </Link>
        <p className="mt-5 text-xl leading-7 text-gray-500">Visualize the progress we're making, one cycle at a time. Don't know what Shape Up is about? <a className="text-pink-500 hover:font-medium" href="https://basecamp.com/shapeup" target="_blank">Learn more.</a></p>
      </div>
    </div>
  )
}