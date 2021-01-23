const express = require("express");
const session = require("express-session");
const bodyParser = require('body-parser');
const _handlebars = require('handlebars');
const exphbs = require("express-handlebars");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const methodOverride = require('method-override');
const path = require('path');
const cors = require('cors');

//SETUP ENV

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development'){
  console.log('DEV_ENV');
  require('dotenv').config({path: `${__dirname}/../.env.development`});
};

console.log(process.env.SALT);

///ROUTES
const routes = require("./routes/index_router");
const { firstAdmin } = require("./helpers/setupInit")

firstAdmin();

///INITIALIZE

// require('./database');
// require('./index');
///SETTINGS

///MDW
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(_handlebars),
  })
);
app.set('view engine', '.hbs');

app.use(cors({
  credentials: true,
  origin: true
}));

app.use(bodyParser.json());
routes(app);

app.use(methodOverride('_method'));
app.use(session({
  secret: 'mysecret',
  resave: true,
  saveUninitialized: true
}));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  httpOnly: false
}))

///GLOBAL VARIABLES


app.use( (error, req, res, next) =>{
  console.log(error);
  
  const status= error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({
    result: false,
    message: message,
    data: data
  })
});


//// SERVER + DB
const URL_MONGO = process.env.URL_MONGO;
const port = process.env.PORT;
const mongoose = require('mongoose');

const URI_MONGODB = URL_MONGO;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};
mongoose.connect(URI_MONGODB, connectionParams)
.then( ()=> {
  console.log('connected to mongoDB');
  app.listen(port, () => {
    console.log('server listening at http://localhost:', port);
  });
})
.catch((err) => {
  console.log('Error connecting to the database', err);
});