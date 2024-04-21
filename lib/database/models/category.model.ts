
import { Document, Schema, model, models } from "mongoose";


// Defining & Exporting Types 
export interface ICategory extends Document {
  _id: string;
  name: string;
}

// Settin up the Category Schema
const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
})

const Category = models.Category || model('Category', CategorySchema); // Use existing Model if got,if not create a new Model

export default Category; // Exporting the CategorySchema 