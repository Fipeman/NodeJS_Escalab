const carRouter = require('./car_router');
const customerRouter = require('./customer_router');
const mechanicRouter = require('./mechanic_router');
const authRouter = require('./auth_router');
const userRouter = require('./user_router');

module.exports = (app) => {

  app.get('/', function(req, res) {
    res.render('index');
  });
  app.use('/car', carRouter);
  app.use('/customer', customerRouter);
  app.use('/mechanic', mechanicRouter);
  app.use('/auth', authRouter);
  app.use('/user', userRouter);
};

