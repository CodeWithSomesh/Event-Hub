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


const User = models.User || model('User', UserSchema) // Use existing Model if got,if not create a new Model


export default User;