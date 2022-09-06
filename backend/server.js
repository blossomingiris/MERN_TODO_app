const express = require('express')
require('dotenv').config()
const cors = require('cors')
const path = require('path')

const connectDB = require('./config/db')

const app = express()

// routes
const todo = require('./routes/todo')

//connect to DB
connectDB()

// cors
app.use(cors({ origin: true, credentials: true }))

// initialize middleware
app.use(express.json({ extended: false }))
app.get('/', (req, res) => res.send('Server up and running'))

// use routes
app.use('/api/todo', todo)

//serve static assets if on production
// if (process.env.NODE_ENV === 'production') {
//set static folder
//   app.use(express.static('frontend/build'))

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
//   })
// }

// setting up port
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})
