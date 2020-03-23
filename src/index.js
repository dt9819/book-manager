const config = require('./config');
const db = require('./db');
const bodyParser = require('body-parser');
const app = require('express')();
const routes = require('./routes');
const cors = require('./middleware/cors');
const morgan = require('morgan');

app.use(cors);
app.use(morgan('dev'));
app.use(bodyParser.json());

const init = () => {
    const server = app.listen(config.app.port, () => {
      console.log('Process ' + process.pid + ' is listening to all incoming requests')});
      if (server) {
        app.use('/api', routes(app, db));
        app.use('/', function(req, res) {
          res.send('Welcome.').end();
        });
        app.use((err,req, res, next) => console.log(err));
      }
  };
  db.sequelize.sync().
      then(() => init()).
      catch(err => console.log(`Error at start up is as follow: \n \n ${err}`));
