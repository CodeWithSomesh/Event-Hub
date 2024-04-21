import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36 flex text-nowrap items-center">
          <Image alt="Event Hub Logo" width={55} height={48} src="/assets/images/logo7.png" className="md:w-55 w-42"/>
          <h1 className="lg:text-2xl font-bold text-xl">Event Hub</h1>
        </Link>

        <SignedIn>
          <nav className="hidden w-full max-w-xs md:flex-between">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>

          <SignedOut>
            <Button asChild className="font-semibold text-xl hover:bg-black hover:text-primary rounded-md" size="lg">
              <Link href="/sign-in" >
                Login
              </Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Header