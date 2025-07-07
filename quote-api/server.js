const express = require('express');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const quotes = require('../quote-api/quotes');

dotenv.config({
    path: '../quote-api/.env'
});

const app = express();
const port = 5000 || process.env.PORT;

app.use(express.json());

// GET all quotes 
app.get('/api/quotes', (req, res) => {
    res.json(quotes);
});

// GET quote by author (/api/quotes/search?author=marc)
app.get('/api/quotes/search', (req, res) => {
    const { author } = req.query;
    if (!author) return res.status(400).json({ message: 'Author is required' });

    const filtered = quotes.filter(q => q.author.toLowerCase().includes(author.toLowerCase()));

    res.json(filtered.length ? filtered : { message: 'No quotes found for this author.' });
});

// GET random quote
app.get('/api/quotes/random', (req, res) => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    res.json(random);
});

// POST add quote
app.post('/api/quotes/add', (req, res) => {
    const { quote, author } = req.body;
    if (!quote && !author) return res.status(400).json('Both quote and author are required!');

    quotes.push({ text: quote, author });

    const filePath = path.join(__dirname, 'quotes.js');
    const updatedQuotes = `module.exports = ${JSON.stringify(quotes, null, 2)};`;

    fs.writeFileSync(filePath, updatedQuotes, 'utf-8');
    res.status(200).json({ message: 'Quote added to the database!' });
});

// DELETE all quotes by author
app.delete('/api/quotes/delete', (req, res) => {
    const { author } = req.body;

    const filtered = quotes.filter(
        q => q.author.toLowerCase().replaceAll(' ', '-') !== author.toLowerCase().replaceAll(' ', '-'));

    quotes.length = 0;
    quotes.push(...filtered);

    const filePath = path.join(__dirname, 'quotes.js');
    const updatedQuotes = `module.exports = ${JSON.stringify(filtered, null, 2)};`;

    fs.writeFileSync(filePath, updatedQuotes, 'utf-8');
    res.status(200).json({ message: `All quotes of the ${author} deleted!` });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
