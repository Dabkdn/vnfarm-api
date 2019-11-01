//packages
require('module-alias/register')
require('dotenv').config()
require('@models')
const express = require("express")
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
const http = require('http').Server(app);
const { apiRouter } = require('./routes')
const cors = require("cors");
const session = require('express-session')

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 86400000 }}))
if (process.env.NODE_ENV === 'development') {
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
}
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.use('/api', apiRouter)
app.get('*', function(req, res){
    res.status(404).render('notfound');
});

mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {useNewUrlParser: true}).then(
    () => {
        http.listen(process.env.PORT, () => {
            console.log(`Server is running at localhost:${process.env.PORT}`)
        })
    },
    err => {
        console.log('connection error: '+err)
        process.exit(1)
    }
)