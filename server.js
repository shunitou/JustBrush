const express = require('express');
const db = require('./db/db');
const imageRouter = require('./routes/images');
const registerRouter = require('./routes/register');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Set up the router for images
app.use('/images', imageRouter);
app.use('/', registerRouter);

app.get('/', (req, res) => {
  db.any('SELECT * FROM images')
    .then((images) => {
      res.render('index', { images });
    })
    .catch((error) => {
      console.error('Failed to fetch images:', error);
      res.status(500).json({ error: 'Failed to fetch images' });
    });
});



app.get('/', (req, res) => {
  res.render('index');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});