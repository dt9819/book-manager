'use strict';
const express_promise_router = require('express-promise-router');
const authorRoute = require('./authors');
const bookRoute = require('./books');

module.exports = (app, modals) => {
  const router = express_promise_router();
  authorRoute(router, modals);
  bookRoute(router, modals);
  return router;
};
