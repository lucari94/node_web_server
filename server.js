const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine, hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    const log = new Date().toString() + ' ' + req.method + ' ' + req.url
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to write log file');
        }
    });
    next();
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

app.get('/', (requestAnimationFrame, res) => {
    // res.send('It works')
    res.send({
        name: 'Prova',
        surname: 'Surname'
    });
});

app.get('/about', (req, res) => {
    res.send('About Page');
})

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        pageTitle: 'Help Page'
    });
})

app.listen(port, () => {
    console.log('Server up on port 3000');
});