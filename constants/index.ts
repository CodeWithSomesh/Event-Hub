export const navLinks = [
    {
        label: 'Home',
        route: '/'
    },
    {
        label: 'Publish Events',
        route: '/events/publish'
    },
    {
        label: 'My Profile',
        route: '/profile'
    },

]

export const eventImages = [
    {
        
        type: 'Holi Festival Penang 2024',
        src: '/assets/images/event8.jpeg'
    },
    
    {
        type: 'Picasso Art Exhibition 2024',
        src: '/assets/images/event3.jpeg'
    },
    {
        type: 'Ballerina Ballet Dance Show 2024',
        src: '/assets/images/event6.jpeg'
    },
    
    {
        
        type: 'Travis Scott Concert 2024',
        src: '/assets/images/event1.jpeg'
    },
    {
        
        type: "Sara's Pottery Class",
        src: '/assets/images/event5.jpg'
    },
    
    {
        type: "Reina's Yoga Class",
        src: '/assets/images/event7.jpeg'
    },
    {
        type: 'Web Development Seminar',
        src: '/assets/images/event4.jpeg'
    },
    {
        type: 'Mutual Funds Trading Webinar',
        src: '/assets/images/event9.jpeg'
    },
    {
        type: "Uniqlo's Fashion Show 2024",
        src: '/assets/images/event10.jpeg'
    },
    {
        type: 'Campers Trip 2024',
        src: '/assets/images/event11.jpeg'
    },

]

export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
  }