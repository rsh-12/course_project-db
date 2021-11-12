const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(cors())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// app.get("/", (req, res) => {
//     res.json({message: "OK"});
// });

require('./app/routes/common.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/course.routes')(app);
require('./app/routes/company.routes')(app);
require('./app/routes/student.routes')(app);

module.exports = app;