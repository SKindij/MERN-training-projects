// app.js
const express = require('express'); // for building the server
const config = require('config'); // for configuration management
const path = require('path'); // for working with file paths
const mongoose = require('mongoose'); // for MongoDB interactions

const app = express(); // create an Express application

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// it uses value from configuration file (or defaults to 5000)
const PORT = config.get('port') || 5000;

// define asynchronous function to start server and connect to MongoDB
async function start() {
    try {
      // connect to MongoDB using provided URI
      await mongoose.connect(config.get('mongoUri'), {
        useNewUrlParser: true, // use new URL parser
        useUnifiedTopology: true, // use new engine
        useCreateIndex: true // to create indexes in MongoDB
      })
      // start Express server and listen on specified port
      app.listen(PORT, () => console.log(`Links App has been started on port ${PORT}...`))
    } catch (e) {
      // if error occurs during server startup or MongoDB connection
      console.log('Server Error', e.message)
      // exit Node.js process with an error code
      process.exit(1)
    }
  }
// call function to begin server initialization
start()
