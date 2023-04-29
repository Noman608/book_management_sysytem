import express from 'express';
import bodyParser from 'body-parser';
import Book from './models/Book.js';
import { fileURLToPath } from 'url';
import path from 'path';
import connectDB from "./db/connectdb.js"
const DATABASE_URL = process.env.DATABASE_URL ||"mongodb://localhost:27017/bookManagement";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('view engine', 'ejs');
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


// Connect to MongoDB
connectDB(DATABASE_URL);
// mongoose.connect('mongodb://localhost:27017/bookManagement', {
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
// });

// Routes
app.get('/', (req, res) => {
   res.render('index');
});

app.post('/add-book', async (req, res) => {
   const newBook = new Book(req.body);
   await newBook.save();
   res.redirect('/booklist');
});

app.get('/booklist', async (req, res) => {
   const books = await Book.find();
   res.render('booklist', { books });
});

app.get('/edit/:id', async (req, res) => {
   const book = await Book.findById(req.params.id);
   res.render('edit', { book });
});

app.post('/update/:id', async (req, res) => {
   await Book.findByIdAndUpdate(req.params.id, req.body);
   res.redirect('/booklist');
});

app.get('/delete/:id', async (req, res) => {
   await Book.findByIdAndDelete(req.params.id);
   res.redirect('/booklist');
});

app.get('/search', (req, res) => {
   res.render('search');
});

app.post('/search', async (req, res) => {
   const { keyword, age, genre } = req.body;
   const query = {
      $and: [
         { $or: [{ title: { $regex: keyword, $options: 'i' } }, { publisher: { $regex: keyword, $options: 'i' } }] },
         { publisherAge: age },
         { genre },
      ],
   };
   const books = await Book.find(query);
   res.render('search', { books });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
