const chalk = require('chalk');
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath =path.join(__dirname, '../templates/partials');

const app = express();
//Setup static directory to serve
app.use(express.static(publicDirectoryPath));
//Setup handlebars engine and views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Routes
app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather',
        name : 'Debopam'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About',
        name : 'Debopam'
    });
});

app.get('/help', (req,res)=> {
    res.render('help', {
        title: 'Help',
        customMessage : 'Not to worry, HELP is here..',
        name : 'Debopam'
    })
});

app.get('/weather', (req, res)=> {
    if(!req.query.address) {
        res.send({
            error : 'No address was provided'
        });
        return;
    }
    forecast(req.query.address, (error, data)=>{
        if(!error){
            res.send({
                location : data.location.name,
                country : data.location.country,
                icon : data.current.weather_icons,
                description : data.current.weather_descriptions
            });
        }else {
            res.send({error});
        }
    });
});

app.get('/help/*', (req,res)=> {
    res.set(404).render('error', {
        title : 'Help article not found',
        name : 'Debopam'
    });
});

app.get('*', (req,res)=> {
    res.set(404).render('error', {
        title : 'Page was not found',
        name : 'Debopam'
    });
});


app.listen(3000, ()=> {
    console.log(chalk.green.inverse('Server is up and running'));
});