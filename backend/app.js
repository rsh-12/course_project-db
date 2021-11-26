const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(cors())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

require('./src/routes/common.routes')(app);
require('./src/routes/auth.routes')(app);
require('./src/routes/course.routes')(app);
require('./src/routes/company.routes')(app);
require('./src/routes/student.routes')(app);
require('./src/routes/instructor.routes')(app);

module.exports = app;