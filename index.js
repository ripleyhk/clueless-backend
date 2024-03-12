const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const serverless = require('serverless-http');

const db = require('./queries')

// const port = 8080;
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
      res.send('Hello from our server!')
})


app.get('/messages', db.getMessages);
app.get('/messages/:id', db.getMessageById);
app.get('./messages/:username', db.getMessagesByUser);
app.post('/messages', db.createMessage);
app.delete('/messages/:id', db.deleteMessage);

// app.listen(port, () => {
//       console.log(`App listening on port ${port}`)
// })

module.exports = app;
module.exports.handler = serverless(app);