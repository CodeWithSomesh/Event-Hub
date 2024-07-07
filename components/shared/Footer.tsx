import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t border-gray-400">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
      <Link href="/" className="w-36 flex text-nowrap items-center">
          <Image alt="Event Hub Logo" width={55} height={48} src="/assets/images/logo7.png" className="md:w-55 w-42"/>
          <h1 className="lg:text-2xl font-bold text-xl">Event Hub</h1>
        </Link>

        <p>© 2024 Event Hub. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer