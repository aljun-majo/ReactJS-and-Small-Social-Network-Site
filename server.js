const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//main authentication module
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


const app = express();


// Body parser middleware
// Example: User.findOne({ email: req.body.email });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB connect and config
const mongoDB = require('./config/keys').mongoURI;

// MongoDB connect
mongoose
    .connect(mongoDB)
    .then(() => console.log('You are connected in MLAB DB!'))
    .catch(err => console.log(err));


//app.get('/', (req, res) => res.send('HEllo!!!'));

// Passport middleware
app.use(passport.initialize());

// Passport Config || JWT auto strategy (one alternative is google auth)
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
