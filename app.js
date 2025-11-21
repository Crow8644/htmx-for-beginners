import express from 'express';
import createHomepageTemplate from './views/index.js';
import bookListTemplate from './views/list.js';
import createBookTemplate from './views/book.js';
import BOOKS_DATA from './data/data.js';

// create app
const app = express();
app.use(express.urlencoded({extended: false}));

// static assets
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
  res.send(createHomepageTemplate());
});

app.get('/books', (req, res) => {
  res.send(bookListTemplate());
});

app.get('/books/:id', (req, res) => {
  const { id } = req.params;

  const book = BOOKS_DATA.find(value => value.id === id)

  if (book)
    res.send(createBookTemplate(book));
});

app.post('/books', (req, res) => {
  const { title, author,} = req.body;
  const uniqueId = Math.max(BOOKS_DATA.map(obj => obj.id)) + 1; // Adds one to the maximum id currently in books_data

  const new_book = ({
    id: uniqueId, // Unique ID based on max of current ids instead of length, so removing items does not create issues
    title,
    author,
  })
  BOOKS_DATA.push(new_book)

  // res.send(createBookTemplate(new_book));
  res.redirect(`/books/${uniqueId.toString()}`)
});

// listen to port
app.listen(3000, () => {
  console.log('App listening on port 3000');
});