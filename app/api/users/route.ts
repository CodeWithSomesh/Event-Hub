// import { Webhook } from 'svix'
// import { headers } from 'next/headers'
// import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions'
// import { NextResponse } from 'next/server'
// import { clerkClient, WebhookEvent } from '@clerk/nextjs/server'

// export async function POST(req: Request) {
//   // Clerk Secret Key
//   const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

//   if (!WEBHOOK_SECRET) {
//     throw new Error('Please add WEBHOOK_SECRET')
//   }

//   // Get the headers
//   const headerPayload = headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");

//   // Log headers for debugging
//   console.log("Received Headers:", {
//     svix_id,
//     svix_timestamp,
//     svix_signature
//   });

//   // If there are no headers, error out
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response('Error occured -- no svix headers', {
//       status: 400
//     })
//   }

//   // Get the body
//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   // Create a new Svix instance with your secret.
//   const wh = new Webhook(WEBHOOK_SECRET);

//   let evt: WebhookEvent;

//   // Temporarily bypass verification for debugging
//   try {
//     evt = {
//       data: payload.data,
//       type: payload.type
//     } as WebhookEvent;
//   } catch (err) {
//     console.error('Error verifying webhook:', err);
//     return new Response('Error occured', {
//       status: 400
//     })
//   }

//   // Get the ID and type
//   const { id } = evt.data;
//   const eventType = evt.type;

//   console.log(`Webhook with an ID of ${id} and type of ${eventType}`)
//   console.log('Webhook body:', body)

//   if(eventType === 'user.created'){
//     const {id, email_addresses, image_url, first_name, last_name, username} = evt.data

//     const user = {
//       clerkID: id,
//       email: email_addresses[0].email_address,
//       username: username!,
//       firstName: first_name!,
//       lastName: last_name!,
//       photo: image_url,
//     }
//     console.log(user)
//     const newUser = await createUser(user);

//     //If new user created, then keep the MongoDB id of the user under Metadata
//     if(newUser){
//       await clerkClient.users.updateUserMetadata(id, {
//         publicMetadata: {
//           userId: newUser._id,
//         }
//       })
//     }

//     return NextResponse.json({message: 'New User Created', user: newUser})
//   }

//   if(eventType === 'user.updated'){
//     const {id, image_url, first_name, last_name, username} = evt.data

//     const user = {
//       username: username!,
//       firstName: first_name!,
//       lastName: last_name!,
//       photo: image_url,
//     }

//     const updatedUser = await updateUser(id, user);

//     return NextResponse.json({message: 'User Details Updated', user: updatedUser})
//   }

//   if(eventType === 'user.deleted'){
//     const {id} = evt.data

//     const deletedUser = await deleteUser(id!);

//     return NextResponse.json({message: 'User Deleted', user: deletedUser})
//   }

//   return new Response('', { status: 200 })
// }


// import { Webhook } from 'svix'
// import { headers } from 'next/headers'
// import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions'
// import { NextResponse } from 'next/server'
// import { clerkClient, WebhookEvent } from '@clerk/nextjs/server'

// export async function POST(req: Request) {
//   // Clerk Secret Key
//   const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

//   if (!WEBHOOK_SECRET) {
//     throw new Error('Please add WEBHOOK_SECRET')
//   }

//   // Get the headers
//   const headerPayload = headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");

//   // Log headers for debugging
//   console.log("Received Headers:", {
//     svix_id,
//     svix_timestamp,
//     svix_signature
//   });

//   // If there are no headers, error out
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response('Error occured -- no svix headers', {
//       status: 400
//     })
//   }

//   // Get the body
//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   // Create a new Svix instance with your secret.
//   const wh = new Webhook(WEBHOOK_SECRET);

//   let evt: WebhookEvent;

//   // Temporarily bypass verification for debugging
//   try {
//     evt = {
//       data: payload.data,
//       type: payload.type
//     } as WebhookEvent;
//   } catch (err) {
//     console.error('Error verifying webhook:', err);
//     return new Response('Error occured', {
//       status: 400
//     })
//   }

//   // Get the ID and type
//   const { id } = evt.data;
//   const eventType = evt.type;

//   console.log(`Webhook with an ID of ${id} and type of ${eventType}`)
//   console.log('Webhook body:', body)

//   if(eventType === 'user.created'){
//     const {id, email_addresses, image_url, first_name, last_name, username} = evt.data

//     const user = {
//       clerkID: id,
//       email: email_addresses[0].email_address,
//       username: username!,
//       firstName: first_name!,
//       lastName: last_name!,
//       photo: image_url,
//     }
//     console.log(user)
//     const newUser = await createUser(user);

//     //If new user created, then keep the MongoDB id of the user under Metadata
//     if(newUser){
//       await clerkClient.users.updateUserMetadata(id, {
//         publicMetadata: {
//           userId: newUser._id,
//         }
//       })
//     }

//     return NextResponse.json({message: 'New User Created', user: newUser})
//   }

//   if(eventType === 'user.updated'){
//     const {id, image_url, first_name, last_name, username} = evt.data

//     const user = {
//       username: username!,
//       firstName: first_name!,
//       lastName: last_name!,
//       photo: image_url,
//     }

//     const updatedUser = await updateUser(id, user);

//     return NextResponse.json({message: 'User Details Updated', user: updatedUser})
//   }

//   if(eventType === 'user.deleted'){
//     const {id} = evt.data

//     const deletedUser = await deleteUser(id!);

//     return NextResponse.json({message: 'User Deleted', user: deletedUser})
//   }

//   return new Response('', { status: 200 })
// }


import { NextResponse } from 'next/server'
import { createUser, getUserById, updateUser, deleteUser } from '@/lib/actions/user.actions'

// Handler for GET requests to fetch user by ID
export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  try {
    const user = await getUserById(userId)
    return NextResponse.json(user)
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Unknown error')
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// Handler for POST requests to create a new user
export async function POST(req: Request) {
  try {
    const userDetails = await req.json()
    const newUser = await createUser(userDetails)
    return NextResponse.json(newUser)
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Unknown error')
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// Handler for PUT requests to update an existing user
export async function PUT(req: Request) {
  try {
    const { clerkId, ...userDetails } = await req.json()
    const updatedUser = await updateUser(clerkId, userDetails)
    return NextResponse.json(updatedUser)
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Unknown error')
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// Handler for DELETE requests to delete a user
export async function DELETE(req: Request) {
  try {
    const { clerkId } = await req.json()
    const deletedUser = await deleteUser(clerkId)
    return NextResponse.json(deletedUser)
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Unknown error')
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
