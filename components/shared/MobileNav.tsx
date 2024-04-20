import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from "next/image"
import NavItems from "./NavItems"
import { Separator } from "@/components/ui/separator"

  

const MobileNav = () => {
  return (
    <nav className="md:hidden">
        <Sheet>
            <SheetTrigger>
                <Image 
                    src="/assets/icons/menu.svg" 
                    alt="Hamburger Menu"
                    width={32}
                    height={32} 
                    className="cursor-pointer mt-2"
                />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
                <div className="w-36 flex text-nowrap items-center mt-8">
                    <Image alt="Event Hub Logo" width={55} height={48} src="/assets/images/logo7.png"/>
                    <h1 className="text-xl font-bold">Event Hub</h1>
                </div>
                <Separator />
                <NavItems />
            </SheetContent>
        </Sheet>

    </nav>
  )
}

export default MobileNav