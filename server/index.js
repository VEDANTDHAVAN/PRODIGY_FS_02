const express = require('express');
const cors = require('cors');
const {mongoose} = require('mongoose');
const app = express();
const config = require('./controllers/config.js');
const cookieParser = require('cookie-parser')

//database Connection
mongoose.connect(config.mongoDbUrl)
.then(()=> console.log('Database Connected!!'))
.catch((err)=> console.log('Database Connection Error:', err))

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

app.use('/', require('./routes/auth.routes.js'))

const port = 8000;
app.use('/', require('./routes/auth.routes'))
app.listen(port, () => console.log(`Server is running on port ${port}`));
  