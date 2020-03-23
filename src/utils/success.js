'use strict';

const send = (req, res, status = 200, data = null, contentType = null) => {
  return ((data) ? (contentType) ? res.status(status).
      set('Content-Type', contentType).
      send(data) : res.status(status).
      json({success: true, data}) : res.status(status).json({
    success: true, data,
  }));
};

module.exports = {
  send,
};