const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  dbConfig: {
    dialect: 'postgres',
    dialectOptions:{},
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    autoReconnect: true,
  },
  app: {
    port: process.env.APP_PORT || 3000,
  },
  jwt_secret: process.env.JWT_SECRET,
};

