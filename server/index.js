const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const dbConfig = require('./config/database');
const db = require('./models');


/* DB Connection 과정 */
const connection = dbConfig.init();
dbConfig.connect(connection);
db.sequelize.sync();


/* 미들웨어 추가 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/* 라우팅 설정 */
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/users', require('./routes/users'));

app.listen(port, () => {
    console.log(`Server in running on port ${port}`);
});