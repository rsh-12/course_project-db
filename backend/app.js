const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./src/keys');

const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: keys.FRONTEND_URL,
    optionsSuccessStatus: 200,
}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

require('./src/routes/common.routes')(app);
require('./src/routes/auth.routes')(app);
require('./src/routes/course.routes')(app);
require('./src/routes/company.routes')(app);
require('./src/routes/student.routes')(app);
require('./src/routes/instructor.routes')(app);

module.exports = app;