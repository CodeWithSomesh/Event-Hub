/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { eventImages } from "@/constants";
import HoverHeader from "@/components/shared/HoverHeader";



export default async function Home() {

  

  return (
    <>

        {/* Hero Section Title */}
        <HoverHeader home={true} />

        <section className="bg-contain pt-2 pb-5 md:pb-8 w-full">

          <div className="wrapper grid gap-5">
      
            {/* Carousel Slider */}
            <Carousel>
              <CarouselContent>
                {eventImages.map(event => (
                  <CarouselItem key={event.src} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square p-4 border-4 border-black rounded-md relative">
                          <Image src={event.src} alt="Event Images" width={1000} height={1000} className="object-cover object-bottom rounded-md"/>
                          <p className="absolute opacity-100 hover:opacity-0 bg-white py-2 px-3 rounded-md bottom-6 right-6 font-medium text-lg border-2 border-slate-300">
                            {event.type}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="scale scale-150 border-primary border-4"/>
              <CarouselNext className="scale scale-150 border-primary border-4"/>
            </Carousel>

            {/* Hero Section Desc */}
            <div className="flex justify-between items-center mb-6 mt-4">
              <div>
                <q className="p-semibold-18 md:p-semibold-20">
                  Life's too short for boring weekends. <br />
                  Dive into a world of events, buy tickets, or become the ultimate host.
                </q>
              </div>

              <div className="border w-8 border-black"></div>
                
              <div className="flex justify-center items-center gap-2">
                
                <Image src='/assets/images/star-logo.png' alt="Event Images" width={100} height={100} className="object-cover object-bottom rounded-md border-4"/>
                <p className="text-lg md:text-xl italic">The Star Media Group Berhad</p>
              </div>
               
            </div>

            {/* Hero Section Desc */}
            <div className="flex justify-between items-center mb-6">
                
              <div className="flex justify-center items-center gap-2">
                <Image src='/assets/images/nst-logo.webp' alt="Event Images" width={130} height={130} className="object-cover object-bottom rounded-md border-4"/>
                <p className="text-lg md:text-xl italic">The New Straits Times Press (M) Bhd</p>
              </div>

              <div className="border w-8 border-black"></div>
               
              <div className="text-right">
                <q className="p-semibold-18 md:p-semibold-20">
                  From concerts to conferences, find your next adventure here. <br />
                  Let's make memories, starting now!
                </q>
              </div>
            </div>

            {/* Hero Section Explore Button */}
            <Link href="/events">
              <Button className="bg-primary font-bold text-2xl py-8 w-full px-8 place-self-center hover:bg-black hover:text-primary hover:scale-110"> 
                  Explore Now
              </Button>
            </Link>
          </div>

        </section>

        
    </>
  );
}
