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


export default function Home() {
  return (
    <>
        <section className="bg-primary-50 bg-contain py-5 md:py-8">

          <div className="wrapper grid gap-5">

            {/* Hero Section Title */}
            <div className="">
              <h1 className="h1-bold text-center">Your Passport to Events Worldwide</h1>
              <h1 className="h1-bold text-center text-primary">— Discover. Experience. Connect.</h1>
            </div>            

            {/* Carousel Slider */}
            <Carousel>
              <CarouselContent>
                {eventImages.map(event => (
                  <CarouselItem key={event.src} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square p-6 border-4 border-black rounded-md">
                          <Image src={event.src} alt="Event Images" width={1000} height={1000} className="object-cover object-bottom rounded-md"/>
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
            <div className="">
              <p className="p-semibold-18 md:p-semibold-20">Life's too short for boring weekends.</p>
              <p className="p-semibold-18 md:p-semibold-20">Dive into a world of events, buy tickets, or become the ultimate host.</p>  
            </div>

            {/* Hero Section Desc */}
            <div className="text-right">
              <p className="p-semibold-18 md:p-semibold-20">From concerts to conferences, find your next adventure here.</p>
              <p className="p-semibold-18 md:p-semibold-20">Let's make memories, starting now!</p>
            </div>

            {/* Hero Section Explore Button */}
            <Button className="bg-primary font-bold text-2xl py-8 w-full px-8 place-self-center hover:bg-black hover:text-primary">
              <Link href="#events">
                Explore Now
              </Link>
            </Button>
          </div>

        </section>
    </>
  );
}
