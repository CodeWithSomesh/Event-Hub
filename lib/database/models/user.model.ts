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
const User = models.User || model('User', UserSchema);

export default User;