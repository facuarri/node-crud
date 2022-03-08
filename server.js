require('dotenv').config()
const express = require('express')
const app = express()
/* const PORT = process.env.PORT || 3000 */
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')
const connectDB = require('./server/database/connection')
const route = require('./server/routes/router')

app.use(morgan('tiny'))

connectDB()

app.use(bodyparser.urlencoded({extended:true}))

app.set("view engine", "ejs")

app.use(express.static("assets"));

/* 
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')))
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')))
*/

app.use(route)

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port);
/* app.listen(PORT, () => {console.log(`server is running on http://localhost:${PORT}`)}) */