// Requiring Schema model from Mongoose 
import { Schema, model, models } from "mongoose";


// Settin up the User Schema
const UserSchema = new Schema({
    clerkID: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    username: {
        type: String,
        required: true,
        unique: true,
    },

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    photo: {
        type: String,
        required: true,
    },
})


// Exporting the EventSchema 
let User = model('User', UserSchema); // Default initialization

try {
    // Try to retrieve existing model, otherwise create a new one
    User = models["User"] || User;
} catch (error) {
    // If there's an error, log it
    console.error("Error in retrieving or creating User model:", error);
} 


export default User;