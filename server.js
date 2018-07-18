/*jshint esversion: 6*/ 

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Express middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `now: ${now}\n${req.method}\t${req.url}`;

    console.log();

    // Creatign a log file
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err){
            console.log('Unable to log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintainance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

// Helpers accepting arguments
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Welcome',
        welcomeMessage: 'Welcome to Website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.listen(3000, () => {
    console.log('server is up');
});