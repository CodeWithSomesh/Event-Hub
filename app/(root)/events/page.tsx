import Searchbar from "@/components/shared/Searchbar";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import HoverHeader from "@/components/shared/HoverHeader";

export default async function BrowseEvents({searchParams} : SearchParamProps) {

    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';
  
    // Getting all events in the database
    const events = await getAllEvents({
      query: searchText,
      category,
      page,
      limit: 6
    })
  
    // console.log(events) 

  return (
    <>

        <HoverHeader home={false} />

        <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
            {/* <h2 className="h2-bold text-center">Trusted by <br /> Thousands of Events</h2> */}
            
            <div className="flex w-full flex-col gap-5 md:flex-row">
                <Searchbar />
                <CategoryFilter />
            </div>

            <Collection 
                data={events?.data}
                emptyTitle="No Events Found" //If no events found
                emptyStateSubtext="Come back later"
                collectionType="All_Events"
                limit={6}
                page={page}
                totalPages={events?.totalPages}
            />
        </section>
    </>
    
  )
}