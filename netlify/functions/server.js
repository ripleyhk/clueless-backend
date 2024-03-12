const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const serverless = require('serverless-http');

const db = require('./utils/queries')
const app = express();
const router = express.Router();

router.get('/messages', db.getMessages);
router.get('/messages/:id', db.getMessageById);
router.get('./messages/:username', db.getMessagesByUser);
router.post('/messages', db.createMessage);
router.delete('/messages/:id', db.deleteMessage);

app.use(cors())
app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);