const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const cookieParser = require('cookie-parser')
const passport = require('passport')
const config = require('./config/config')

const app = express()
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())

app.use(cookieParser('9dj48bhkldhr48fj3890drkgb6739&#HF(&5j5&*^%'))
app.use(
  session({
    secret: '9dj48bhkldhr48fj3890drkgb6739&#HF(&5j5&*^%',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    }),
    unset: 'destroy'
  })
)
app.use(passport.initialize())
app.use(passport.session())

// var router = express.Router();
// Import API Routes
app.use(require('./routes/users'))
app.use(require('./routes/reports'))
app.use(require('./routes/auth'))
app.use(require('./routes/game'))

// Set up passport auth
require('./auth_config')(passport)

const connectionServerString = 'mongodb+srv://artem:mongo4me@cluster0-yuuae.gcp.mongodb.net/map?retryWrites=true';
const connectionLocalString = 'mongodb://localhost:27017/map';


  // mongoose.connect('mongodb+srv://some:some@cluster0-1ora5.mongodb.net/Cluster0?retryWrites=true');
  // var db = mongoose.connection;
  // db.on("error", console.error.bind(console, "connection error"));
  // db.once("open", function(callback){
  //   console.log("Connection Succeeded");
  //   UserScheme.initUsers(UserScheme);
  // });



// Set up DB
mongoose
  .connect('mongodb+srv://some:some@cluster-xrw5o.mongodb.net/', {
    dbName: 'speed',
    useNewUrlParser: true
  })
  .then((res, rej) => {
    console.log('Some ~~~~~~~~~~~~~')
    console.log(res)
    console.log('!!!!!!!!!!!!!!!!!11')
    console.log(rej)
  })
  .catch((err) => {
    console.log('ЖОПА')
    console.log(err)
  })

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://some:some@cluster-xrw5o.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   console.log('okoloko')
//   console.log(err)
//   const collection = client.db("speed").collection("speed");
//   console.log('ZBC')
//   // perform actions on the collection object
//   client.close();
// });

// mongoose.Promise = global.Promise

// app.use('/api/', router);
//
// app.listen(config.port,
//     () => console.log(`Server start on port ${config.port} ...`));

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
