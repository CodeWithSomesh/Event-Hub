import { Boxes } from "@/components/ui/background-boxes"

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="relative bg-primary-50 w-full min-h-screen overflow-hidden flex flex-col items-center justify-center rounded-lg self-stretch">
      <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      {children}
    </div>
  )
}

export default Layout