import {
    clerkMiddleware,
    createRouteMatcher
  } from '@clerk/nextjs/server';
   
    const isProtectedRoute = createRouteMatcher([
    '/profile',
    '/events/publish',
    '/events/:id/update',
    '/orders',
    '/tickets/:id',
  ]);
   
  export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
  });
   
  export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  };