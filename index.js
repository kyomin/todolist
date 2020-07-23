const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

/* 미들웨어에 bodyParser 추가 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server in running on port ${port}`);
});