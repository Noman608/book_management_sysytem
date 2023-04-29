import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
   title: String,
   publisher: String,   
   publisherAge: Number,
   pageNum: Number,
   publishDate: Date,
   genre: String,
});
const Book = mongoose.model('Book', bookSchema);

export default Book

