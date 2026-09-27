const express = require('express')
const app = express()
const { deleteOtps } = require('./cron')
const cors = require("cors");
const cookieParser = require('cookie-parser');
require("dotenv").config();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const routes = require('./routes')
const error = require('./middlewares/errorHandling')

app.use('/', routes);

app.use(error.errorHandler)

deleteOtps.start();

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})