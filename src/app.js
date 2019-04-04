const path = require('path');

const getGeoCode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const express = require('express');
const hbs = require('hbs');

const app = express();
const publicDir = path.join(__dirname, '../public');
const customTemplatesPath = path.join(__dirname, '../templates/views');
const templatesPartsPath = path.join(__dirname, '../templates/partials');

// настройки для handlebars
// устанавливает hbs в качестве шаблонизатора
app.set('view engine', 'hbs');
// кастомный путь к шалонам handlebars
app.set('views', customTemplatesPath);
// подключение частей шаблонов
hbs.registerPartials(templatesPartsPath);

// определяет статические ресурсы
app.use(express.static(publicDir));


// роуты
app.get('', (req, res) => {
    res.render('index', {
        title: 'Forecast',
        author: 'Polyakova Kseniya'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'Polyakova Kseniya'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        author: 'Polyakova Kseniya'
    })
});

app.get('/weather', (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.send({
            error: 'No address provided'
        })
    }

    getGeoCode(address, (err, {longitude, latitude, location} = {}) => {
        if (err) {
            return res.send({
                error: err
            })
        };
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            };
            return res.send({
                address,
                location,
                forecastData
            })
        })
    });
});

app.get('/help/*', (req, res) => {
    res.render('err404', {
        title: 'Oops',
        author: 'Polyakova Kseniya',
        message: 'Help article not found'
    })
});

app.get('*', (req, res) => {
    res.render('err404', {
        title: 'Oops',
        author: 'Polyakova Kseniya',
        message: 'It seems nothing to do here...'
    })
});

app.listen(3333, () => {
    console.log('listening 3333');
}); 