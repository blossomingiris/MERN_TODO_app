const express = require('express')
require('dotenv').config()
// const cors = require('cors')

const connectDB = require('./config/db')

const app = express()

// routes
const todo = require('./routes/todo')

//connect to DB
connectDB()

// cors
// app.use(cors({ origin: true, credentials: true }))

// initialize middleware
app.use(express.json({ extended: false }))
app.get('/', (req, res) => res.send('Server up and running'))

// use routes
app.use('/api/todo', todo)

// setting up port
const PORT = process.env.PORT || 5000

//for production version
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`server is running`)
})
