//This file is necessary for the connection of MongoDB 

import mongoose from  'mongoose';

const MONGODB_URI = process.env.MONGODB_URI; // Connecting to MongoDB URI with password

// Initializing cached variable 
let cached = (global as any).mongoose || {connection: null, promise: null}

// Function to connect to Database 
//This is a much more efficient way as you dont need to keep making new connections when you make changes to the code, if there is already an connection, it will use it
export const connectToDatabase = async() => {
    if (cached.connection) return cached.connection; // if there is aalready a connection then return the connection

    if(!MONGODB_URI) throw new Error('MONGODB_URI is missing'); //if there is no MONGO_URI then this error message will be displayed 
    console.log("hi")
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, { 
        //if there is aalready a connection then return the connection, 
        //if not start a connection using mongoose 
        dbName: 'EventHub',
        bufferCommands: false,
    })

    cached.connection = await cached.promise;

    return cached.connection;
}
