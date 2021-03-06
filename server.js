const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())



const verify = require('./app/Auth/verifytoken')

app.get('/', verify, (req, res) => {
    res.json({ "message": "Welcome" });
});

app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});


// Import Routes


const authRoute = require('./app/Auth/auth')
// Route Middleware

app.use('/api/user', authRoute)

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

require('./app/routes/user.routes.js')(app);
require('./app/routes/department.routes.js')(app);
require('./app/routes/location.routes.js')(app);
require('./app/routes/designation.routes.js')(app);
require('./app/routes/sourceOfHire.routes.js')(app);
require('./app/routes/employmentType.routes.js')(app);
require('./app/routes/clients.routes.js')(app);
require('./app/routes/projects.routes.js')(app);
require('./app/routes/jobs.routes.js')(app);
require('./app/routes/leaveType.routes.js')(app);
require('./app/routes/leaveApply.routes')(app);
